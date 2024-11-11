"use client";
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/text-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Apartment {
  id: string
  image: string
  floor: number
  letter: string
  description: string
  bathrooms: number
  rooms: number
  additionalInfo: string
  price: number
}

export default function AddApartment() {
  const [newApartment, setNewApartment] = useState<Apartment>({
    id: '',
    image: '',
    floor: 0,
    letter: '',
    description: '',
    bathrooms: 0,
    rooms: 0,
    additionalInfo: '',
    price: 0
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewApartment(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar el departamento en la base de datos
    console.log('Nuevo departamento:', newApartment)
    // Reiniciar el formulario
    setNewApartment({
      id: '',
      image: '',
      floor: 0,
      letter: '',
      description: '',
      bathrooms: 0,
      rooms: 0,
      additionalInfo: '',
      price: 0
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-600">Agregar Nuevo Departamento</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="image">Imagen</Label>
            <Input id="image" name="image" type="file" onChange={handleInputChange} className="cursor-pointer" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="floor">Piso</Label>
              <Input id="floor" name="floor" type="number" onChange={handleInputChange} value={newApartment.floor} />
            </div>
            <div>
              <Label htmlFor="letter">Letra</Label>
              <Input id="letter" name="letter" onChange={handleInputChange} value={newApartment.letter} />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" name="description" onChange={handleInputChange} value={newApartment.description} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bathrooms">Número de Baños</Label>
              <Input id="bathrooms" name="bathrooms" type="number" onChange={handleInputChange} value={newApartment.bathrooms} />
            </div>
            <div>
              <Label htmlFor="rooms">Número de Ambientes</Label>
              <Input id="rooms" name="rooms" type="number" onChange={handleInputChange} value={newApartment.rooms} />
            </div>
          </div>
          <div>
            <Label htmlFor="price">Precio de Alquiler</Label>
            <Input id="price" name="price" type="number" onChange={handleInputChange} value={newApartment.price} />
          </div>
          <div>
            <Label htmlFor="additionalInfo">Información Adicional</Label>
            <Textarea id="additionalInfo" name="additionalInfo" onChange={handleInputChange} value={newApartment.additionalInfo} />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Agregar Departamento</Button>
        </form>
      </CardContent>
    </Card>
  )
}