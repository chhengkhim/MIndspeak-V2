"use client";


import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo2.png";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/about" className="flex items-center gap-2">
              <Image
                src={logo}
                alt="Logo"
                width={200}
                height={200}
                className="rounded-full brightness-125"
              />
            </Link>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              A safe haven for expressing mental struggles and sharing
              experiences. Created by students at Paragon International
              University.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/stories"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Read Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/share"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Share Your Story
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Mental Health Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/telegram"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Join Telegram Group
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Our Mission
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MindSpeak. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Button
              className="bg-blue-500 dark:bg-blue-500 dark:hover:bg-white dark:hover:shadow-blue-500 text-white hover:text-blue-500 hover:bg-white shadow-black/20 shadow-lg rounded-3xl"
              variant="ghost"
              size="icon"
              asChild
            >
              <Link
                href="https://t.me/MindSpeakCommunity"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-send"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
                <span className="sr-only">Telegram</span>
              </Link>
            </Button>

            <Button
              className="bg-blue-500 dark:bg-blue-500 dark:hover:bg-white dark:hover:shadow-blue-500 text-white hover:text-blue-500 hover:bg-white shadow-black/20 shadow-lg rounded-3xl"
              variant="ghost"
              size="icon"
              asChild
            >
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
            </Button>

            <Button
              className="bg-pink-500 dark:bg-pink-500 dark:hover:bg-white dark:hover:shadow-pink-500 hover:bg-white text-white hover:text-pink-500 rounded-3xl shadow-black/20 shadow-lg"
              variant="ghost"
              size="icon"
              asChild
            >
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
            </Button>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 mx-1 text-red-500" />
            <span>by PIU Students</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
