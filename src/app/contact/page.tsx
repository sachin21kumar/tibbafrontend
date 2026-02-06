import type { Metadata } from "next";
import { Contact } from "../components/contact/contact";

export const metadata: Metadata = {
  title: "Contact Us | Tibba",
  description:
    "Get in touch with Tibba for support, inquiries, or feedback. We’re here to help you.",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Contact Us | Tibba",
    description: "Get in touch with Tibba for support, inquiries, or feedback.",
    siteName: "Tibba",
    type: "website",
    url: "https://tibba.ae/contact",
  },

  twitter: {
    card: "summary",
    title: "Contact Us | Tibba",
    description: "Get in touch with Tibba for support, inquiries, or feedback.",
  },
};

export default function Page() {
  return <Contact />;
}
