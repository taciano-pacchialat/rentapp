'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Trash2, Save, X, Plus } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
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
} from "@/components/ui/alert-dialog"

type Apartment = {
  id: number;
  name: string;
  price: number;
  expenses: number;
  owner: string;
  description: string;
  hasParking: boolean;
  hasPets: boolean;
  hasPool: boolean;
  hasGym: boolean;
  images: string[];
  floor: number;
  letter: string;
  bathrooms: number;
  rooms: number;
  additionalInfo: string;
}

const initialApartment: Apartment = {
  id: 1,
  name: "Apartamento de lujo en el centro",
  price: 200000,
  expenses: 15000,
  owner: "Juan Pérez",
  description: "Moderno apartamento de 2 dormitorios en el corazón del centro",
  hasParking: true,
  hasPets: true,
  hasPool: true,
  hasGym: false,
  images: [
    "/images/depto1.jpg",
    "/images/depto2.jpg",
    "/images/depto3.jpg"
  ],
  floor: 5,
  letter: "A",
  bathrooms: 2,
  rooms: 2,
  additionalInfo: "Recientemente renovado",
}

export default function EditApartment() {
  const [apartment, setApartment] = useState<Apartment>(initialApartment)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setApartment(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setApartment(prev => ({ ...prev, [name]: checked }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setApartment(prev => ({ ...prev, [name]: parseInt(value) }))
  }

  const handleSave = () => {
    console.log("Guardando cambios:", apartment)
  }

  const handleDelete = () => {
    console.log("Eliminando publicación:", apartment.id)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
          <div className="flex h-16 items-center justify-between md:h-20">
            <Link href="/" className="text-lg font-semibold text-[#0066FF]">
              RentApp
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost">Perfil</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto py-8 px-4 md:px-6">
        <Card className="w-full max-w-4xl mx-auto border-[#0066FF] border-t-4">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-2xl font-bold text-[#0066FF]">Editar Apartamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del apartamento</Label>
              <Input
                id="name"
                name="name"
                value={apartment.name}
                onChange={handleChange}
                className="border-[#0066FF] focus-visible:ring-[#0066FF]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Precio (ARS)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={apartment.price}
                  onChange={handleChange}
                  className="border-[#0066FF] focus-visible:ring-[#0066FF]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expenses">Expensas (ARS)</Label>
                <Input
                  id="expenses"
                  name="expenses"
                  type="number"
                  value={apartment.expenses}
                  onChange={handleChange}
                  className="border-[#0066FF] focus-visible:ring-[#0066FF]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                value={apartment.description}
                onChange={handleChange}
                rows={4}
                className="border-[#0066FF] focus-visible:ring-[#0066FF]"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasParking"
                  checked={apartment.hasParking}
                  onCheckedChange={handleCheckboxChange('hasParking')}
                  className="border-[#0066FF] data-[state=checked]:bg-[#0066FF] data-[state=checked]:text-white"
                />
                <Label htmlFor="hasParking">Estacionamiento</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasPets"
                  checked={apartment.hasPets}
                  onCheckedChange={handleCheckboxChange('hasPets')}
                  className="border-[#0066FF] data-[state=checked]:bg-[#0066FF] data-[state=checked]:text-white"
                />
                <Label htmlFor="hasPets">Acepta mascotas</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasPool"
                  checked={apartment.hasPool}
                  onCheckedChange={handleCheckboxChange('hasPool')}
                  className="border-[#0066FF] data-[state=checked]:bg-[#0066FF] data-[state=checked]:text-white"
                />
                <Label htmlFor="hasPool">Piscina</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasGym"
                  checked={apartment.hasGym}
                  onCheckedChange={handleCheckboxChange('hasGym')}
                  className="border-[#0066FF] data-[state=checked]:bg-[#0066FF] data-[state=checked]:text-white"
                />
                <Label htmlFor="hasGym">Gimnasio</Label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="floor">Piso</Label>
                <Input
                  id="floor"
                  name="floor"
                  type="number"
                  value={apartment.floor}
                  onChange={handleChange}
                  className="border-[#0066FF] focus-visible:ring-[#0066FF]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="letter">Letra</Label>
                <Input
                  id="letter"
                  name="letter"
                  value={apartment.letter}
                  onChange={handleChange}
                  className="border-[#0066FF] focus-visible:ring-[#0066FF]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rooms">Habitaciones</Label>
                <Select
                  value={apartment.rooms.toString()}
                  onValueChange={handleSelectChange('rooms')}
                >
                  <SelectTrigger id="rooms" className="border-[#0066FF] focus:ring-[#0066FF]">
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

            <div className="space-y-2">
              <Label htmlFor="bathrooms">Baños</Label>
              <Select
                value={apartment.bathrooms.toString()}
                onValueChange={handleSelectChange('bathrooms')}
              >
                <SelectTrigger id="bathrooms" className="border-[#0066FF] focus:ring-[#0066FF]">
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
              <Label htmlFor="additionalInfo">Información adicional</Label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                value={apartment.additionalInfo}
                onChange={handleChange}
                rows={3}
                className="border-[#0066FF] focus-visible:ring-[#0066FF]"
              />
            </div>

            <div className="space-y-2">
              <Label>Imágenes</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {apartment.images.map((image, index) => (
                  <div key={index} className="relative aspect-video">
                    <Image
                      src={image}
                      alt={`Imagen ${index + 1} del apartamento`}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
              <Button className="mt-2 bg-[#0066FF] hover:bg-[#0052CC]">
                <Plus className="mr-2 h-4 w-4" />
                Agregar imagen
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 bg-gray-50">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full sm:w-auto">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar publicación
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. Esto eliminará permanentemente tu publicación
                    y removerá los datos de nuestros servidores.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button variant="outline" onClick={() => window.history.back()} className="w-full sm:w-auto">
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
              <Button onClick={handleSave} className="w-full sm:w-auto bg-[#0066FF] hover:bg-[#0052CC]">
                <Save className="mr-2 h-4 w-4" />
                Guardar cambios
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
} 