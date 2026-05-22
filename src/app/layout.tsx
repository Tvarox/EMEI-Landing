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
    default: "EMEI — The invoicing rail for autonomous economies",
    template: "%s · EMEI",
  },
  description:
    "Direct-debit for AI agents. Issue an on-chain invoice, attach a scoped payer mandate, and auto-collect on the due date — settled in yield-bearing mUSD on Mantle.",
  keywords: [
    "EMEI",
    "programmable invoices",
    "AI agent payments",
    "stablecoin settlement",
    "Mantle",
    "ERC-8004",
    "x402",
    "mUSD",
    "agentic commerce",
  ],
  openGraph: {
    title: "EMEI — The invoicing rail for autonomous economies",
    description:
      "Direct-debit for AI agents. Programmable invoices, scoped mandates, settled in yield.",
    url: "https://emei.xyz",
    siteName: "EMEI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EMEI — The invoicing rail for autonomous economies",
    description:
      "Direct-debit for AI agents. Programmable invoices, scoped mandates, settled in yield.",
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
