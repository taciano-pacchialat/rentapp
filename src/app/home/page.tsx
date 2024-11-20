'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import NavBar from "@/components/ui/NavBar"

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
  rating: number;
}

const featuredApartments: Apartment[] = [
  {
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
      "/images/cuanto_mide_departamento_ideal.jpg",
      "/images/depto.jpg",
      "/images/cuanto_mide_departamento_ideal.jpg"
    ],
    floor: 5,
    letter: "A",
    bathrooms: 2,
    rooms: 2,
    additionalInfo: "Recientemente renovado",
    rating: 4.7,
  },
  {
    id: 2,
    name: "Acogedor estudio",
    price: 120000,
    expenses: 8000,
    owner: "María González",
    description: "Cómodo estudio perfecto para solteros o parejas",
    hasParking: false,
    hasPets: false,
    hasPool: false,
    hasGym: true,
    images: [
      "/images/depto1.jpg",
      "/images/depto2.jpg",
      "/images/depto1.jpg"
    ],
    floor: 2,
    letter: "B",
    bathrooms: 1,
    rooms: 1,
    additionalInfo: "Excelente ubicación",
    rating: 3.2,
  },
  {
    id: 3,
    name: "Apartamento familiar con vista",
    price: 250000,
    expenses: 20000,
    owner: "Carlos Rodríguez",
    description: "Espacioso apartamento de 3 dormitorios con hermosa vista a la ciudad",
    hasParking: true,
    hasPets: true,
    hasPool: true,
    hasGym: true,
    images: [
      "/images/depto2.jpg",
      "/images/depto1.jpg",
      "/images/depto2.jpg"
    ],
    floor: 8,
    letter: "C",
    bathrooms: 2,
    rooms: 3,
    additionalInfo: "Terraza privada",
    rating: 5,
  },
  {
    id: 4,
    name: "Loft moderno en zona trendy",
    price: 180000,
    expenses: 12000,
    owner: "Ana Martínez",
    description: "Loft de diseño en el corazón del barrio más de moda",
    hasParking: false,
    hasPets: true,
    hasPool: false,
    hasGym: true,
    images: [
      "/images/depto1.jpg",
      "/images/depto2.jpg",
      "/images/1.jpg"
    ],
    floor: 3,
    letter: "D",
    bathrooms: 1,
    rooms: 1,
    additionalInfo: "Cerca de restaurantes y vida nocturna",
    rating: 4.2,
  },
]

function ImageCarousel({ images, name }: { images: string[], name: string }) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="relative w-full pt-[56.25%]">
      <Image
        src={images[currentImageIndex]}
        alt={`Imagen ${currentImageIndex + 1} de ${name}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {images.length > 1 && (
        <>
          {currentImageIndex > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-[#0066FF] rounded-full p-1"
              onClick={(e) => {
                e.preventDefault();
                prevImage();
              }}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Imagen anterior</span>
            </Button>
          )}
          {currentImageIndex < images.length - 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-[#0066FF] rounded-full p-1"
              onClick={(e) => {
                e.preventDefault();
                nextImage();
              }}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Siguiente imagen</span>
            </Button>
          )}
        </>
      )}
    </div>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <div key={star} className="relative">
          <Star
            className={`h-5 w-5 ${
              star <= Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
          {star > Math.floor(rating) && star <= Math.ceil(rating) && (
            <div 
              className="absolute top-0 left-0 overflow-hidden text-yellow-400 fill-current"
              style={{ width: `${(rating % 1) * 100}%` }}
            >
              <Star className="h-5 w-5" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Encuentra tu próximo hogar
        </h1>
        <section className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">¿Buscas un apartamento?</h2>
          <p className="text-gray-600 mb-6">Explora nuestra amplia selección de propiedades y encuentra el hogar perfecto para ti.</p>
          <Link href="/search">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg">
              Iniciar búsqueda
            </Button>
          </Link>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Departamentos destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredApartments.map((apartment) => (
              <Card key={apartment.id} className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow p-0">
                <ImageCarousel images={apartment.images} name={apartment.name} />
                <CardHeader>
                  <CardTitle className="text-[#0066FF] truncate">{apartment.name}</CardTitle>
                  <CardDescription className="truncate">Propietario: {apartment.owner}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-gray-600 line-clamp-3">{apartment.description}</p>
                  <p className="text-sm text-gray-500 mt-2">Piso: {apartment.floor}, Letra: {apartment.letter}</p>
                  <p className="text-sm text-gray-500">Baños: {apartment.bathrooms}, Habitaciones: {apartment.rooms}</p>
                  <div className="mt-2">
                    <StarRating rating={apartment.rating} />
                  </div>
                </CardContent>
                <CardFooter className="mt-auto flex justify-between items-center">
                  <p className="text-lg font-bold">
                    ${apartment.price.toLocaleString()}/mes
                  </p>
                  <p className="text-sm text-gray-500">
                    Expensas: ${apartment.expenses.toLocaleString()}
                  </p>
                </CardFooter>
                <CardFooter>
                  <Link href={`/departamento/${apartment.id}`} className="w-full">
                    <Button className="w-full">Ver detalles</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}