import type { Metadata, Viewport } from "next";
import "./globals.css";

// Configurações de nossa PWA

export const metadata: Metadata = {
  title: "NextStep",
  description: "Gerenciador de Projetos Avançado",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NextStep",
  },
 icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon-192x192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5", 
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, 
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      
      <body className="min-h-full">{children}</body>
    </html>
  );
}
