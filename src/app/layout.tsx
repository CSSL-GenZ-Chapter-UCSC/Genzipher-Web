import type { Metadata } from "next";
import { Amarante  } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";

//NeueMachina-Ultrabold

// const neueMachina = localFont({
//   src: './NeueMachina-Ultrabold.otf',
//   style: 'ultrabold',
// })

const amarante = Amarante({
  weight: "400",
  subsets: ["latin"],

  variable: "--font-amarante",
});

export const metadata: Metadata = {
  title: "GenZipher - Decoding the Future of Innovation",
  description: "GenZipher - Decoding the Future of Innovation",
  icons: {
    icon: '/icon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical images used by the mobile splash to improve first paint */}
        <link rel="preload" as="image" href="/assets/images/splash/landing-6-mobile.webp" />
        <link rel="preload" as="image" href="/assets/genzipher-text-logo-1.webp" />
      </head>
      <body
        className={`${amarante.className} ${amarante.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
