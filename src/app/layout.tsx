import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PROFILE } from "@/lib/data";

const inter = localFont({
  src: "../fonts/InterTight-Variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});
const instrument = localFont({
  src: [
    { path: "../fonts/InstrumentSerif-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
});
const jetbrains = localFont({
  src: "../fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-jetbrains",
  weight: "100 800",
  display: "swap",
});

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = `${PROFILE.name} — ${PROFILE.role}`;
const description =
  "B.Tech Computer Science and Engineering graduate focused on MERN stack and full-stack web development. Portfolio of Sreenandha S, Kannur, Kerala.";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${PROFILE.name} — portfolio` }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable} ${jetbrains.variable}`}>
      <body>
        <noscript>
          <style>{`.rv{opacity:1!important;transform:none!important}.rv-mask>span{transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
