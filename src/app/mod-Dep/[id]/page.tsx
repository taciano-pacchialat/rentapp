"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import NavBar from "@/components/ui/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
  Trash2,
  MapPin,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import cache, { Cache } from "@/lib/cache";
import { Apartment} from "@/types/apartment";

export default function EditApartmentPage() {
  const router = useRouter();
  const { id } = useParams();
  const [apartment, setApartment] = useState<Apartment | null>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApartment((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setApartment((prev) => (prev ? { ...prev, [name]: checked } : null));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setApartment((prev) => (prev ? { ...prev, [name]: parseInt(value) } : null));
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (apartment) {
    const updatedApartment: Partial<Apartment> = {
      ...apartment,
    };

    // Actualizar el apartamento en la cache
    Cache.getInstance().updateData(apartment.id, updatedApartment);
    router.push("/userPage"); // Redirigir después de guardar
  }
};

  const handleDelete = () => {
    if (apartment) {
      cache.getInstance().removeData(apartment.id);
      console.log("Apartment deleted:", apartment.id);
      router.push("/userPage"); // Redirige a la página principal después de eliminar
    }
  };

  if (!apartment) {
    return <div>Cargando...</div>;
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <main className="container mx-auto py-8 px-4">
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-600">
                Editar Departamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                

                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center space-x-2">
                    <Home size={18} />
                    <span>Nombre del Departamento</span>
                  </Label>
                  <Input id="name" name="name" onChange={handleChange} value={apartment.name} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="street_address" className="flex items-center space-x-2">
                    <MapPin size={18} />
                    <span>Dirección del Departamento</span>
                  </Label>
                  <Input
                    id="street_address"
                    name="street_address"
                    onChange={handleChange}
                    value={apartment.street_address}
                    placeholder="Ingrese la dirección del departamento"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="floor" className="flex items-center space-x-2">
                      <Building size={18} />
                      <span>Piso</span>
                    </Label>
                    <Input
                      id="floor"
                      name="floor"
                      type="number"
                      onChange={handleChange}
                      value={apartment.floor}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="letter" className="flex items-center space-x-2">
                      <Home size={18} />
                      <span>Letra</span>
                    </Label>
                    <Input
                      id="letter"
                      name="letter"
                      onChange={handleChange}
                      value={apartment.letter}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center space-x-2">
                    <Info size={18} />
                    <span>Descripción</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    onChange={handleChange}
                    value={apartment.description}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms" className="flex items-center space-x-2">
                      <Bath size={18} />
                      <span>Número de Baños</span>
                    </Label>
                    <Select
                      value={apartment.bathrooms.toString()}
                      onValueChange={handleSelectChange("bathrooms")}
                    >
                      <SelectTrigger id="bathrooms">
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rooms" className="flex items-center space-x-2">
                      <Home size={18} />
                      <span>Número de Habitaciones</span>
                    </Label>
                    <Select
                      value={apartment.rooms.toString()}
                      onValueChange={handleSelectChange("rooms")}
                    >
                      <SelectTrigger id="rooms">
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                      </SelectContent>
                    </Select>
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
                      onChange={handleChange}
                      value={apartment.price}
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
                      onChange={handleChange}
                      value={apartment.expenses}
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
                    onChange={handleChange}
                    value={apartment.additionalInfo}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hasParking"
                          onCheckedChange={handleCheckboxChange("hasParking")}
                          checked={apartment.hasParking}
                        />
                        <Label
                          htmlFor="hasParking"
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
                          id="hasPets"
                          onCheckedChange={handleCheckboxChange("hasPets")}
                          checked={apartment.hasPets}
                        />
                        <Label
                          htmlFor="hasPets"
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
                          id="hasPool"
                          onCheckedChange={handleCheckboxChange("hasPool")}
                          checked={apartment.hasPool}
                        />
                        <Label
                          htmlFor="hasPool"
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
                          id="hasGym"
                          onCheckedChange={handleCheckboxChange("hasGym")}
                          checked={apartment.hasGym}
                        />
                        <Label
                          htmlFor="hasGym"
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
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. Esto eliminará permanentemente el
                      departamento y removerá los datos de nuestros servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button
                type="submit"
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Guardar Cambios
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </TooltipProvider>
  );
}
