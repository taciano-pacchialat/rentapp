// pages/infoDepar/[id].tsx
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NavBar from "@/components/ui/NavBar";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Bath,
  Box,
  DollarSign,
  Car,
  Dumbbell,
  Waves,
  Cat,
  Info,
  ChevronLeft,
  ChevronRight,
  Star,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import cache from "@/lib/cache";
import { Apartment } from "@/types/apartment";

export default function DetallesDepartamentoPage() {
  const { id } = useParams();
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const fetchApartment = async () => {
        const apartmentData = await cache.getInstance().getById(Number(id));
        if (apartmentData) {
          setApartment(apartmentData);
        }
      };
      fetchApartment();
    }
  }, [id]);

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      apartment ? (prevIndex === 0 ? apartment.images.length - 1 : prevIndex - 1) : prevIndex
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      apartment ? (prevIndex === apartment.images.length - 1 ? 0 : prevIndex + 1) : prevIndex
    );
  };

  if (!apartment) {
    return <div>Cargando...</div>;
  }

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(apartment.rating);
    const decimalPart = apartment.rating - fullStars;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />);
      } else if (i === fullStars && decimalPart > 0) {
        const percentFilled = decimalPart * 100;
        stars.push(
          <div key={i} className="relative w-4 h-4">
            <Star className="w-4 h-4 text-gray-300 absolute" />
            <div className="overflow-hidden absolute" style={{ width: `${percentFilled}%` }}>
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <>
      <NavBar />
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-blue-600">{apartment.name}</CardTitle>
            <div className="flex items-center">
              {renderStars()}
              <span className="ml-2 text-sm text-gray-600">({apartment.rating.toFixed(1)})</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[400px] mb-6">
            {apartment.images &&
            apartment.images.length > 0 &&
            apartment.images[currentImageIndex] ? (
              <Image
                src={apartment.images[currentImageIndex].image}
                alt={`${apartment.name} - Imagen ${currentImageIndex + 1}`}
                fill
                className="object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
                <span className="text-gray-500">Imagen no disponible</span>
              </div>
            )}
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <Home className="mr-2 text-blue-600" />
              <span>
                Piso {apartment.floor}, Letra {apartment.letter}
              </span>
            </div>
            <div className="flex items-center">
              <Bath className="mr-2 text-blue-600" />
              <span>{apartment.bathrooms} Baños</span>
            </div>
            <div className="flex items-center">
              <Box className="mr-2 text-blue-600" />
              <span>{apartment.rooms} Ambientes</span>
            </div>
            <div className="flex items-center">
              <User className="mr-2 text-blue-600" />
              <span>Propietario: {apartment.owner.name}</span>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Descripción</h3>
            <p>{apartment.description}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Características</h3>
            <div className="flex flex-wrap gap-2">
              {apartment.hasParking && (
                <Badge variant="secondary">
                  <Car className="mr-1" /> Estacionamiento
                </Badge>
              )}
              {apartment.hasPets && (
                <Badge variant="secondary">
                  <Cat className="mr-1" /> Permite Mascotas
                </Badge>
              )}
              {apartment.hasPool && (
                <Badge variant="secondary">
                  <Waves className="mr-1" /> Piscina
                </Badge>
              )}
              {apartment.hasGym && (
                <Badge variant="secondary">
                  <Dumbbell className="mr-1" /> Gimnasio
                </Badge>
              )}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Costos</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <DollarSign className="mr-2 text-blue-600" />
                <span>
                  <span className="font-semibold">Alquiler:</span> ${apartment.price}/mes
                </span>
              </div>
              <div className="flex items-center">
                <DollarSign className="mr-2 text-blue-600" />
                <span>
                  <span className="font-semibold">Expensas:</span> ${apartment.expenses}/mes
                </span>
              </div>
            </div>
          </div>
          {apartment.additionalInfo && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Información Adicional</h3>
              <div className="flex items-start">
                <Info className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                <p>{apartment.additionalInfo}</p>
              </div>
            </div>
          )}
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Solicitar Alquiler
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
