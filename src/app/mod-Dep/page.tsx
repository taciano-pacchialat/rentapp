"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import NavBar from '@/components/ui/NavBar'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Home, Bath, DollarSign, Info, Upload, Building, Car, Cat, Waves, Dumbbell, Star, Trash2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

interface Apartment {
  id: number
  name: string
  image: string
  floor: number
  letter: string
  description: string
  bathrooms: number
  rooms: number
  additionalInfo: string
  price: number
  expenses: number
  hasParking: boolean
  hasPets: boolean
  hasPool: boolean
  hasGym: boolean
}

export default function EditApartment() {
  const router = useRouter()
  const [apartment, setApartment] = useState<Apartment>({
    id: 1,
    name: "Apartamento de lujo en el centro",
    image: '',
    floor: 5,
    letter: 'A',
    description: "Moderno apartamento de 2 dormitorios en el corazón del centro",
    bathrooms: 2,
    rooms: 2,
    additionalInfo: "Recientemente renovado",
    price: 200000,
    expenses: 15000,
    hasParking: true,
    hasPets: true,
    hasPool: true,
    hasGym: false
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Apartment updated:', apartment)
    // Aquí iría la lógica para guardar los cambios en el backend
    router.push('/') // Redirige a la página principal después de guardar
  }

  const handleDelete = () => {
    console.log('Apartment deleted:', apartment.id)
    // Aquí iría la lógica para eliminar el apartamento en el backend
    router.push('/') // Redirige a la página principal después de eliminar
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <main className="container mx-auto py-8 px-4">
          <Card className="w-full max-w-2xl mx-auto">
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2 pt-6">
                  <Label htmlFor="image" className="flex items-center space-x-2">
                    <Upload size={18} />
                    <span>Imagen del Departamento</span>
                  </Label>
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Haz clic para subir</span> o arrastra y suelta</p>
                        <p className="text-xs text-gray-500">PNG, JPG o GIF (MAX. 800x400px)</p>
                      </div>
                      <Input id="image" name="image" type="file" className="hidden" onChange={handleChange} />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center space-x-2">
                    <Home size={18} />
                    <span>Nombre del Departamento</span>
                  </Label>
                  <Input id="name" name="name" onChange={handleChange} value={apartment.name} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="floor" className="flex items-center space-x-2">
                      <Building size={18} />
                      <span>Piso</span>
                    </Label>
                    <Input id="floor" name="floor" type="number" onChange={handleChange} value={apartment.floor} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="letter" className="flex items-center space-x-2">
                      <Home size={18} />
                      <span>Letra</span>
                    </Label>
                    <Input id="letter" name="letter" onChange={handleChange} value={apartment.letter} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center space-x-2">
                    <Info size={18} />
                    <span>Descripción</span>
                  </Label>
                  <Textarea id="description" name="description" onChange={handleChange} value={apartment.description} className="min-h-[100px]" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms" className="flex items-center space-x-2">
                      <Bath size={18} />
                      <span>Número de Baños</span>
                    </Label>
                    <Select value={apartment.bathrooms.toString()} onValueChange={handleSelectChange('bathrooms')}>
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
                    <Select value={apartment.rooms.toString()} onValueChange={handleSelectChange('rooms')}>
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
                    <Input id="price" name="price" type="number" onChange={handleChange} value={apartment.price} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expenses" className="flex items-center space-x-2">
                      <DollarSign size={18} />
                      <span>Expensas</span>
                    </Label>
                    <Input id="expenses" name="expenses" type="number" onChange={handleChange} value={apartment.expenses} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo" className="flex items-center space-x-2">
                    <Info size={18} />
                    <span>Información Adicional</span>
                  </Label>
                  <Textarea id="additionalInfo" name="additionalInfo" onChange={handleChange} value={apartment.additionalInfo} className="min-h-[100px]" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="hasParking" onCheckedChange={handleCheckboxChange('hasParking')} checked={apartment.hasParking} />
                        <Label htmlFor="hasParking" className="flex items-center space-x-2 cursor-pointer">
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
                        <Checkbox id="hasPets" onCheckedChange={handleCheckboxChange('hasPets')} checked={apartment.hasPets} />
                        <Label htmlFor="hasPets" className="flex items-center space-x-2 cursor-pointer">
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
                        <Checkbox id="hasPool" onCheckedChange={handleCheckboxChange('hasPool')} checked={apartment.hasPool} />
                        <Label htmlFor="hasPool" className="flex items-center space-x-2 cursor-pointer">
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
                        <Checkbox id="hasGym" onCheckedChange={handleCheckboxChange('hasGym')} checked={apartment.hasGym} />
                        <Label htmlFor="hasGym" className="flex items-center space-x-2 cursor-pointer">
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
                      Esta acción no se puede deshacer. Esto eliminará permanentemente el departamento
                      y removerá los datos de nuestros servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button type="submit" onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white">Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </TooltipProvider>
  )
}