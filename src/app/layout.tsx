import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansSC = localFont({
  src: "../../public/fonts/Noto_Sans_SC/NotoSansSC-VariableFont_wght.ttf",
  variable: "--font-noto-sans-sc",
  display: "swap",
});

const notoSansMono = localFont({
  src: "../../public/fonts/Noto_Sans_Mono/NotoSansMono-VariableFont_wdth,wght.ttf",
  variable: "--font-noto-sans-mono",
  display: "swap",
});

const vt323 = localFont({
  src: "../../public/fonts/VT323/VT323-Regular.ttf",
  variable: "--font-vt323",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EMEI | Experience",
  description: "A premium digital experience.",
  icons: {
    icon: "/Logo.svg",
    shortcut: "/Logo.svg",
    apple: "/Logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansSC.variable} ${notoSansMono.variable} ${vt323.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
