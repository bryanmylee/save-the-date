import type { Metadata } from "next";
import { DM_Sans, Geist_Mono, Reenie_Beanie } from "next/font/google";
import "./globals.css";

const bodyFont = DM_Sans({
  weight: "400",
  variable: "--font-body",
  subsets: ["latin"],
});

const monoFont = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

// Qwitcher_Grypen;
const signatureFont = Reenie_Beanie({
  weight: "400",
  variable: "--font-signature",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amanda and Bryan's Wedding",
  description: "Save the date for Amanda and Bryan's Wedding!",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${monoFont.variable} ${signatureFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
