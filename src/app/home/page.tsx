"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import NavBar from "@/components/ui/NavBar";
import DetailButton from "@/components/ui/detail-button";
import cache from "@/lib/cache";
import { Apartment, ApartmentImage } from "@/types/apartment";

function ImageCarousel({ images, name }: { images: ApartmentImage[]; name: string }) {
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
        src={images[currentImageIndex].image}
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

export default function HomePage() {
  const [featuredApartments, setApartments] = useState<Apartment[]>([]);
  const cacheInstance = cache.getInstance();

  useEffect(() => {
    async function fetchApartments() {
      const apartments = await cacheInstance.getAll();
      setApartments(apartments);
    }
    fetchApartments();
  }, [cacheInstance]);

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Encuentra tu próximo hogar
        </h1>
        <section className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">¿Buscas un apartamento?</h2>
          <p className="text-gray-600 mb-6">
            Explora nuestra amplia selección de propiedades y encuentra el hogar perfecto para ti.
          </p>
          <Link href="/search">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg">
              Iniciar búsqueda
            </Button>
          </Link>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Departamentos destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredApartments.map((apartment) => (
              <Card
                key={apartment.id}
                className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow p-0"
              >
                <ImageCarousel images={apartment.images} name={apartment.name} />
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
                  <DetailButton apartmentId={apartment.id} />
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
