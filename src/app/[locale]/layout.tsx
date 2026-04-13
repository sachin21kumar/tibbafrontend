import Script from "next/script";
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
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} dir="ltr">
      <head>
        {/* Google Ads Global Site Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18083582462"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18083582462');
          `}
        </Script>

        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Allura&family=Cinzel:wght@400..900&display=swap');
          `}
        </style>
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          <TranslationProvider key={locale} locale={locale} dict={dict}>
            <Navbar />
            {children}
            <Footer />
          </TranslationProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}