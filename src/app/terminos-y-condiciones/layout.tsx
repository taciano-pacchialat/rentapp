import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Terminos y condiciones",
  description: "Vista de terminos y condiciones de la app",
};

export default function TermsAndConditionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">{children}</div>
  );
}
