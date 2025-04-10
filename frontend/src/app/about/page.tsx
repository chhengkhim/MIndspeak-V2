"use client"

import user from "@/assets/user.jpg"
import { useState, useEffect, useRef } from "react"
import type React from "react"
import type { StaticImageData } from "next/image"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Heart,
  Users,
  Sparkles,
  ArrowRight,
  Code,
  Database,
  Palette,
  Users2,
  Star,
  Zap,
  Award,
  ExternalLink,
  Globe,
  Briefcase,
} from "lucide-react"
import HeroSlider from "@/app/about/hero-slide"

// Interface for team member data
interface TeamMember {
  name: string
  role: string
  roleType: string
  roleIcon: React.ReactNode
  bio: string
  image: string | StaticImageData
  expertise: { name: string; icon: React.ReactNode }[]
  achievements: string
}

// Glassmorphic reveal animation
const GlassReveal = ({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: string
}) => {
  const getVariants = () => {
    switch (direction) {
      case "left":
        return {
          hidden: { opacity: 0, x: 40 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay,
            },
          },
        }
      case "right":
        return {
          hidden: { opacity: 0, x: -40 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay,
            },
          },
        }
      default:
        return {
          hidden: { opacity: 0, y: 40 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay,
            },
          },
        }
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Simple parallax section component
const ParallaxSection = ({
  children,
  speed = 0.5,
}: {
  children: React.ReactNode
  speed?: number
}) => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      style={{
        transform: `translateY(${scrollY * speed}px)`,
      }}
    >
      {children}
    </div>
  )
}

