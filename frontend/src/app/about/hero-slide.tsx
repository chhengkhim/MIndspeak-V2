"use client"

import { StaticImageData } from "next/image"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import profile from "@/assets/user.jpg"

interface SlideContent {
  title: string
  description: string
  image: string | StaticImageData
  buttonText: string
  buttonLink: string
}

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const sliderRef = useRef<HTMLDivElement>(null)

  const slides: SlideContent[] = [
    {
      title: "The Minds Behind MindSpeak",
      description: "We are a team of passionate students from Paragon International University dedicated to creating a safe space for mental health support and community connection.",
      image: profile,
      buttonText: "Meet Our Team",
      buttonLink: "#team",
    },
    {
      title: "Creating a Safe Space",
      description: "MindSpeak was born from our personal experiences with mental health challenges as university students.",
      image: profile,
      buttonText: "Learn More",
      buttonLink: "/about",
    },
    {
      title: "Join Our Mission",
      description: "We are always looking for passionate volunteers and collaborators who want to make a difference in student mental health.",
      image: profile,
      buttonText: "Get Involved",
      buttonLink: "/join",
    },
  ]

  // Autoplay functionality
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
      }, 5000) // Change slide every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoPlaying, slides.length])

  // Pause autoplay when user interacts
  const handleNavigation = (direction: "next" | "prev") => {
    setIsAutoPlaying(false) // Pause autoplay when manually navigating

    if (direction === "next") {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    } else {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
    }

    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <div ref={sliderRef} className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
      {/* Background slides */}
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => (
          index === currentIndex && (
            <motion.div
              key={`bg-${index}`}
              className="absolute inset-0 z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="absolute inset-0 bg-black/50 z-10" />
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {slides.map((slide, index) => (
              index === currentIndex && (
                <motion.div
                  key={`content-${index}`}
                  className="max-w-4xl mx-auto text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full backdrop-blur-md bg-blue-200/30 border border-white/10 text-blue-100"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255,255,255,0.1)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span className="text-sm font-light">MindSpeak</span>
                  </motion.div>

                  <h1 className="text-4xl md:text-6xl text-white font-bold mb-6 leading-tight">
                    {slide.title}
                  </h1>

                  <p className="text-xl text-gray-200 mb-10 leading-relaxed font-light">
                    {slide.description}
                  </p>

                  <motion.div
                    className="inline-flex"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Button
                      asChild
                      className="rounded-full bg-blue-500 text-white border-none px-8 py-6"
                    >
                      <Link href={slide.buttonLink}>
                        <span className="flex items-center gap-2">
                          {slide.buttonText}
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                              duration: 1.5,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "loop",
                            }}
                          >
                            <ArrowRight className="h-5 w-5" />
                          </motion.div>
                        </span>
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="absolute z-30 bottom-8 left-0 right-0 flex justify-center items-center gap-4">
        <Button
          onClick={() => handleNavigation("prev")}
          variant="outline"
          size="icon"
          className="rounded-full bg-black/30 border-white/20 text-white hover:bg-black/50 hover:text-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* Pagination dots */}
        <div className="flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
                setTimeout(() => setIsAutoPlaying(true), 10000)
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-blue-500 w-6" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <Button
          onClick={() => handleNavigation("next")}
          variant="outline"
          size="icon"
          className="rounded-full bg-black/30 border-white/20 text-white hover:bg-black/50 hover:text-white"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
