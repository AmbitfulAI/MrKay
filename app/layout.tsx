import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SiteConfigProvider } from "@/components/SiteConfigProvider";
import { connectDB } from "@/lib/db";
import { SiteConfig } from "@/lib/models/SiteConfig";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TheKayodeKolade — Advisor · Coach · Confidant",
  description:
    "Strategic counsel for executives who lead at the highest level. Board advisory, leadership development, and executive strategy.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connectDB();
  const siteConfig = await SiteConfig.findById("siteConfig").lean<{ calendlyUrl?: string; contactEmail?: string; footerTagline?: string; footerBlurb?: string; linkedInUrl?: string; instagramUrl?: string; statsBar?: { line: string; descriptor: string }[] }>().catch(() => null);

  return (
    <html
      lang="en"
      className={`dark ${cormorant.variable} ${jost.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body>
        <Providers>
          <SiteConfigProvider config={siteConfig}>
            <Navigation />
            <main>{children}</main>
            <Footer />
          </SiteConfigProvider>
        </Providers>
      </body>
    </html>
  );
}
