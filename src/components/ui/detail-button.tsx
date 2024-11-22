import Link from "next/link"
import { Button } from "@/components/ui/button"

interface DetailButtonProps {
  apartmentId: number
}

export default function DetailButton({ apartmentId }: DetailButtonProps) {
  return (
    <Link href={`/infoDepar/${apartmentId}`} className="w-full">
      <Button className="w-full">
        Ver detalles
      </Button>
    </Link>
  )
}