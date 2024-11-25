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
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import cache from "@/lib/cache";
import { Apartment } from "@/types/apartment";
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
import { Phone, Mail, Send } from "lucide-react";



export default function DetallesDepartamentoPage() {
  const { id } = useParams();
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

          <div className="flex items-center mb-2">
            <MapPin className="mr-2 text-blue-600" />
            <span className="font-semibold">Dirección:</span>
            <span className="ml-1">{apartment.street_address}</span>
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
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsModalOpen(true)}>
            Solicitar Alquiler
          </Button>
        </CardContent>
      </Card>

      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Contactar al Propietario</AlertDialogTitle>
    </AlertDialogHeader>
    <AlertDialogDescription>
      <div className="space-y-4">
        <div className="flex items-center">
          <Phone className="mr-2" />
          {apartment.owner.phone_number}
        </div>
        <div className="flex items-center">
          <Mail className="mr-2" />
          {apartment.owner.email}
        </div>
      </div>
    </AlertDialogDescription>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={() => setIsModalOpen(false)}>
        Cerrar
      </AlertDialogCancel>
      
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    </>


  );
}
