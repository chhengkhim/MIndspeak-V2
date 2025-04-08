import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  ScrollProgressBar,
  ScrollToTopButton,
} from "@/components/ui/scroll-animation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "❤️MindSpeak",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Enhanced Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Main layered gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background dark:via-primary/20 transition-all duration-1000" />

          {/* Animated glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 blur-[180px] opacity-50 animate-slow-spin" />
          <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-400/20 to-primary/10 blur-[200px] opacity-40 animate-reverse-slow-spin" />

          {/* Enhanced grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05] transition-opacity duration-1000" />

          {/* Floating soft shapes */}
          <div className="absolute top-[10%] right-[15%] w-24 h-24 rounded-xl bg-primary/20 blur-2xl animate-float opacity-70 shadow-xl shadow-primary/10" />
          <div className="absolute top-[45%] left-[10%] w-16 h-16 rounded-full bg-blue-500/20 blur-2xl animate-float-delay opacity-70 shadow-lg shadow-blue-400/10" />
          <div className="absolute bottom-[15%] right-[10%] w-20 h-20 rounded-lg bg-purple-600/20 blur-2xl animate-float-slow opacity-70 shadow-xl shadow-purple-400/10" />
          <div className="absolute bottom-[5%] left-[25%] w-32 h-32 rounded-full bg-primary/20 blur-2xl animate-float-delay-slow opacity-70 shadow-lg shadow-primary/10" />
        </div>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex min-h-screen flex-col">
            <ScrollProgressBar />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ScrollToTopButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
