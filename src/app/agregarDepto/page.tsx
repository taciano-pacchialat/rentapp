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
import {
  Home,
  Bath,
  DollarSign,
  Info,
  Upload,
  Building,
  Car,
  Cat,
  Waves,
  Dumbbell,
} from "lucide-react";
import NavBar from "@/components/ui/NavBar";
import cache from "@/lib/cache";
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
    images: [],
    floor: 0,
    letter: "",
    bathrooms: 0,
    rooms: 0,
    additionalInfo: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const manejarCambioInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNuevoDepartamento((prev) => ({ ...prev, [name]: value }));
  };

  const manejarCambioCheckbox = (nombre: string) => (marcado: boolean) => {
    setNuevoDepartamento((prev) => ({ ...prev, [nombre]: marcado }));
  };

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nuevo departamento:", nuevoDepartamento);
    const apartments = await cache.getInstance().getAll();
    const newApartment: Apartment = {
      id: apartments.length + 1,
      name: nuevoDepartamento.name,
      price: nuevoDepartamento.price,
      expenses: nuevoDepartamento.expenses,
      owner: userInfo.getInstance().getUser()!,
      description: nuevoDepartamento.description,
      hasParking: nuevoDepartamento.hasParking,
      hasPets: nuevoDepartamento.hasPets,
      hasPool: nuevoDepartamento.hasPool,
      hasGym: nuevoDepartamento.hasGym,
      images: nuevoDepartamento.images,
      floor: nuevoDepartamento.floor,
      letter: nuevoDepartamento.letter,
      bathrooms: nuevoDepartamento.bathrooms,
      rooms: nuevoDepartamento.rooms,
      additionalInfo: nuevoDepartamento.additionalInfo,
      // rating hardcodeado
      rating: Math.floor(Math.random() * 5) + 1,
    };
    cache.getInstance().addData(newApartment);
    setShowConfirmation(true);
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
      images: [],
      floor: 0,
      letter: "",
      bathrooms: 0,
      rooms: 0,
      additionalInfo: "",
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
                <Label htmlFor="nombre" className="flex items-center space-x-2">
                  <Home size={18} />
                  <span>Nombre del Departamento</span>
                </Label>
                <Input
                  id="nombre"
                  name="nombre"
                  onChange={manejarCambioInput}
                  value={nuevoDepartamento.name}
                  placeholder="Ingrese el nombre del departamento"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imagen" className="flex items-center space-x-2">
                  <Upload size={18} />
                  <span>Imagen del Departamento</span>
                </Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="imagen"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Haz clic para subir</span> o arrastra y
                        suelta
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG o GIF (MAX. 800x400px)</p>
                    </div>
                    <Input
                      id="imagen"
                      name="imagen"
                      type="file"
                      className="hidden"
                      onChange={manejarCambioInput}
                    />
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="piso" className="flex items-center space-x-2">
                    <Building size={18} />
                    <span>Piso</span>
                  </Label>
                  <Input
                    id="piso"
                    name="piso"
                    type="number"
                    onChange={manejarCambioInput}
                    value={nuevoDepartamento.floor}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="letra" className="flex items-center space-x-2">
                    <Home size={18} />
                    <span>Letra</span>
                  </Label>
                  <Input
                    id="letra"
                    name="letra"
                    onChange={manejarCambioInput}
                    value={nuevoDepartamento.letter}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion" className="flex items-center space-x-2">
                  <Info size={18} />
                  <span>Descripción</span>
                </Label>
                <Textarea
                  id="descripcion"
                  name="descripcion"
                  onChange={manejarCambioInput}
                  value={nuevoDepartamento.description}
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="banos" className="flex items-center space-x-2">
                    <Bath size={18} />
                    <span>Número de Baños</span>
                  </Label>
                  <Input
                    id="banos"
                    name="banos"
                    type="number"
                    onChange={manejarCambioInput}
                    value={nuevoDepartamento.bathrooms}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ambientes" className="flex items-center space-x-2">
                    <Home size={18} />
                    <span>Número de Ambientes</span>
                  </Label>
                  <Input
                    id="ambientes"
                    name="ambientes"
                    type="number"
                    onChange={manejarCambioInput}
                    value={nuevoDepartamento.rooms}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="precio" className="flex items-center space-x-2">
                    <DollarSign size={18} />
                    <span>Precio de Alquiler</span>
                  </Label>
                  <Input
                    id="precio"
                    name="precio"
                    type="number"
                    onChange={manejarCambioInput}
                    value={nuevoDepartamento.price}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expensas" className="flex items-center space-x-2">
                    <DollarSign size={18} />
                    <span>Expensas</span>
                  </Label>
                  <Input
                    id="expensas"
                    name="expensas"
                    type="number"
                    onChange={manejarCambioInput}
                    value={nuevoDepartamento.expenses}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="informacionAdicional" className="flex items-center space-x-2">
                  <Info size={18} />
                  <span>Información Adicional</span>
                </Label>
                <Textarea
                  id="informacionAdicional"
                  name="informacionAdicional"
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
                        onCheckedChange={manejarCambioCheckbox("tieneEstacionamiento")}
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
                        onCheckedChange={manejarCambioCheckbox("permiteMascotas")}
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
                        onCheckedChange={manejarCambioCheckbox("tienePiscina")}
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
                        onCheckedChange={manejarCambioCheckbox("tieneGimnasio")}
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
      </div>

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
    </TooltipProvider>
  );
}
