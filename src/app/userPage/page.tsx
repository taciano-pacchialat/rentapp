'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PlusCircle, Edit, Home, Car, PawPrint, Waves, Dumbbell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Apartment {
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

const userApartments: Apartment[] = [
  {
    id: 1,
    name: 'Apartamento moderno en el centro',
    price: 1200,
    expenses: 200,
    owner: 'Juan Pérez',
    description: 'Hermoso apartamento en el corazón de la ciudad',
    hasParking: true,
    hasPets: false,
    hasPool: true,
    hasGym: true,
    images: ['/images/depto2.jpg'],
    floor: 5,
    letter: 'A',
    bathrooms: 2,
    rooms: 3,
    additionalInfo: 'Cerca de transporte público y zonas comerciales'
  },
  {
    id: 2,
    name: 'Loft con vistas al mar',
    price: 1500,
    expenses: 250,
    owner: 'María González',
    description: 'Espacioso loft con increíbles vistas al océano',
    hasParking: true,
    hasPets: true,
    hasPool: true,
    hasGym: false,
    images: ['/images/depto1.jpg'],
    floor: 10,
    letter: 'B',
    bathrooms: 1,
    rooms: 1,
    additionalInfo: 'Terraza privada y acceso directo a la playa'
  },
  {
    id: 3,
    name: 'Piso familiar en zona tranquila',
    price: 1000,
    expenses: 150,
    owner: 'Carlos Rodríguez',
    description: 'Amplio piso ideal para familias en barrio residencial',
    hasParking: true,
    hasPets: true,
    hasPool: false,
    hasGym: false,
    images: ['/images/depto2.jpg'],
    floor: 2,
    letter: 'C',
    bathrooms: 2,
    rooms: 4,
    additionalInfo: 'Parque infantil y escuelas cercanas'
  }
]

export default function UserPage() {
  const router = useRouter()

  const handleAddProperty = () => {
    router.push('/agregar-departamento')
  }
  const handleInicio = () => {
    router.push('/homePage')
  }

  const handleEditProperty = (id: number) => {
    router.push(`/modificar-departamento/${id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white text-gray-800 p-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-20 h-20">
              <Image
                src="/images/RentApp_icon-removebg-preview.png"
                alt="RentApp Logo"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <span className="text-2xl font-bold text-blue-600">RentApp</span>
          </Link>
          <nav>
            <Button variant="ghost" className="text-gray-800 hover:text-blue-600" onClick={handleInicio}>
              <Home className="mr-2 h-4 w-4" />
              Inicio
            </Button>
          </nav>
        </div>
      </header>
      <main className="container mx-auto mt-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Mis Propiedades</h1>
          <Button onClick={handleAddProperty} className="bg-blue-600 hover:bg-blue-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar Propiedad
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userApartments.map((apartment) => (
            <Card key={apartment.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <Image
                  src={apartment.images[0]}
                  alt={apartment.name}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start p-4">
                <h2 className="font-semibold text-lg mb-2">{apartment.name}</h2>
                <p className="text-blue-600 font-bold mb-2">${apartment.price}/mes + ${apartment.expenses} gastos</p>
                <p className="text-sm text-gray-600 mb-2">
                  {apartment.rooms} hab. | {apartment.bathrooms} baños | Piso {apartment.floor}{apartment.letter}
                </p>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{apartment.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {apartment.hasParking && <Badge variant="secondary"><Car className="h-4 w-4 mr-1" />Parking</Badge>}
                  {apartment.hasPets && <Badge variant="secondary"><PawPrint className="h-4 w-4 mr-1" />Mascotas</Badge>}
                  {apartment.hasPool && <Badge variant="secondary"><Waves className="h-4 w-4 mr-1" />Piscina</Badge>}
                  {apartment.hasGym && <Badge variant="secondary"><Dumbbell className="h-4 w-4 mr-1" />Gimnasio</Badge>}
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{apartment.additionalInfo}</p>
                <Button onClick={() => handleEditProperty(apartment.id)} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Edit className="mr-2 h-4 w-4" />
                  Modificar Propiedad
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}