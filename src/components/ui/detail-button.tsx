import Link from "next/link"
import { Button } from "@/components/ui/button"
import cache from "@/components/cache"

const cacheInstance = cache.getInstance();
interface DetailButtonProps {
  apartmentId: number
}

export default function DetailButton({ apartmentId }: DetailButtonProps) {
  const handleClick = () => {
    console.log("Botón presionado");
    //Quedaria implementar la funcionalidad que me renviee a la pagina de infor-depar. Conciderar que 
    // en ambas paginas que usan este boton ya tengo el objeto departamento.
  
  }

  return (
    <Link href={`/apartment/${apartmentId}`} className="w-full">
      <Button className="w-full" onClick={handleClick}>
        Ver detalles
      </Button>
    </Link>
  )
}