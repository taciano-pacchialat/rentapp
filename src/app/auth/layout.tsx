import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Autenticacion",
  description: "Vista de registro y log in",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">{children}</div>
  );
}
