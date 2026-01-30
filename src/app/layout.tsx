import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neo OS",
  description: "Your AI Command Center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-[hsl(var(--background))]">
        {children}
      </body>
    </html>
  );
}
