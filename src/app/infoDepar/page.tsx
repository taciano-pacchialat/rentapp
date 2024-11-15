import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Bath, Box, DollarSign, Car, Dumbbell, Waves, Cat, Info } from 'lucide-react'

interface PropiedadesDepartamento {
  departamento: {
    id: string
    imagen: string
    piso: number
    letra: string
    descripcion: string
    banos: number
    ambientes: number
    informacionAdicional: string
    precio: number
    expensas: number
    tieneEstacionamiento: boolean
    permiteMascotas: boolean
    tienePiscina: boolean
    tieneGimnasio: boolean
  }
}

export default function DetallesDepartamento({ departamento }: PropiedadesDepartamento) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-600">Departamento {departamento.piso}{departamento.letra}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gray-200 mb-6 rounded-lg overflow-hidden">
          {departamento.imagen && (
            <img 
              src={departamento.imagen} 
              alt={`Departamento ${departamento.piso}${departamento.letra}`} 
              className="w-full h-full object-cover"
            />
          )}
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
          <div className="flex items-center">
            <DollarSign className="mr-2 text-blue-600" />
            <span>${departamento.precio} /mes</span>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Descripción</h3>
          <p>{departamento.descripcion}</p>
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
  )
}