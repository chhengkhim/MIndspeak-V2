"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { Menu, X, Heart } from "lucide-react"
import { motion } from "framer-motion"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const routes = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/stories", label: "Stories" },
    { href: "/feelings", label: "Express Feelings" },
    { href: "/mood-tracker", label: "Mood Tracker" },
    { href: "/share", label: "Share" },
    { href: "/resources", label: "Resources" },
    { href: "/telegram", label: "Telegram" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60",
        scrolled ? "bg-background/95 shadow-sm" : "bg-background/50",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link href="/" className="flex items-center gap-2">
            <motion.div whileHover={{ rotate: 20 }} transition={{ type: "spring", stiffness: 500 }}>
              <Heart className="h-6 text-red-600 w-6 text-primary" />
            </motion.div>
            <span className="text-2xl font-bold text-blue-500">MindSpeak</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <motion.div key={route.href} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 500 }}>
              <Link
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative",
                  pathname === route.href ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {route.label}
                {pathname === route.href && (
                  <motion.div
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary rounded-full"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-blue-500 text-white hover:bg-white hover:text-blue-500 shadow-lg hover:shadow-blue-500" asChild variant="outline" size="sm">
              <Link href="/join">Sign In</Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="sm">
              <Link className="bg-teal-500 text-white hover:bg-white hover:text-teal-500 shadow-lg hover:shadow-teal-500" href="/join">Join</Link>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-4">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden border-b"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container py-4 grid gap-4">
            <nav className="grid gap-2">
              {routes.map((route) => (
                <motion.div
                  key={route.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={route.href}
                    className={cn(
                      "flex items-center py-2 text-sm font-medium transition-colors hover:text-primary",
                      pathname === route.href ? "text-foreground" : "text-muted-foreground",
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {route.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button className="bg-blue-500 text-white hover:bg-white hover:text-blue-500 shadow-lg hover:shadow-blue-500" asChild variant="outline" size="sm">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button className="bg-teal-500 text-white hover:bg-white hover:text-teal-500 shadow-lg hover:shadow-teal-500" asChild size="sm">
                <Link href="/join">Join</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

