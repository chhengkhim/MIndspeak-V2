import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ScrollProgressBar, ScrollToTopButton } from "@/components/ui/scroll-animation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MindSpeak | A Safe Haven for Mental Health",
  description: "A safe space for expressing mental struggles and sharing experiences",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Background Elements - These will be visible throughout the page */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

        {/* Animated circles */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 blur-3xl opacity-60 animate-slow-spin" />
        <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-500/10 to-primary/10 blur-3xl opacity-50 animate-reverse-slow-spin" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] dark:opacity-[0.03]" />

        {/* Floating shapes */}
        <div className="absolute top-20 right-[10%] w-24 h-24 rounded-xl bg-primary/10 blur-xl animate-float opacity-70" />
        <div className="absolute top-[40%] left-[5%] w-16 h-16 rounded-full bg-blue-400/10 blur-xl animate-float-delay opacity-70" />
        <div className="absolute bottom-[20%] right-[15%] w-20 h-20 rounded-lg bg-purple-400/10 blur-xl animate-float-slow opacity-70" />
        <div className="absolute bottom-[10%] left-[20%] w-32 h-32 rounded-full bg-primary/10 blur-xl animate-float-delay-slow opacity-70" />
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
  )
}



import './globals.css'