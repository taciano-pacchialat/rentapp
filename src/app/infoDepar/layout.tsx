import "../globals.css";

export default function infoDeparLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">{children}</div>
  );
}
