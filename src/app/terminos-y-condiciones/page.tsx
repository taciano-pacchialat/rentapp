import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@radix-ui/themes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-2 sm:px-6 lg:px-8">
      <Link href="/auth" className="absolute top-4 left-4 z-10">
        <Button type="button" className="hover:bg-transparent">
          <ArrowLeft />
        </Button>
      </Link>
      <Card className="w-full border-2 max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-primary underline">
            Términos y Condiciones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <section>
            <h2 className="text-lg font-semibold">1. Introducción</h2>
            <p>
              Bienvenido a RentApp. Al utilizar nuestra plataforma, aceptas estar sujeto a los
              siguientes términos y condiciones. Por favor, léelos atentamente.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">2. Uso de la Plataforma</h2>
            <p>
              La plataforma RentApp permite a los usuarios gestionar sus alquileres de forma
              sencilla. Te comprometes a utilizar la plataforma únicamente con fines legales y de
              acuerdo con estos términos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">3. Registro y Seguridad</h2>
            <p>
              Al registrarte en RentApp, eres responsable de mantener la confidencialidad de tu
              cuenta y contraseña, así como de cualquier actividad que ocurra bajo tu cuenta.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">4. Responsabilidades del Usuario</h2>
            <p>
              Como usuario, aceptas proporcionar información veraz y actualizada y cumplir con todas
              las normativas aplicables al utilizar la plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">5. Limitación de Responsabilidad</h2>
            <p>
              RentApp no se hace responsable de ningún daño directo, indirecto, incidental o
              consecuente que pueda surgir del uso de nuestra plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">6. Modificaciones de los Términos</h2>
            <p>
              RentApp se reserva el derecho de modificar estos términos en cualquier momento.
              Cualquier cambio será notificado a través de nuestra plataforma o mediante correo
              electrónico.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">7. Contacto</h2>
            <p>
              Si tienes alguna pregunta sobre estos términos, por favor contáctanos en
              soporte@rentapp.com.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
