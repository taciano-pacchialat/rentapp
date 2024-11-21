'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Search, User } from 'lucide-react'

export default function NavBar() {
  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/home" className="flex-shrink-0 flex items-center">
            <Image
              src="/images/RentApp_icon.png"
              alt="RentApp Logo"
              width={100}
              height={100}
              className="w-auto h-14 sm:h-14"
              priority
            />
            <span className="ml-2 text-xl font-bold text-blue-600 hidden sm:block">RentApp</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/search">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
                <span className="sr-only">Buscar</span>
              </Button>
            </Link>
            <Link href="/userPage">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Perfil</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}