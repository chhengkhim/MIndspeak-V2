"use client";

import Image from "next/image";
import logo from "@/assets/logo2.png";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const routes = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/stories", label: "Stories" },
    { href: "/feelings", label: "Express Feelings" },
    { href: "/mood-tracker", label: "Mood Tracker" },
    { href: "/share", label: "Share" },
    { href: "/resources", label: "Resources" },
    { href: "/telegram", label: "Telegram" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Prevent scrolling when sidebar is open
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  return (
    <>
      <motion.header
        className={cn(
          "sticky top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60",
          scrolled ? "bg-background/95 shadow-sm" : "bg-background/50"
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
            <Link href="/about" className="flex items-center gap-2">
              <Image
                src={logo}
                alt="Logo"
                width={200}
                height={200}
                className="rounded-full brightness-125"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {routes.map((route) => (
              <motion.div
                key={route.href}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <Link
                  href={route.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary relative",
                    pathname === route.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {route.label}
                  {pathname === route.href && (
                    <motion.div
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary rounded-full"
                      layoutId="navbar-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <ModeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-blue-500 text-white hover:bg-white hover:text-blue-500 shadow-lg hover:shadow-blue-500"
                asChild
                variant="outline"
                size="sm"
              >
                <Link href="/join">Sign In</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="sm">
                <Link
                  className="bg-teal-500 text-white hover:bg-white hover:text-teal-500 shadow-lg hover:shadow-teal-500"
                  href="/join"
                >
                  Join
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <ModeToggle />
            <Button
              className="bg-blue-500 text-white hover:bg-white hover:text-blue-500 shadow-lg hover:shadow-blue-500"
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open Menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 right-0 h-full w-[280px] bg-background border-l z-50 md:hidden overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <Link href="/about" className="flex items-center gap-2">
                    <Image
                      src={logo}
                      alt="Logo"
                      width={200}
                      height={200}
                      className="rounded-full brightness-125"
                    />
                  </Link>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close Menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-4">
                <nav className="grid gap-4 mb-6">
                  {routes.map((route, index) => (
                    <motion.div
                      key={route.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                    >
                      <Link
                        href={route.href}
                        className={cn(
                          "flex items-center py-2 text-sm font-medium transition-colors hover:text-primary",
                          pathname === route.href
                            ? "text-foreground font-semibold"
                            : "text-muted-foreground"
                        )}
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        {route.label}
                        {pathname === route.href && (
                          <motion.div
                            className="ml-2 h-1 w-1 rounded-full bg-primary"
                            layoutId="sidebar-indicator"
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="grid gap-3 pt-4 border-t">
                  <Button
                    className="bg-blue-500 text-white hover:bg-white hover:text-blue-500 shadow-md hover:shadow-blue-500/50 w-full"
                    asChild
                    variant="outline"
                  >
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button
                    className="bg-teal-500 text-white hover:bg-white hover:text-teal-500 shadow-md hover:shadow-teal-500/50 w-full"
                    asChild
                  >
                    <Link href="/join">Join</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
