'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Bath, Box, DollarSign, Car, Dumbbell, Waves, Cat, Info, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import NavBar from "@/components/ui/NavBar"

interface Departamento {
  piso: number;
  letra: string;
  imagenes: string[];
  descripcion: string;
  banos: number;
  ambientes: number;
  informacionAdicional: string;
  precio: number;
  expensas: number;
  tieneEstacionamiento: boolean;
  permiteMascotas: boolean;
  tienePiscina: boolean;
  tieneGimnasio: boolean;
  calificacion: number;
}

interface DetallesDepartamentoProps {
  departamento: Departamento;
}

const DetallesDepartamento: React.FC<DetallesDepartamentoProps> = ({ departamento }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? departamento.imagenes.length - 1 : prevIndex - 1
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === departamento.imagenes.length - 1 ? 0 : prevIndex + 1
    )
  }

  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(departamento.calificacion)
    const decimalPart = departamento.calificacion - fullStars

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
            <CardTitle className="text-2xl font-bold text-blue-600">Departamento {departamento.piso}{departamento.letra}</CardTitle>
            <div className="flex items-center">
              {renderStars()}
              <span className="ml-2 text-sm text-gray-600">({departamento.calificacion.toFixed(1)})</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[400px] mb-6">
            <img 
              src={departamento.imagenes[currentImageIndex]}
              alt={`Departamento ${departamento.piso}${departamento.letra} - Imagen ${currentImageIndex + 1}`}
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
              <span>Piso {departamento.piso}, Letra {departamento.letra}</span>
            </div>
            <div className="flex items-center">
              <Bath className="mr-2 text-blue-600" />
              <span>{departamento.banos} Baños</span>
            </div>
            <div className="flex items-center">
              <Box className="mr-2 text-blue-600" />
              <span>{departamento.ambientes} Ambientes</span>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Descripción</h3>
            <p>{departamento.descripcion}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Características</h3>
            <div className="flex flex-wrap gap-2">
              {departamento.tieneEstacionamiento && <Badge variant="secondary"><Car className="mr-1" /> Estacionamiento</Badge>}
              {departamento.permiteMascotas && <Badge variant="secondary"><Cat className="mr-1" /> Permite Mascotas</Badge>}
              {departamento.tienePiscina && <Badge variant="secondary"><Waves className="mr-1" /> Piscina</Badge>}
              {departamento.tieneGimnasio && <Badge variant="secondary"><Dumbbell className="mr-1" /> Gimnasio</Badge>}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Costos</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <DollarSign className="mr-2 text-blue-600" />
                <span><span className="font-semibold">Alquiler:</span> ${departamento.precio}/mes</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="mr-2 text-blue-600" />
                <span><span className="font-semibold">Expensas:</span> ${departamento.expensas}/mes</span>
              </div>
            </div>
          </div>
          {departamento.informacionAdicional && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Información Adicional</h3>
              <div className="flex items-start">
                <Info className="mr-2 mt-1 flex-shrink-0 text-blue-600" />
                <p>{departamento.informacionAdicional}</p>
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