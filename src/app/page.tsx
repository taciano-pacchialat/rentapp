import DetallesDepartamento from "./infoDepar/page";

const departamentoDePrueba = {
  id: "1",
  imagen: "https://images.unsplash.com/photo-1568048306399-1bbf5d5e3f1d",
  piso: 5,
  letra: "A",
  descripcion: "Un hermoso departamento con vista al mar.",
  banos: 2,
  ambientes: 3,
  informacionAdicional: "Cerca de centros comerciales y transporte público.",
  precio: 2000,
  expensas: 300,
  tieneEstacionamiento: true,
  permiteMascotas: true,
  tienePiscina: true,
  tieneGimnasio: true,
}

export default function Page() {
  return <DetallesDepartamento departamento={departamentoDePrueba} />;
}
