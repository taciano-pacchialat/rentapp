/* Cambios para hacer al 12/11
   Agregar vinculaciones con paginas, home para el logo y departamento respectivo en la ver detalle.
   Agregar vinculaciones con Base de datos
*/

'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SlidersHorizontal, Search, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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

const apartments: Apartment[] = [
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
      "/images/depto.jpg",
      "/images/cuanto_mide_departamento_ideal.jpg",
      "/images/depto.jpg"
    ],
    floor: 2,
    letter: "B",
    bathrooms: 1,
    rooms: 1,
    additionalInfo: "Excelente ubicación",
  },
  {
    id: 3,
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
  },
  {
    id: 4,
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
  },
]

function ImageCarousel({ images, name }: { images: string[], name: string }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  if (!isMounted) {
    return null // or a loading placeholder
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

export default function Component() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(10000000)
  const [filters, setFilters] = useState({
    hasParking: false,
    hasPets: false,
    hasPool: false,
    hasGym: false,
    rooms1: false,
    rooms2: false,
    rooms3: false,
  })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const filteredApartments = apartments.filter(apt => {
    if (searchQuery && !apt.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    if (filters.hasParking && !apt.hasParking) return false
    if (filters.hasPets && !apt.hasPets) return false
    if (filters.hasPool && !apt.hasPool) return false
    if (filters.hasGym && !apt.hasGym) return false
    if (filters.rooms1 && apt.rooms !== 1) return false
    if (filters.rooms2 && apt.rooms !== 2) return false
    if (filters.rooms3 && apt.rooms > 2) return false
    if (apt.price && (apt.price < minPrice || apt.price > maxPrice)) return false
    
    return true
  })

  if (!isMounted) {
    return null // or a loading placeholder
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
          <div className="flex h-16 items-center justify-between md:h-20">
            <Link href="/" className="text-lg font-semibold text-[#0066FF]">
              RentApp
            </Link>
            <div className="flex items-center gap-2 md:gap-4">
              <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Abrir búsqueda</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="top" className="w-full">
                  <SheetHeader>
                    <SheetTitle>Buscar Apartamentos</SheetTitle>
                    <SheetDescription>Ingrese su búsqueda a continuación</SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        className="w-full pl-8 pr-4 py-2"
                        placeholder="Buscar apartamentos..."
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  className="w-full min-w-[300px] pl-8"
                  placeholder="Buscar apartamentos..."
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <SlidersHorizontal className="h-5 w-5" />
                    <span className="sr-only">Alternar filtros</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filtros</SheetTitle>
                    <SheetDescription>Refina tu búsqueda de apartamentos</SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-4">
                      <h3 className="font-medium">Comodidades</h3>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="parking"
                          checked={filters.hasParking}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({ ...prev, hasParking: checked === true }))
                          }
                        />
                        <label htmlFor="parking" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Estacionamiento disponible
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="pets"
                          checked={filters.hasPets}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({ ...prev, hasPets: checked === true }))
                          }
                        />
                        <label htmlFor="pets" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Acepta mascotas
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="pool"
                          checked={filters.hasPool}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({ ...prev, hasPool: checked === true }))
                          }
                        />
                        <label htmlFor="pool" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Piscina
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="gym"
                          checked={filters.hasGym}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({ ...prev, hasGym: checked === true }))
                          }
                        />
                        <label htmlFor="gym" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Gimnasio
                        </label>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-medium">Número de Habitaciones</h3>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="1room"
                          checked={filters.rooms1}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({ ...prev, rooms1: checked === true }))
                          }
                        />
                        <label htmlFor="1room" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          1 Habitación
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="2rooms"
                          checked={filters.rooms2}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({ ...prev, rooms2: checked === true }))
                          }
                        />
                        <label htmlFor="2rooms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          2 Habitaciones
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="3rooms"
                          checked={filters.rooms3}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({ ...prev, rooms3: checked === true }))
                          }
                        />
                        <label htmlFor="3rooms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          3+ Habitaciones
                        </label>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-medium">Rango de Precio (ARS)</h3>
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="minPrice" className="text-sm font-medium">
                          Precio mínimo
                        </label>
                        <Input
                          id="minPrice"
                          type="number"
                          min="0"
                          max="10000000"
                          value={minPrice}
                          onChange={(e) => setMinPrice(Number(e.target.value))}
                          placeholder="Precio mínimo"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="maxPrice" className="text-sm font-medium">
                          Precio máximo
                        </label>
                        <Input
                          id="maxPrice"
                          type="number"
                          min="0"
                          max="10000000"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(Number(e.target.value))}
                          placeholder="Precio máximo"
                        />
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
      <main className="w-full max-w-7xl py-8 px-4 md:px-6">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredApartments.map((apartment) => (
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
              </CardContent>
              <CardFooter className="mt-auto flex justify-between items-center">
                <p className="text-lg font-bold">
                  {apartment.price ? `$${apartment.price.toLocaleString()}/mes` : 'Precio no disponible'}
                </p>
                <p className="text-sm text-gray-500">
                  Expensas: {apartment.expenses ? `$${apartment.expenses.toLocaleString()}` : 'No especificado'}
                </p>
              </CardFooter>
              <CardFooter>
                <Link href={`/apartment/${apartment.id}`} className="w-full">
                  <Button className="w-full">Ver detalles</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}