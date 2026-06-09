import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Актив Плюс — Премиальная недвижимость в Ростове-на-Дону",
  description: "Агентство премиальной недвижимости Актив Плюс. Продажа, покупка и аренда элитной недвижимости в Ростове-на-Дону.",
  keywords: ["недвижимость", "Ростов-на-Дону", "премиальная недвижимость", "элитное жилье", "Актив Плюс"],
  authors: [{ name: "Актив Плюс" }],
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
