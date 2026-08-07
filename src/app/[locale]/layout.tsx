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
import { ChromeProvider } from "../common/ChromeContext";

const GTM_ID = "GTM-P8B889BZ";

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
  verification: {
    google: "EN532v5Fkg6PH7eCzJHlxVvIRqw1rVDMQdVUQrYn5bY",
  },
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
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        {/* End Google Tag Manager */}

        {/* Google tag (gtag.js) - Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PMYMWXWJ8T"
          strategy="afterInteractive"
        />
        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PMYMWXWJ8T');
          `}
        </Script>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Allura&family=Cinzel:wght@400..900&display=swap"
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <ReduxProvider>
          <TranslationProvider key={locale} locale={locale} dict={dict}>
            <ChromeProvider>
              <Navbar />
              {children}
              <Footer />
            </ChromeProvider>
          </TranslationProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}