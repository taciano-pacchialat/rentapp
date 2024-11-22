//Ver como funciona interface.
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Bath, Box, DollarSign, Car, Dumbbell, Waves, Cat, Info } from 'lucide-react';
import NavBar from "@/components/ui/NavBar";

interface PropiedadesDepartamento {
  departamento: {
    id: string;
    imagen: string;
    piso: number;
    letra: string;
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
  };
}

export default function DetallesDepartamento({ departamento }: PropiedadesDepartamento) {
  return (
    <>
      <NavBar />
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
              <div>
                <span className="font-semibold">Alquiler:</span> ${departamento.precio}/mes
              </div>
              <div>
                <span className="font-semibold">Expensas:</span> ${departamento.expensas}/mes
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
  );
}