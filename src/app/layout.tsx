// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: "Alced Jhon Madiales — Web Developer",
  description:
    "Full Stack Web Developer based in Zamboanga City. BS Information Technology student at WMSU. Building functional, user-friendly web applications.",
  keywords: ["web developer", "full stack", "Next.js", "PHP", "Zamboanga", "WMSU"],
  authors: [{ name: "Alced Jhon Madiales" }],
  openGraph: {
    title: "Alced Jhon Madiales — Web Developer",
    description: "Full Stack Web Developer | WMSU BS Information Technology",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#020617] text-slate-100 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}