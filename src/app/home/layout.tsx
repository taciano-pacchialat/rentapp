import "../globals.css";

export default function homeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">{children}</div>
  );
}
