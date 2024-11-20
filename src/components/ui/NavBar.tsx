'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Search, User } from 'lucide-react'

export default function NavBar() {
  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/feature-HomePage" className="flex-shrink-0 flex items-center">
            <Image
              src="/public/images/RentApp_icon-removebg-preview.png"
              alt="RentApp Logo"
              width={40}
              height={40}
              className="w-auto h-8 sm:h-10"
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