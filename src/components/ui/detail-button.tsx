import Link from "next/link"
import { Button } from "@/components/ui/button"

interface DetailButtonProps {
  apartmentId: number
}

export default function DetailButton({ apartmentId }: DetailButtonProps) {
  const handleClick = () => {
    console.log("Botón presionado")
    // Aquí puedes agregar cualquier lógica adicional que necesites
  }

  return (
    <Link href={`/apartment/${apartmentId}`} className="w-full">
      <Button className="w-full" onClick={handleClick}>
        Ver detalles
      </Button>
    </Link>
  )
}