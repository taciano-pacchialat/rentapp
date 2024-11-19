'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, User, LogIn, LogOut, Car, PawPrint, Waves, Dumbbell } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

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

const featuredApartments: Apartment[] = [
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
    images: ['/images/depto1.jpg'],
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
    images: ['/images/depto2.jpg'],
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
  },
  {
    id: 4,
    name: 'Estudio cerca de la universidad',
    price: 800,
    expenses: 100,
    owner: 'Ana Martínez',
    description: 'Cómodo estudio perfecto para estudiantes',
    hasParking: false,
    hasPets: false,
    hasPool: false,
    hasGym: true,
    images: ['/images/depto1.jpg'],
    floor: 3,
    letter: 'D',
    bathrooms: 1,
    rooms: 1,
    additionalInfo: 'Incluye servicios de internet y limpieza semanal'
  },
]

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Verificar si el usuario está logueado al cargar la página
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(userLoggedIn)
  }, [])

  const handleLoginClick = () => {
    router.push('/iniciar-sesion')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('isLoggedIn')
  }

  const handleProfileClick = () => {
    router.push('/perfil')
  }

  const handleSearchClick = () => {
    router.push('/busqueda')
  }

  return (
    <div className="min-h-screen bg-white">
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
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" className="text-gray-800 hover:text-blue-600" onClick={handleProfileClick}>
                  <User className="mr-2 h-4 w-4" />
                  Mi Perfil
                </Button>
                <Button variant="ghost" className="text-gray-800 hover:text-blue-600" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Button variant="ghost" className="text-gray-800 hover:text-blue-600" onClick={handleLoginClick}>
                <LogIn className="mr-2 h-4 w-4" />
                Iniciar Sesión
              </Button>
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Encuentra tu próximo hogar
        </h1>
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex">
            <Input
              type="text"
              placeholder="Buscar departamentos..."
              className="flex-grow"
              onClick={handleSearchClick}
            />
            <Button type="submit" className="ml-2 bg-blue-600 hover:bg-blue-700" onClick={handleSearchClick}>
              <Search className="h-4 w-4" />
              <span className="sr-only">Buscar</span>
            </Button>
          </div>
        </div>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Departamentos destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredApartments.map((apartment) => (
              <Link href={`/departamento/${apartment.id}`} key={apartment.id}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <Image
                      src={apartment.images[0]}
                      alt={apartment.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </CardContent>
                  <CardFooter className="flex flex-col items-start p-4">
                    <h3 className="font-semibold text-lg mb-2">{apartment.name}</h3>
                    <p className="text-blue-600 font-bold mb-2">${apartment.price}/mes + ${apartment.expenses} gastos</p>
                    <p className="text-sm text-gray-600 mb-2">{apartment.rooms} hab. | {apartment.bathrooms} baños | Piso {apartment.floor}{apartment.letter}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {apartment.hasParking && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Car className="h-4 w-4 mr-1" />
                          <span>Parking</span>
                        </div>
                      )}
                      {apartment.hasPets && (
                        <div className="flex items-center text-sm text-gray-600">
                          <PawPrint className="h-4 w-4 mr-1" />
                          <span>Mascotas</span>
                        </div>
                      )}
                      {apartment.hasPool && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Waves className="h-4 w-4 mr-1" />
                          <span>Piscina</span>
                        </div>
                      )}
                      {apartment.hasGym && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Dumbbell className="h-4 w-4 mr-1" />
                          <span>Gimnasio</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{apartment.description}</p>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}