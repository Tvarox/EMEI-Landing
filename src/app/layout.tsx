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
  metadataBase: new URL("https://emei.xyz"),
  title: {
    default: "EMEI — A payment rail for autonomous agents",
    template: "%s · EMEI",
  },
  description:
    "EMEI threads four open standards — x402, AP2 mandates, ERC-8004 identity, and mUSD settlement — into a single facilitator agents can actually pay through. Open-source, pre-production.",
  keywords: [
    "EMEI",
    "x402",
    "AP2",
    "AP2 mandate",
    "ERC-8004",
    "agent identity",
    "agent payments",
    "Mantle",
    "mUSD",
    "facilitator",
  ],
  openGraph: {
    title: "EMEI — A payment rail for autonomous agents",
    description:
      "x402 · AP2 mandate · ERC-8004 · mUSD on Mantle. One facilitator. Open-source, pre-production.",
    url: "https://emei.xyz",
    siteName: "EMEI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EMEI — A payment rail for autonomous agents",
    description:
      "x402 · AP2 mandate · ERC-8004 · mUSD on Mantle. One facilitator. Open-source, pre-production.",
  },
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
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        {children}
      </body>
    </html>
  );
}
