'use client'

import { useState } from 'react'
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
import { SlidersHorizontal, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for demonstration
const apartments = [
  {
    id: 1,
    name: "Luxury Downtown Apartment",
    price: 1200,
    owner: "John Smith",
    description: "Modern 2-bedroom apartment in the heart of downtown",
    hasParking: true,
    hasPets: true,
    rooms: 2,
  },
  {
    id: 2,
    name: "Cozy Studio",
    price: 800,
    owner: "Jane Doe",
    description: "Comfortable studio perfect for singles or couples",
    hasParking: false,
    hasPets: false,
    rooms: 1,
  },
  // Add more apartments as needed
]

export default function Component() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [filters, setFilters] = useState({
    hasParking: false,
    hasPets: false,
    rooms1: false,
    rooms2: false,
    rooms3: false,
    priceLow: false,
    priceHigh: false,
  })

  const filteredApartments = apartments.filter(apt => {
    if (searchQuery && !apt.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    if (filters.hasParking && !apt.hasParking) return false
    if (filters.hasPets && !apt.hasPets) return false
    if (filters.rooms1 && apt.rooms !== 1) return false
    if (filters.rooms2 && apt.rooms !== 2) return false
    if (filters.rooms3 && apt.rooms !== 3) return false
    if (filters.priceLow && apt.price > 1000) return false
    if (filters.priceHigh && apt.price < 1000) return false
    
    return true
  })

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
                    <span className="sr-only">Open search</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="top" className="w-full">
                  <SheetHeader>
                    <SheetTitle>Search Apartments</SheetTitle>
                    <SheetDescription>Enter your search query below</SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        className="w-full pl-8 pr-4 py-2"
                        placeholder="Search apartments..."
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
                  placeholder="Search apartments..."
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <SlidersHorizontal className="h-5 w-5" />
                    <span className="sr-only">Toggle filters</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Refine your apartment search</SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-4">
                      <h3 className="font-medium">Amenities</h3>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="parking"
                          checked={filters.hasParking}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({ ...prev, hasParking: checked === true }))
                          }
                        />
                        <label htmlFor="parking" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Parking Available
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
                          Pet Friendly
                        </label>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-medium">Number of Rooms</h3>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="1room"
                          checked={filters.rooms1}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({ ...prev, rooms1: checked === true }))
                          }
                        />
                        <label htmlFor="1room" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          1 Room
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
                          2 Rooms
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
                          3+ Rooms
                        </label>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-medium">Price Range</h3>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="priceLow"
                          checked={filters.priceLow}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({ ...prev, priceLow: checked === true }))
                          }
                        />
                        <label htmlFor="priceLow" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Under $1000
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="priceHigh"
                          checked={filters.priceHigh}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({ ...prev, priceHigh: checked === true }))
                          }
                        />
                        <label htmlFor="priceHigh" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          $1000 and above
                        </label>
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
            <Link key={apartment.id} href={`/apartment/${apartment.id}`} className="block w-full">
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow p-0">
                <div className="relative w-full pt-[56.25%]">
                  <Image
                    src="/placeholder.svg"
                    alt={apartment.name}
                    fill
                    className="object-cover absolute top-0 left-0 w-full h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-[#0066FF] truncate">{apartment.name}</CardTitle>
                  <CardDescription className="truncate">Owner: {apartment.owner}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-gray-600 line-clamp-3">{apartment.description}</p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <p className="text-lg font-bold">${apartment.price}/month</p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}