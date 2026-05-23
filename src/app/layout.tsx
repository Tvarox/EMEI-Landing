import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter-tight",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const vt323 = localFont({
  src: "../../public/fonts/VT323/VT323-Regular.ttf",
  variable: "--font-vt323",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://emei.xyz"),
  title: {
    default: "EMEI — Invoicing for machines",
    template: "%s · EMEI",
  },
  description:
    "An open protocol where software issues, presents, and collects invoices on-chain. Mandates, reputation, and stablecoin settlement on Mantle.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${jetbrainsMono.variable} ${vt323.variable}`}
      style={{ position: "relative" }}
    >
      <body className="antialiased" style={{ position: "relative" }}>{children}</body>
    </html>
  );
}
