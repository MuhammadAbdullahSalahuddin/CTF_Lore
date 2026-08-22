// app/layout.tsx
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Onest } from "next/font/google";
const JETBRAIN = JetBrains_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});
const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  weight: ["300", "400"],
});
export const metadata: Metadata = {
  title: "TASMOC Pharmaceuticals",
  description: "Advancing Healthcare Through Trusted Innovation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${JETBRAIN.variable} ${onest.variable}`}>
      <body>{children}</body>
    </html>
  );
}
