// 'use client';

// import { SignIn } from "@clerk/nextjs";
// import { motion } from "framer-motion";
// import { Navbar } from "@/components/navbar";

// export default function SignInPage() {
//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden pt-16">
//         {/* Background Effects */}
//         <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-500/20 via-background to-background" />
//         <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
        
//         {/* Animated Gradient Orbs */}
//         <motion.div 
//           animate={{
//             scale: [1, 1.1, 1],
//             opacity: [0.1, 0.15, 0.1],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//           }}
//           className="fixed top-0 -left-4 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl"
//         />
//         <motion.div 
//           animate={{
//             scale: [1, 1.1, 1],
//             opacity: [0.1, 0.15, 0.1],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             delay: 4,
//           }}
//           className="fixed -bottom-8 right-0 w-72 h-72 bg-violet-400 rounded-full mix-blend-multiply filter blur-xl"
//         />

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="relative z-10 w-full max-w-md px-4"
//         >
//           {/* Welcome Text */}
//           <div className="text-center mb-8">
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="text-4xl font-bold mb-2 bg-gradient-to-r from-violet-500 to-violet-300 bg-clip-text text-transparent"
//             >
//               Welcome Back
//             </motion.h1>
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//               className="text-muted-foreground"
//             >
//               Continue your coding journey with voice commands
//             </motion.p>
//           </div>

//           {/* Clerk Sign In Component */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="relative group"
//           >
//             <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
//             <div className="relative">
//               <SignIn 
//                 appearance={{
//                   elements: {
//                     rootBox: "w-full",
//                     card: "bg-background/50 backdrop-blur-xl border border-border/50 shadow-xl",
//                     headerTitle: "text-2xl font-bold text-foreground",
//                     headerSubtitle: "text-muted-foreground",
//                     socialButtonsBlockButton: "bg-background/50 hover:bg-background/80 border border-border/50",
//                     formFieldLabel: "text-foreground font-medium",
//                     formFieldInput: "bg-background/50 border
//                     // Continuing the SignIn appearance configuration...
// <SignIn 
//   appearance={{
//     elements: {
//       rootBox: "w-full",
//       card: "bg-background/50 backdrop-blur-xl border border-border/50 shadow-xl",
//       headerTitle: "text-2xl font-bold text-foreground",
//       headerSubtitle: "text-muted-foreground",
//       socialButtonsBlockButton: "bg-background/50 hover:bg-background/80 border border-border/50",
//       formFieldLabel: "text-foreground font-medium transform -translate-y-2 transition-all duration-200",
//       formFieldInput: "bg-background/50 border border-border/50 focus:border-violet-500 transition-all duration-200",
//       formButtonPrimary: "bg-gradient-to-r from-violet-600 to-violet-400 hover:from-violet-700 hover:to-violet-500",
//       footerActionLink: "text-violet-500 hover:text-violet-400",
//       dividerLine: "bg-border/50",
//       dividerText: "text-muted-foreground bg-background/50 px-2",
//       formFieldLabelRow: "relative group",
//       identityPreviewText: "text-foreground",
//       identityPreviewEditButton: "text-violet-500 hover:text-violet-400",
//       otpCodeFieldInput: "bg-background/50 border border-border/50 focus:border-violet-500",
//     },
//     layout: {
//       socialButtonsPlacement: "bottom",
//       socialButtonsVariant: "iconButton",
//     },
//   }}
// /></div>