'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Bath, Box, DollarSign, Car, Dumbbell, Waves, Cat, Info, ChevronLeft, ChevronRight, Star, User } from 'lucide-react'
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

interface DetallesDepartamentoProps {
  apartment: Apartment;
}

const DetallesDepartamento: React.FC<DetallesDepartamentoProps> = ({ apartment }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? apartment.images.length - 1 : prevIndex - 1
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === apartment.images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(apartment.rating)
    const decimalPart = apartment.rating - fullStars

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />)
      } else if (i === fullStars && decimalPart > 0) {
        const percentFilled = decimalPart * 100
        stars.push(
          <div key={i} className="relative w-4 h-4">
            <Star className="w-4 h-4 text-gray-300 absolute" />
            <div className="overflow-hidden absolute" style={{ width: `${percentFilled}%` }}>
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
            </div>
          </div>
        )
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />)
      }
    }
    return stars
  }

  return (
    <>
      <NavBar />
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-blue-600">{apartment.name}</CardTitle>
            <div className="flex items-center">
              {renderStars()}
              <span className="ml-2 text-sm text-gray-600">({apartment.rating.toFixed(1)})</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[400px] mb-6">
            <img 
              src={apartment.images[currentImageIndex]}
              alt={`${apartment.name} - Imagen ${currentImageIndex + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <Home className="mr-2 text-blue-600" />
              <span>Piso {apartment.floor}, Letra {apartment.letter}</span>
            </div>
            <div className="flex items-center">
              <Bath className="mr-2 text-blue-600" />
              <span>{apartment.bathrooms} Baños</span>
            </div>
            <div className="flex items-center">
              <Box className="mr-2 text-blue-600" />
              <span>{apartment.rooms} Ambientes</span>
            </div>
            <div className="flex items-center">
              <User className="mr-2 text-blue-600" />
              <span>Propietario: {apartment.owner}</span>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Descripción</h3>
            <p>{apartment.description}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Características</h3>
            <div className="flex flex-wrap gap-2">
              {apartment.hasParking && <Badge variant="secondary"><Car className="mr-1" /> Estacionamiento</Badge>}
              {apartment.hasPets && <Badge variant="secondary"><Cat className="mr-1" /> Permite Mascotas</Badge>}
              {apartment.hasPool && <Badge variant="secondary"><Waves className="mr-1" /> Piscina</Badge>}
              {apartment.hasGym && <Badge variant="secondary"><Dumbbell className="mr-1" /> Gimnasio</Badge>}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Costos</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <DollarSign className="mr-2 text-blue-600" />
                <span><span className="font-semibold">Alquiler:</span> ${apartment.price}/mes</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="mr-2 text-blue-600" />
                <span><span className="font-semibold">Expensas:</span> ${apartment.expenses}/mes</span>
              </div>
            </div>
          </div>
          {apartment.additionalInfo && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Información Adicional</h3>
              <div className="flex items-start">
                <Info className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                <p>{apartment.additionalInfo}</p>
              </div>
            </div>
          )}
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Solicitar Alquiler</Button>
        </CardContent>
      </Card>
    </>
  )
}

export default DetallesDepartamento