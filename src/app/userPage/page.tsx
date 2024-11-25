"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PlusCircle, Edit, ChevronLeft, ChevronRight, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import NavBar from "@/components/ui/NavBar";
import { Apartment } from "@/types/apartment";
import UserInfo from "@/lib/userInfo";
import Cache from "@/lib/cache";

function ImageCarousel({ images, name }: { images: string[]; name: string }) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full pt-[56.25%]">
      <Image
        src={images[currentImageIndex]}
        alt={`Imagen ${currentImageIndex + 1} de ${name}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {images.length > 1 && (
        <>
          {currentImageIndex > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-[#0066FF] rounded-full p-1"
              onClick={(e) => {
                e.preventDefault();
                prevImage();
              }}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Imagen anterior</span>
            </Button>
          )}
          {currentImageIndex < images.length - 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-[#0066FF] rounded-full p-1"
              onClick={(e) => {
                e.preventDefault();
                nextImage();
              }}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Siguiente imagen</span>
            </Button>
          )}
        </>
      )}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <div key={star} className="relative">
          <Star
            className={`h-5 w-5 ${
              star <= Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
          {star > Math.floor(rating) && star <= Math.ceil(rating) && (
            <div
              className="absolute top-0 left-0 overflow-hidden text-yellow-400 fill-current"
              style={{ width: `${(rating % 1) * 100}%` }}
            >
              <Star className="h-5 w-5" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function UserPage() {
  const router = useRouter();
  const userInfo = UserInfo.getInstance();

  const handleAddProperty = () => {
    router.push("/agregarDepto");
  };

  const handleEditProperty = (id: number) => {
    router.push(`/mod-Dep/${id}`);
  };

  const [userApartments, setApartments] = useState<Apartment[]>([]);

  useEffect(() => {
    async function fetchApartments() {
      const cacheInstance = Cache.getInstance();
      const currentUser = userInfo.getUser();
      if (currentUser) {
        const filteredData = await cacheInstance.getByOwner(currentUser.email);
        setApartments(filteredData);
      }
    }
    fetchApartments();
  }, [userInfo]);

  // TODO manejar con cookies
  const handleDeleteUser = () => {
    userInfo.clearUser();
    router.push("/login-register");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container mx-auto mt-8 px-4 pb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Mis Propiedades</h1>
          <Button onClick={handleAddProperty} className="bg-blue-600 hover:bg-blue-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar Propiedad
          </Button>
        </div>
        {userApartments.length === 0 ? (
          <Card className="p-6 text-center">
            <CardContent>
              <p className="text-xl text-gray-600">No tienes ninguna propiedad</p>
              <Button onClick={handleAddProperty} className="mt-4 bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Agregar tu primera propiedad
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userApartments.map((apartment) => (
              <Card
                key={apartment.id}
                className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow p-0"
              >
                <ImageCarousel
                  images={apartment.images.map((e) => e.image)}
                  name={apartment.name}
                />
                <CardHeader>
                  <CardTitle className="text-[#0066FF] truncate">{apartment.name}</CardTitle>
                  <CardDescription className="truncate">
                    Propietario: {apartment.owner.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-gray-600 line-clamp-3">{apartment.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Piso: {apartment.floor}, Letra: {apartment.letter}
                  </p>
                  <p className="text-sm text-gray-500">
                    Baños: {apartment.bathrooms}, Habitaciones: {apartment.rooms}
                  </p>
                  <div className="mt-2">
                    <StarRating rating={apartment.rating} />
                  </div>
                </CardContent>
                <CardFooter className="mt-auto flex justify-between items-center">
                  <p className="text-lg font-bold">${apartment.price.toLocaleString()}/mes</p>
                  <p className="text-sm text-gray-500">
                    Expensas: ${apartment.expenses.toLocaleString()}
                  </p>
                </CardFooter>
                <CardFooter>
                  <Button
                    onClick={() => handleEditProperty(apartment.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Modificar Propiedad
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        <div className="mt-8 text-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar Usuario
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar eliminación de usuario</AlertDialogTitle>
                <AlertDialogDescription>
                  ¿Estás seguro de que deseas eliminar tu cuenta de usuario? Esta acción no se puede
                  deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteUser}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>
    </div>
  );
}
