// components/Nav.tsx
"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Sun, Moon, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

export function Nav() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-xl" : "backdrop-blur-none"
      }`}
    >
      <div 
        className={`absolute inset-0 transition-colors duration-300 ${
          isScrolled 
            ? "bg-background/75 border-b border-border/50" 
            : "bg-gradient-to-b from-background/80 to-background/0"
        }`}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                Finn
              </span>
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-primary/20 to-violet-500/20 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="/features">Features</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/docs">Documentation</NavLink>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* GitHub */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/yourusername/finn"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-background/50 transition-colors hover:bg-background/80"
            >
              <Github className="h-4 w-4" />
            </motion.a>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-background/50 transition-colors hover:bg-background/80"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Sign Up Button */}
            <Button
              asChild
              variant="default"
              className="relative group"
            >
              <Link href="/sign-up">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 rounded-full transition-all group-hover:blur-md bg-gradient-to-r from-primary to-violet-500 opacity-0 group-hover:opacity-75" />
                {/* Shine effect */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/25 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

// NavLink component
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="relative text-sm text-foreground/60 transition-colors hover:text-foreground"
    >
      {children}
      <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 transition-opacity hover:opacity-100" />
    </Link>
  );
}