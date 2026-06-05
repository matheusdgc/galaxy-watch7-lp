import type { Metadata } from "next";
import { Inter, Outfit, Space_Grotesk, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans',display:'swap'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Galaxy Watch 7 — O Smartwatch Mais Inteligente do Mundo",
  description:
    "Galaxy Watch 7 — design premium, saúde avançada e performance no seu pulso.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={cn(inter.variable, outfit.variable, spaceGrotesk.variable, "font-sans", geist.variable)}
    >
      <body>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
