import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/app/components/common/Navbar";
import ReduxProvider from "../provider/ReduxProvider";
import { Footer } from "../components/common/Footer";
import { getDictionary } from "@/i18n/dictionary";
import { Locale } from "@/i18n/config";
import { TranslationProvider } from "@/i18n/TranslationProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tibba Restaurant",
  description: "Multilingual Restaurant Website",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const isRTL = locale === "ar";

  // ⭐ LOAD TRANSLATIONS HERE
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} dir={"ltr"}>
      <head>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Allura&family=Cinzel:wght@400..900&display=swap');
          `}
        </style>
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          <TranslationProvider locale={locale} dict={dict}>
            <Navbar />
            {children}
            <Footer />
          </TranslationProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}