// Team member carousel component
const TeamMemberCarousel = ({ members }: { members: TeamMember[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Autoplay functionality
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % members.length)
      }, 5000) // Change slide every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoPlaying, members.length])

  // Pause autoplay when user interacts
  const handleNavigation = (direction: "next" | "prev") => {
    setIsAutoPlaying(false) // Pause autoplay when manually navigating

    if (direction === "next") {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % members.length)
    } else {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + members.length) % members.length)
    }

    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const currentMember = members[currentIndex]

  // Calculate previous and next indices for the side thumbnails
  const prevIndex = (currentIndex - 1 + members.length) % members.length
  const nextIndex = (currentIndex + 1) % members.length

  return (
    <motion.div
      ref={carouselRef}
      className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-3xl shadow-xl p-4 sm:p-8 max-w-4xl mx-auto border border-blue-100 dark:border-blue-900"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-center text-2xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
        Our team members
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center">
        {/* Left thumbnail - hidden on mobile */}
        <motion.div
          className="relative hidden md:block mr-12"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button
            onClick={() => handleNavigation("prev")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-8 h-8 rounded-full text-blue-500 bg-white dark:bg-slate-800 shadow-md flex items-center justify-center z-10 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <ArrowRight className="h-4 w-4 transform rotate-180" />
          </Button>
          <motion.div
            className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 dark:border-slate-700"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={members[prevIndex].image || "/placeholder.svg?height=200&width=200"}
              width={200}
              height={200}
              alt={members[prevIndex].name}
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Mobile navigation buttons - only visible on mobile */}
        <div className="flex justify-between w-full mb-4 md:hidden">
          <Button
            onClick={() => handleNavigation("prev")}
            variant="outline"
            size="icon"
            className="rounded-full text-blue-500 border-blue-200 dark:border-blue-800"
          >
            <ArrowRight className="h-4 w-4 transform rotate-180" />
          </Button>
          <Button
            onClick={() => handleNavigation("next")}
            variant="outline"
            size="icon"
            className="rounded-full text-blue-500 border-blue-200 dark:border-blue-800"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Main profile */}
        <AnimatePresence mode="wait">
          <motion.div
            className="text-center mx-0 md:mx-8 w-full md:w-auto"
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-500 mx-auto mb-4 shadow-lg shadow-blue-200 dark:shadow-blue-900/30"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image
                src={currentMember.image || "/placeholder.svg?height=200&width=200"}
                width={200}
                height={200}
                alt={currentMember.name}
                className="object-cover"
              />
            </motion.div>
            <motion.h3
              className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-1"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {currentMember.name}
            </motion.h3>
            <motion.div
              className="flex items-center justify-center gap-2 text-sm text-blue-500 mb-4"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {currentMember.roleIcon}
              <span>{currentMember.role}</span>
            </motion.div>
            <motion.p
              className="text-xs md:text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-6"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentMember.bio}
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-2 mb-6"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {currentMember.expertise.map((skill, index) => (
                <motion.span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {skill.icon}
                  {skill.name}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-md px-4 md:px-6 py-1 md:py-2 text-sm md:text-base shadow-md shadow-blue-200/50 dark:shadow-blue-900/30">
                Join the team
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Right thumbnail - hidden on mobile */}
        <motion.div
          className="relative hidden md:block ml-12"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button
            onClick={() => handleNavigation("next")}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-8 h-8 rounded-full text-blue-500 bg-white dark:bg-slate-800 shadow-md flex items-center justify-center z-10 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          <motion.div
            className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 dark:border-slate-700"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={members[nextIndex].image || "/placeholder.svg?height=200&width=200"}
              width={200}
              height={200}
              alt={members[nextIndex].name}
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center mt-4 md:mt-8 space-x-1 md:space-x-2">
        {members.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              setIsAutoPlaying(false)
              setTimeout(() => setIsAutoPlaying(true), 10000)
            }}
            className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-blue-500 w-4 md:w-6" : "bg-gray-300 dark:bg-gray-700"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])


  // Team members data
  const teamMembers: TeamMember[] = [
    {
      name: "Pisethsambo Phok",
      role: "Lead Frontend Engineer",
      roleType: "frontend",
      roleIcon: <Code className="h-4 w-4" />,
      bio: "Passionate about creating intuitive user experiences and leading the development of MindSpeak's frontend architecture with React and Next.js.",
      image: user,
      expertise: [
        { name: "React", icon: <Code className="h-3 w-3 mr-1" /> },
        { name: "Next.js", icon: <Zap className="h-3 w-3 mr-1" /> },
        { name: "UI/UX", icon: <Palette className="h-3 w-3 mr-1" /> },
        { name: "Team Leadership", icon: <Users2 className="h-3 w-3 mr-1" /> },
      ],
      achievements: "Led the development of MindSpeak's responsive interface and user authentication system.",
    },
    {
      name: "Sochesda Thoeun",
      role: "Senior Backend Developer",
      roleType: "backend",
      roleIcon: <Database className="h-4 w-4" />,
      bio: "Specializes in server-side architecture and database management, ensuring MindSpeak's performance, security, and scalability.",
      image: user,
      expertise: [
        { name: "Node.js", icon: <Code className="h-3 w-3 mr-1" /> },
        {
          name: "Database Design",
          icon: <Database className="h-3 w-3 mr-1" />,
        },
        { name: "API Development", icon: <Zap className="h-3 w-3 mr-1" /> },
        {
          name: "System Architecture",
          icon: <Briefcase className="h-3 w-3 mr-1" />,
        },
      ],
      achievements: "Architected MindSpeak's secure data storage system and real-time messaging infrastructure.",
    },
    {
      name: "Se Chanmoniroth",
      role: "UI/UX Design Lead",
      roleType: "design",
      roleIcon: <Palette className="h-4 w-4" />,
      bio: "Creates the visual identity and user experience of MindSpeak, focusing on accessibility, emotional design, and user research.",
      image: user,
      expertise: [
        { name: "Figma", icon: <Palette className="h-3 w-3 mr-1" /> },
        { name: "User Research", icon: <Users2 className="h-3 w-3 mr-1" /> },
        { name: "Accessibility", icon: <Star className="h-3 w-3 mr-1" /> },
        { name: "Motion Design", icon: <Zap className="h-3 w-3 mr-1" /> },
      ],
      achievements: "Designed MindSpeak's award-winning interface and established our comprehensive design system.",
    },
    {
      name: "Sotheara Em",
      role: "Community & Content Manager",
      roleType: "community",
      roleIcon: <Users2 className="h-4 w-4" />,
      bio: "Oversees content strategy and community engagement, ensuring MindSpeak remains a supportive and informative space for all users.",
      image: user,
      expertise: [
        { name: "Content Strategy", icon: <Star className="h-3 w-3 mr-1" /> },
        {
          name: "Community Building",
          icon: <Users2 className="h-3 w-3 mr-1" />,
        },
        { name: "Social Media", icon: <Globe className="h-3 w-3 mr-1" /> },
        { name: "Event Management", icon: <Award className="h-3 w-3 mr-1" /> },
      ],
      achievements: "Built MindSpeak's community from the ground up, now reaching over 5,000 active members.",
    },
  ]

  if (!isLoaded) {
    return null
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <HeroSlider/>
      {/* Hero Section 
      <section className="relative py-32 z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <GlassReveal>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full backdrop-blur-md bg-blue-200 dark:bg-white/5 border dark:border-white/10 text-blue-500"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Users className="h-4 w-4" />
                <span className="text-sm font-light">Our Team</span>
              </motion.div>
            </GlassReveal>

            <GlassReveal delay={0.1}>
              <h1 className="text-4xl md:text-6xl text-blue-500 dark:text-blue-500 font-bold mb-6 bg-clip-text bg-gradient-to-r from-blue-300 via-blue-200 to-blue-300 leading-tight">
                The Minds Behind
                <span className="text-red-600 font-bold"> MindSpeak</span>
              </h1>
            </GlassReveal>

            <GlassReveal delay={0.2}>
              <p className="text-xl text-gray-600 dark:text-white mb-10 leading-relaxed font-light">
                We are a team of passionate students from Paragon International University dedicated to creating a safe
                space for mental health support and community connection.
              </p>
            </GlassReveal>

            <GlassReveal delay={0.3}>
              <motion.div
                className="inline-flex"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button
                  asChild
                  className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white border-none px-8 py-6"
                >
                  <Link href="#team">
                    <span className="flex items-center gap-2">
                      Meet Our Team
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
            </GlassReveal>
          </div>
        </div>
      </section>*/}

      {/* Mission & Values Section */}
      <section className="relative py-20 z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Mission Column */}
            <GlassReveal direction="right">
              <div className="backdrop-blur-xl bg-white border-gray-500/10 shadow-lg shadow-gray-400 dark:bg-white/5 border dark:border-white/10 rounded-3xl p-8 h-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-blue-100 dark:bg-white/5 border dark:border-white/10 text-blue-300">
                  <Heart className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-blue-500 font-light">Our Mission</span>
                </div>

                <h2 className="text-3xl md:text-4xl text-blue-500 dark:text-blue-500 font-bold mb-6 bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                  Creating a Safe Space for Mental Health
                </h2>

                <p className="text-gray-600 dark:text-white mb-8 leading-relaxed">
                  MindSpeak was born from our personal experiences with mental health challenges as university students.
                  We recognized the need for a platform where students could express themselves freely, find support,
                  and access resources without judgment.
                </p>

                <div className="space-y-4">
                  {[
                    "Destigmatize mental health discussions",
                    "Build a supportive community",
                    "Provide accessible resources",
                    "Empower Cambodian youth",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 text-cyan-400">
                        <div className="h-5 w-5 rounded-full border border-cyan-400 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-cyan-400" />
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-white">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border border-blue-500 text-white bg-blue-500 hover:bg-blue-600 hover:text-white dark:border-blue-500/50 dark:text-blue-300 dark:hover:bg-blue-500/10"
                  >
                    <Link href="/resources">
                      <span className="flex dark:text-white items-center gap-2">
                        Explore Resources
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            </GlassReveal>

            {/* Values Column */}
            <GlassReveal direction="left">
              <div className="backdrop-blur-xl bg-white border-gray-500/10 shadow-lg shadow-gray-400 dark:bg-white/5 border dark:border-white/10 rounded-3xl p-8 h-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-blue-100 dark:bg-white/5 border dark:border-white/10 text-blue-500">
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm dark:text-blue-500 font-light">Our Values</span>
                </div>

                <h2 className="text-3xl text-blue-500 dark:text-blue-500 md:text-4xl font-bold mb-6 bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                  What We Stand For
                </h2>

                <div className="grid gap-6">
                  {[
                    {
                      title: "Compassion",
                      description: "We approach every interaction with empathy and understanding.",
                    },
                    {
                      title: "Safety",
                      description: "We create secure spaces where vulnerability is respected and protected.",
                    },
                    {
                      title: "Inclusivity",
                      description: "We welcome all students regardless of background or experience.",
                    },
                    {
                      title: "Empowerment",
                      description:
                        "We provide tools and resources that help students take control of their mental wellbeing.",
                    },
                  ].map((value, i) => (
                    <motion.div
                      key={i}
                      className="p-4 backdrop-blur-md bg-white border-blue-300 shadow-md hover:shadow-blue-500 shadow-gray-500/30 dark:bg-white/5 border dark:border-white/10 rounded-2xl"
                      whileHover={{
                        backgroundColor: "rgba(255,255,255,0.1)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      <h3 className="text-lg font-medium mb-2 text-green-400 underline dark:text-yellow-500 bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                        {value.title}
                      </h3>
                      <p className="text-gray-500 dark:text-white text-sm">{value.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassReveal>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section id="team" className="relative py-20 z-10 scroll-mt-16">
        <ParallaxSection speed={0.2}>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white/50 dark:from-blue-950/50 dark:to-slate-950/50 pointer-events-none" />
        </ParallaxSection>

        {/* Animated background elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-300/10 dark:bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-cyan-300/10 dark:bg-cyan-500/10 blur-3xl" />

        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <GlassReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-blue-100/80 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-300">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">Meet The Team</span>
              </div>
            </GlassReveal>

            <GlassReveal delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Our Talented Team
              </h2>
            </GlassReveal>

            <GlassReveal delay={0.2}>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                The dedicated individuals who bring MindSpeak to life
              </p>
            </GlassReveal>
          </div>

          <div className="w-full max-w-5xl mx-auto">
            <TeamMemberCarousel members={teamMembers} />
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="relative py-20 z-10">
        <div className="container mx-auto px-4">
          <GlassReveal>
            <div className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-gradient-to-br from-blue-900/20 to-blue-900/20 border border-white/10 p-8 md:p-16">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white-600/20 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]" />

              <div className="relative z-10">
                <h2 className="text-3xl text-blue-500 dark:text-blue-500 md:text-5xl font-bold mb-6 text-center bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-300">
                  Want to Join Our Mission?
                </h2>

                <p className="text-xl text-gray-600 dark:text-white max-w-2xl mx-auto mb-10 text-center font-light">
                  We are always looking for passionate volunteers and collaborators who want to make a difference in
                  student mental health.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white border-none px-8"
                  >
                    <Link href="/join" className="flex items-center gap-2">
                      Contact Us
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full border bg-blue-500 hover:text-blue-500 dark:hover:text-white border-blue-500 hover:border-white dark:border-white/20 text-white dark:hover:bg-white/10 px-8"
                  >
                    <Link href="/telegram" className="flex items-center gap-2">
                      Join Our Team
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </GlassReveal>
        </div>
      </section>
    </div>
  )
}

