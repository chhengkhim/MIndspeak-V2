"use client";

import { StaticImageData } from "next/image";
import image1 from "@/assets/image1.jpg";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";

// Glassmorphic reveal animation
const GlassReveal = ({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: string;
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
        };
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
        };
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
        };
    }
  };

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
  );
};

// Removed unused ParallaxLayer component

// Team member card component
interface TeamMember {
  name: string;
  role: string;
  roleType: string;
  roleIcon: React.ReactNode;
  bio: string;
  image: string | StaticImageData;
  expertise: { name: string; icon: React.ReactNode }[];
  achievements: string;
}

const GlassTeamCard = ({ member }: { member: TeamMember }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl dark:bg-blue-500/5 border dark:border-blue-900/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-500/30 dark:bg-gradient-to-br dark:from-blue-500/10 dark:to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="p-6 relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/20 shadow-inner">
            <Image
              src={member.image || "/placeholder.svg?height=200&width=200"}
              width={200}
              height={200}
              alt={member.name}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-500 dark:text-white mb-1">
              {member.name}
            </h3>
            <p className="text-sm tex-gray-500 text-purple-500 dark:text-purple-500 flex items-center gap-1.5">
              {member.roleIcon}
              {member.role}
            </p>
          </div>
        </div>

        <div className="mb-5">
          <p className="dark:text-gray-300 text-yellow-900 text-sm leading-relaxed">{member.bio}</p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-bold underline uppercase tracking-wider text-blue-400 dark:text-blue-300 mb-2">
              Expertise
            </h4>
            <div className="flex flex-wrap gap-2">
              {member.expertise.map((skill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-blue-500 border-white/10 text-white hover:bg-white/10 dark:bg-white/5 border dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/10 transition-colors"
                >
                  {skill.icon}
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-blue-500 dark:text-blue-300 mb-2 font-bold flex items-center gap-1.5">
              <Award className="h-3 text-yellow-400 w-3" />
              Achievement
            </h4>
            <p className="text-xs text-teal-400 dark:text-gray-400">{member.achievements}</p>
          </div>
        </div>

        <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
      </div>
    </motion.div>
  );
};

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Team members data
  const teamMembers = [
    {
      name: "Sochesda Thoeun",
      role: "Lead Frontend Engineer",
      roleType: "frontend",
      roleIcon: <Code className="h-4 w-4 mr-1" />,
      bio: "Passionate about creating intuitive user experiences and leading the development of MindSpeak's frontend architecture with React and Next.js.",
      image: image1,
      expertise: [
        { name: "React", icon: <Code className="h-3 w-3 mr-1" /> },
        { name: "Next.js", icon: <Zap className="h-3 w-3 mr-1" /> },
        { name: "UI/UX", icon: <Palette className="h-3 w-3 mr-1" /> },
        { name: "Team Leadership", icon: <Users2 className="h-3 w-3 mr-1" /> },
      ],
      achievements:
        "Led the development of MindSpeak's responsive interface and user authentication system.",
    },
    {
      name: "Pisethsambo Phok",
      role: "Senior Backend Developer",
      roleType: "backend",
      roleIcon: <Database className="h-4 w-4 mr-1" />,
      bio: "Specializes in server-side architecture and database management, ensuring MindSpeak's performance, security, and scalability.",
      image: image1,
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
      achievements:
        "Architected MindSpeak's secure data storage system and real-time messaging infrastructure.",
    },
    {
      name: "Se Chanmoniroth",
      role: "UI/UX Design Lead",
      roleType: "design",
      roleIcon: <Palette className="h-4 w-4 mr-1" />,
      bio: "Creates the visual identity and user experience of MindSpeak, focusing on accessibility, emotional design, and user research.",
      image: image1,
      expertise: [
        { name: "Figma", icon: <Palette className="h-3 w-3 mr-1" /> },
        { name: "User Research", icon: <Users2 className="h-3 w-3 mr-1" /> },
        { name: "Accessibility", icon: <Star className="h-3 w-3 mr-1" /> },
        { name: "Motion Design", icon: <Zap className="h-3 w-3 mr-1" /> },
      ],
      achievements:
        "Designed MindSpeak's award-winning interface and established our comprehensive design system.",
    },
    {
      name: "Sotheara Em",
      role: "Community & Content Manager",
      roleType: "community",
      roleIcon: <Users2 className="h-4 w-4 mr-1" />,
      bio: "Oversees content strategy and community engagement, ensuring MindSpeak remains a supportive and informative space for all users.",
      image: image1,
      expertise: [
        { name: "Content Strategy", icon: <Star className="h-3 w-3 mr-1" /> },
        {
          name: "Community Building",
          icon: <Users2 className="h-3 w-3 mr-1" />,
        },
        { name: "Social Media", icon: <Globe className="h-3 w-3 mr-1" /> },
        { name: "Event Management", icon: <Award className="h-3 w-3 mr-1" /> },
      ],
      achievements:
        "Built MindSpeak's community from the ground up, now reaching over 5,000 active members.",
    },
  ];

  if (!isLoaded) {
    return null;
  }

  return (
    <div className=" min-h-screen overflow-hidden">
      {/* Hero Section */}
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
              <h1 className="text-4xl md:text-6xl text-blue-500 dark:text-blue-500 font-light mb-6 bg-clip-text bg-gradient-to-r from-blue-300 via-blue-200 to-blue-300 leading-tight">
                The Minds Behind
                <span className="text-red-600 font-bold"> MindSpeak</span>
              </h1>
            </GlassReveal>

            <GlassReveal delay={0.2}>
              <p className="text-xl text-gray-600 dark:text-white mb-10 leading-relaxed font-light">
                We are a team of passionate students from Paragon International
                University dedicated to creating a safe space for mental health
                support and community connection.
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
      </section>

      {/* Mission & Values Section */}
      <section className="relative py-20 z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Mission Column */}
            <GlassReveal direction="right">
              <div className="backdrop-blur-xl bg-white border-gray-500/10 shadow-lg shadow-gray-400 dark:bg-white/5 border dark:border-white/10 rounded-3xl p-8 h-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-blue-100 dark:bg-white/5 border dark:border-white/10 text-blue-300">
                  <Heart className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-blue-500 font-light">
                    Our Mission
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl text-blue-500 dark:text-blue-500 font-bold mb-6 bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                  Creating a Safe Space for Mental Health
                </h2>

                <p className="text-gray-600 dark:text-white mb-8 leading-relaxed">
                  MindSpeak was born from our personal experiences with mental
                  health challenges as university students. We recognized the
                  need for a platform where students could express themselves
                  freely, find support, and access resources without judgment.
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
                      <span className="flex items-center gap-2">
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
                  <span className="text-sm dark:text-blue-500 font-light">
                    Our Values
                  </span>
                </div>

                <h2 className="text-3xl text-blue-500 dark:text-blue-500 md:text-4xl font-bold mb-6 bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                  What We Stand For
                </h2>

                <div className="grid gap-6">
                  {[
                    {
                      title: "Compassion",
                      description:
                        "We approach every interaction with empathy and understanding.",
                    },
                    {
                      title: "Safety",
                      description:
                        "We create secure spaces where vulnerability is respected and protected.",
                    },
                    {
                      title: "Inclusivity",
                      description:
                        "We welcome all students regardless of background or experience.",
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
                      <p className="text-gray-500 dark:text-white text-sm">
                        {value.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassReveal>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section id="team" className="relative py-20 z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <GlassReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-blue-100 dark:bg-white/5 border dark:border-white/10 text-blue-500">
                <Users className="h-4 w-4" />
                <span className="text-sm font-light">Meet The Team</span>
              </div>
            </GlassReveal>

            <GlassReveal delay={0.1}>
              <h2 className="text-3xl text-blue-500 dark:text-blue-500 md:text-5xl font-light mb-4 bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-300">
                Our Talented Team
              </h2>
            </GlassReveal>

            <GlassReveal delay={0.2}>
              <p className="text-gray-500 dark:text-white max-w-2xl mx-auto">
                The dedicated individuals who bring MindSpeak to life
              </p>
            </GlassReveal>
          </div>

          <div className="grid font-bold md:grid-cols-2 lg:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <GlassTeamCard key={index} member={member} />
            ))}
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
                <h2 className="text-3xl text-blue-500 dark:text-blue-500 md:text-5xl font-light mb-6 text-center bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-300">
                  Want to Join Our Mission?
                </h2>

                <p className="text-xl text-gray-500 dark:text-white max-w-2xl mx-auto mb-10 text-center font-light">
                  We are always looking for passionate volunteers and
                  collaborators who want to make a difference in student mental
                  health.
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
  );
}
