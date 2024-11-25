"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/text-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Cache from "@/lib/cache";
import {
  Home,
  Bath,
  DollarSign,
  Info,
  Building,
  Car,
  Cat,
  Waves,
  Dumbbell,
  MapPin,
} from "lucide-react";
import NavBar from "@/components/ui/NavBar";
import userInfo from "@/lib/userInfo";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Apartment } from "@/types/apartment";

export default function AgregarDepartamento() {
  const router = useRouter();
  const [nuevoDepartamento, setNuevoDepartamento] = useState<Apartment>({
    id: 0,
    name: "",
    price: 0,
    expenses: 0,
    owner: userInfo.getInstance().getUser()!,
    description: "",
    hasParking: false,
    hasPets: false,
    hasPool: false,
    rating: 0,
    hasGym: false,
    floor: 0,
    letter: "",
    bathrooms: 0,
    rooms: 0,
    additionalInfo: "",
    street_address: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const manejarCambioInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setNuevoDepartamento((prev) => ({ ...prev, [name]: value }));
  };

  const manejarCambioCheckbox = (nombre: string) => (marcado: boolean) => {
    setNuevoDepartamento((prev) => ({ ...prev, [nombre]: marcado }));
  };

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = userInfo.getInstance().getUser();
    if (!user) {
      console.error("Usuario no definido");
      return;
    }

    const apartmentData: Apartment = {
      ...nuevoDepartamento,
      owner: user,
      rating: Math.floor(Math.random() * 5) + 1,
    };

    const success = await Cache.getInstance().addData(apartmentData);
    if (success) {
      setShowConfirmation(true);
    } else {
      console.error("Error al agregar el nuevo departamento.");
    }
  };

  const handleConfirmation = () => {
    setShowConfirmation(false);
    setNuevoDepartamento({
      id: 0,
      name: "",
      price: 0,
      expenses: 0,
      owner: userInfo.getInstance().getUser()!,
      description: "",
      hasParking: false,
      hasPets: false,
      hasPool: false,
      rating: 0,
      hasGym: false,
      floor: 0,
      letter: "",
      bathrooms: 0,
      rooms: 0,
      additionalInfo: "",
      street_address: "",
    });
    router.push("/userPage");
  };

  return (
    <TooltipProvider>
      <NavBar />
      <div className="container mx-auto py-8 px-4">
        <Card className="w-full max-w-2xl mx-auto">
          <CardContent className="p-6">
            <form onSubmit={manejarEnvio} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center space-x-2">
                  <Home size={18} />
                  <span>Nombre del Departamento</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  onChange={manejarCambioInput}
                  value={nuevoDepartamento.name}
                  placeholder="Ingrese el nombre del departamento"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="street_address" className="flex items-center space-x-2">
                  <MapPin size={18} />
                  <span>Dirección</span>
                </Label>
                <Input
                  id="street_address"
                  name="street_address"
                  onChange={manejarCambioInput}
                  value={nuevoDepartamento.street_address}
                  placeholder="Ingrese la dirección del departamento"
                  maxLength={255}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center space-x-2">
                  <Info size={18} />
                  <span>Descripción</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  onChange={manejarCambioInput}
                  value={nuevoDepartamento.description}
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bathrooms" className="flex items-center space-x-2">
                    <Bath size={18} />
                    <span>Número de Baños</span>
                  </Label>
                  <Input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    onChange={manejarCambioInput}
                    value={nuevoDepartamento.bathrooms}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rooms" className="flex items-center space-x-2">
                    <Home size={18} />
                    <span>Número de Ambientes</span>
                  </Label>
                  <Input
                    id="rooms"
                    name="rooms"
                    type="number"
                    onChange={manejarCambioInput}
                    value={nuevoDepartamento.rooms}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="flex items-center space-x-2">
                    <DollarSign size={18} />
                    <span>Precio de Alquiler</span>
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    onChange={manejarCambioInput}
                    value={nuevoDepartamento.price}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expenses" className="flex items-center space-x-2">
                    <DollarSign size={18} />
                    <span>Expensas</span>
                  </Label>
                  <Input
                    id="expenses"
                    name="expenses"
                    type="number"
                    onChange={manejarCambioInput}
                    value={nuevoDepartamento.expenses}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo" className="flex items-center space-x-2">
                  <Info size={18} />
                  <span>Información Adicional</span>
                </Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  onChange={manejarCambioInput}
                  value={nuevoDepartamento.additionalInfo}
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="tieneEstacionamiento"
                        onCheckedChange={manejarCambioCheckbox("hasParking")}
                      />
                      <Label
                        htmlFor="tieneEstacionamiento"
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <Car size={18} />
                        <span>Estacionamiento</span>
                      </Label>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>¿El departamento incluye estacionamiento?</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="permiteMascotas"
                        onCheckedChange={manejarCambioCheckbox("hasPets")}
                      />
                      <Label
                        htmlFor="permiteMascotas"
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <Cat size={18} />
                        <span>Permite Mascotas</span>
                      </Label>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>¿Se permiten mascotas en el departamento?</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="tienePiscina"
                        onCheckedChange={manejarCambioCheckbox("hasPool")}
                      />
                      <Label
                        htmlFor="tienePiscina"
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <Waves size={18} />
                        <span>Piscina</span>
                      </Label>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>¿El edificio cuenta con piscina?</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="tieneGimnasio"
                        onCheckedChange={manejarCambioCheckbox("hasGym")}
                      />
                      <Label
                        htmlFor="tieneGimnasio"
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <Dumbbell size={18} />
                        <span>Gimnasio</span>
                      </Label>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>¿El edificio cuenta con gimnasio?</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
              >
                Agregar Departamento
              </Button>
            </form>
          </CardContent>
        </Card>

        <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Propiedad Agregada con Éxito</AlertDialogTitle>
              <AlertDialogDescription>
                La propiedad ha sido agregada correctamente a su lista.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleConfirmation}>Aceptar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
}