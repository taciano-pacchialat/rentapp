import { Apartment } from "@/types/apartment";
import { NextResponse } from "next/server";

const apartments: Apartment[] = [];

export async function GET() {
  return NextResponse.json(apartments);
}

export async function POST(request: Request) {
  const newApartment = await request.json();
  newApartment.id = apartments.length + 1;
  apartments.push(newApartment);
  return NextResponse.json(newApartment, { status: 201 });
}

export async function PUT(request: Request) {
  const updatedApartment = await request.json();
  const index = apartments.findIndex((apt) => apt.id === updatedApartment.id);
  if (index === -1) {
    return NextResponse.json({ error: "Apartment not found" }, { status: 404 });
  }
  apartments[index] = updatedApartment;
  return NextResponse.json(updatedApartment);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const index = apartments.findIndex((apt) => apt.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Apartment not found" }, { status: 404 });
  }
  apartments.splice(index, 1);
  return NextResponse.json({ message: "Apartment deleted" });
}
