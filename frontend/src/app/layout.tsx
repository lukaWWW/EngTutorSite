import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./app.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ThemeProvider } from '@/context/ThemeContext'; // Import ThemeProvider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EnglishTutor - Personalized English Learning",
  description: "Achieve English fluency with personalized online tutoring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ThemeProvider> {/* Wrap content with ThemeProvider */}
          {/* Use slightly different shades for dark mode background and text */}
          <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 transition-colors duration-200">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
