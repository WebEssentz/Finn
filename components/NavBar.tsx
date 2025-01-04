'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MicIcon, CodeIcon } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border/50"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <MicIcon className="w-8 h-8 text-violet-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-violet-500 to-violet-300 bg-clip-text text-transparent">
            Voice Code AI
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link 
            href="/sign-in"
            className={`text-sm font-medium transition-colors ${
              pathname === '/sign-in' 
                ? 'text-violet-500' 
                : 'text-muted-foreground hover:text-violet-500'
            }`}
          >
            Sign In
          </Link>
          <Link 
            href="/sign-up"
            className={`text-sm font-medium transition-colors ${
              pathname === '/sign-up' 
                ? 'text-violet-500' 
                : 'text-muted-foreground hover:text-violet-500'
            }`}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}