import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cognos — Salud cognitiva para todos",
  description:
    "Portal gratuito de tamizaje y estimulación cognitiva para adultos mayores en situación de vulnerabilidad.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-paper text-ink">
        <div className="mx-auto min-h-screen max-w-xl px-5 py-8">{children}</div>
      </body>
    </html>
  );
}
