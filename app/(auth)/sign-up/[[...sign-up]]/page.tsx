'use client';

import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-500/20 via-background to-background" />
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      
      {/* Animated Gradient Orbs */}
      <div className="fixed top-0 right-0 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob" />
      <div className="fixed -bottom-8 left-0 w-72 h-72 bg-violet-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        {/* Welcome Text */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-violet-500 to-violet-300 bg-clip-text text-transparent"
          >
            Join Finn
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground"
          >
            Create your account to start coding with voice
          </motion.p>
        </div>

        {/* Clerk Sign Up Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
          <div className="relative">
            <SignUp 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-background/50 backdrop-blur-xl border border-border/50 shadow-xl"
                }
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}