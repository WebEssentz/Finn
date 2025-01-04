import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { cn } from "@/utils";
import { Providers } from './providers';
import { Inter } from 'next/font/google';
import { Toaster } from "sonner";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "Hume AI - EVI - Next.js Starter",
  description: "A Next.js starter using Hume AI's Empathic Voice Interface",
};
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={cn(
          inter.className,
          inter.className,
          "flex flex-col min-h-screen"
        )}
      >
        <Providers>
        <Nav />
        {children}
        <Toaster />
        </Providers>
      </body>
    </html>
    </ClerkProvider>
  );
}