import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const inter = Manrope({ subsets: ["cyrillic", "latin"] });

export const metadata: Metadata = {
  title: "BAZA - Видео-продакшн",
  description:
    "BAZA — профессиональная студия видео-продакшна. Создаем высококачественное видео для брендов, бизнеса и творческих проектов.",
  keywords: [
    "видео продакшн",
    "видеосъемка",
    "BAZA студия",
    "рекламное видео",
    "корпоративное видео",
    "творческое видео",
  ],
  authors: [{ name: "Команда BAZA", url: "https://baza.red" }],
  openGraph: {
    type: "website",
    url: "https://baza.red",
    title: "BAZA - Видео-продакшн",
    description:
      "Воплощаем ваши идеи в качественное видео. BAZA — ваш выбор для профессионального видео-продакшна.",
    locale: "ru_RU",
    siteName: "BAZA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="robots" content="index, follow" />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
