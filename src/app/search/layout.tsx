import "../globals.css";

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen  bg-background">{children}</div>
  );
}
