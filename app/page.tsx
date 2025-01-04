'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import Messages from '@/components/Messages';
import {
  Mic,
  StopCircle,
  Command,
  PlayCircle,
  Quote,
  CheckCircle2,
  Sparkles,
  Brain, 
  Zap, 
  Code2, 
  Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Nav } from '@/components/Nav';
import { HumeProvider } from '@/components/HumeProvider';
import { useVoice, VoiceReadyState } from '@humeai/voice-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
// Types
interface FeatureProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

// Add these at the top of the file after the existing interfaces
interface TrialState {
  isExpired: boolean;
  timeRemaining: number;
  isActive: boolean;
}

const PricingSection = () => (
  <section className="py-20 px-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-primary/5 to-background/0" />
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-5xl mx-auto text-center"
    >
      <h2 className="text-4xl font-bold mb-12">Simple, Transparent Pricing</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Starter",
            price: "Free",
            features: ["3 voice commands", "Basic code generation", "Community support"]
          },
          {
            title: "Pro",
            price: "$19/mo",
            features: ["Unlimited voice commands", "Advanced code generation", "Priority support", "Custom snippets"]
          },
          {
            title: "Enterprise",
            price: "Custom",
            features: ["Custom deployment", "Dedicated support", "Team management", "Custom integrations"]
          }
        ].map((plan, i) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className={cn(
              "rounded-2xl p-8 backdrop-blur-sm",
              i === 1 ? "bg-primary/10 border-primary/20" : "bg-card/5 border-border/5",
              "border-2"
            )}
          >
            <h3 className="text-xl font-bold mb-4">{plan.title}</h3>
            <div className="text-3xl font-bold mb-6">{plan.price}</div>
            <ul className="space-y-3 mb-8">
              {plan.features.map(feature => (
                <li key={feature} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className={cn(
                "w-full",
                i === 1
                  ? "bg-primary hover:bg-primary/90"
                  : "bg-card/10 hover:bg-card/20"
              )}
            >
              Get Started
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Documentation", "Updates"]
    },
    {
      title: "Company",
      links: ["About", "Blog", "Careers", "Press"]
    },
    {
      title: "Resources",
      links: ["Community", "Help Center", "API", "Status"]
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Security", "Cookies"]
    }
  ];

  const socialLinks = [
    { name: "Twitter", url: "#" },
    { name: "GitHub", url: "#" },
    { name: "Discord", url: "#" },
    { name: "LinkedIn", url: "#" }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative py-20 px-6 border-t border-border/5"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background opacity-80" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerLinks.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold mb-4 text-foreground">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: (i * 0.1) + (j * 0.05) }}
                    viewport={{ once: true }}
                  >
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/5"
        >
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary/10 p-2 rounded-full"
            >
              <Sparkles className="w-5 h-5 text-primary" />
            </motion.div>
            <span className="text-sm text-muted-foreground">
              © 2024 VoiceCode AI. All rights reserved.
            </span>
          </div>

          <div className="flex gap-6">
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.url}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

// Add these imports at the top

const EpicMeetFinn = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-violet-500/5 to-background" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-repeat-[24px_24px]" />
      <div className="absolute h-full w-full bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000" />

      <motion.div 
        className="relative container mx-auto px-6"
        style={{ opacity, y }}
      >
        {/* Main Heading */}
        <div className="flex flex-col items-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-8xl md:text-9xl font-bold tracking-tighter text-center"
          >
            <span className="text-foreground">MEET </span>
            <span className="bg-gradient-to-r from-violet-500 to-violet-300 bg-clip-text text-transparent">
              FINN
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-violet-500 to-violet-300 bg-clip-text text-transparent"
          >
            THE WORLD'S FIRST VOICE-NATIVE AI DEVELOPER
          </motion.h2>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>

        {/* Try Demo Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
            <div className="relative px-8 py-7 bg-card/50 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
              <div className="space-y-2">
                <p className="text-foreground">
                  <span className="text-lg font-semibold">Experience the Future</span>
                </p>
                <p className="text-muted-foreground text-sm">
                  Try the interactive demo below to experience a glimpse of Finn's capabilities.
                  This is just a preview - the full version includes VS Code integration, project awareness,
                  and advanced code generation features.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Feature Card Component
const FeatureCard = ({ feature, index }: { feature: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative group"
  >
    <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-violet-300 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
    <div className="relative px-7 py-6 bg-card/50 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
      <feature.icon className="w-8 h-8 text-violet-400" />
      <div className="space-y-2">
        <p className="text-foreground">
          <span className="text-lg font-semibold">{feature.title}</span>
        </p>
        <p className="text-muted-foreground text-sm">{feature.description}</p>
      </div>
    </div>
  </motion.div>
);

// Feature data
const features = [
  {
    icon: Brain,
    title: "Context-Aware Intelligence",
    description: "Understands your entire project context, making suggestions that perfectly fit your codebase."
  },
  {
    icon: Sparkles,
    title: "Natural Voice Interaction",
    description: "Communicate naturally with AI that truly understands developer intent and technical context."
  },
  {
    icon: Code2,
    title: "Production-Ready Output",
    description: "Generates secure, tested, and optimized code that follows industry best practices."
  },
  {
    icon: Bot,
    title: "Adaptive Learning",
    description: "Continuously learns from your coding style and project patterns."
  },
  {
    icon: Zap,
    title: "Real-Time Collaboration",
    description: "Seamlessly integrates with your development workflow in VS Code."
  }
];

const TestimonialsSection = () => (
  <section className="py-20 px-6">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-5xl mx-auto"
    >
      <h2 className="text-4xl font-bold text-center mb-12">
        Loved by Developers
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            quote: "This tool has revolutionized my coding workflow. I can't imagine going back.",
            author: "Sarah Chen",
            role: "Senior Developer"
          },
          {
            quote: "The voice commands are incredibly accurate. It's like having a coding superpower.",
            author: "Michael Rodriguez",
            role: "Frontend Engineer"
          },
          {
            quote: "Perfect for accessibility. Finally, I can code hands-free when needed.",
            author: "Alex Thompson",
            role: "Full Stack Developer"
          }
        ].map((testimonial, i) => (
          <motion.div
            key={testimonial.author}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl bg-card/5 border border-border/5 backdrop-blur-sm"
          >
            <Quote className="h-6 w-6 text-primary mb-4" />
            <p className="text-muted-foreground mb-4">{testimonial.quote}</p>
            <div>
              <div className="font-semibold">{testimonial.author}</div>
              <div className="text-sm text-muted-foreground">{testimonial.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

const CTASection = () => (
  <section className="py-20 px-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-violet-500/10 to-primary/10" />
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto text-center relative"
    >
      <h2 className="text-4xl font-bold mb-6">
        Ready to code smarter?
      </h2>
      <p className="text-xl text-muted-foreground mb-8">
        Join thousands of developers who are already coding with their voice.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90"
        >
          Get Started Free
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="group"
        >
          Watch Demo
          <PlayCircle className="ml-2 h-5 w-5 group-hover:text-primary transition-colors" />
        </Button>
      </div>
    </motion.div>
  </section>
);

// Add a new component for the expired state
const ExpiredState = () => (
  <div className="text-center p-8">
    <h3 className="text-xl font-semibold mb-4">
      Hope you enjoyed the demo!
    </h3>
    <p className="text-muted-foreground mb-6">
      Want to unlock the full potential? Sign up to get started!
    </p>
    <Button
      className="bg-gradient-to-r from-primary to-violet-500 hover:from-primary/90 hover:to-violet-500/90"
      onClick={() => window.location.href = '/signup'}
    >
      Get Started
    </Button>
  </div>
);

const CompanyLogos = () => (
  <div className="flex flex-wrap justify-center items-center gap-8 mt-12">
    <svg className="h-8 w-auto text-foreground/60 hover:text-foreground/80 transition-colors" viewBox="0 0 100 30">
      <path d="M50 15c0-8.3 6.7-15 15-15s15 6.7 15 15-6.7 15-15 15-15-6.7-15-15z" />
      <path d="M0 15c0-8.3 6.7-15 15-15s15 6.7 15 15-6.7 15-15 15S0 23.3 0 15z" />
    </svg>
  </div>
);

const MacWindowControls = () => (
  <div className="flex items-center gap-2 relative z-10">
    <div className="h-3 w-3 rounded-full bg-red-500" />
    <div className="h-3 w-3 rounded-full bg-yellow-500" />
    <div className="h-3 w-3 rounded-full bg-green-500" />
  </div>
);

function FeatureHighlight({ icon: Icon, title, description }: FeatureProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center p-6"
    >
      <div className="rounded-full bg-primary/10 p-3 mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  );
}

function InteractiveDemo() {
  const { connect, disconnect, readyState } = useVoice();
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [trialState, setTrialState] = useState<TrialState>({
    isExpired: false,
    timeRemaining: 120,
    isActive: false
  });
  const messagesRef = useRef<HTMLDivElement>(null);

  // Device ID management
  const [deviceId] = useState(() => {
    const stored = localStorage.getItem('deviceId');
    if (stored) return stored;
    const newId = crypto.randomUUID();
    localStorage.setItem('deviceId', newId);
    return newId;
  });

  // Add keyboard scroll handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const messagesContainer = messagesRef.current;
    if (!messagesContainer) return;

    const scrollAmount = 100; // Adjust this value to control scroll speed

    if (e.key === 'ArrowDown') {
      messagesContainer.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
      messagesContainer.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
    }
  };


  // Timer effect with database sync
  // Also update the timer effect URL
  useEffect(() => {
    if (!trialState.isActive) return;

    const timer = setInterval(async () => {
      try {
        const response = await fetch('/api/trial-session', { // Remove the trailing slash
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            deviceId,
            action: 'update',
            timeRemaining: trialState.timeRemaining - 1
          })
        });

        const data = await response.json();

        if (data.isExpired) {
          setTrialState(prev => ({ ...prev, isExpired: true, isActive: false }));
          disconnect();
          toast.error("Trial time expired!");
          return;
        }

        setTrialState(prev => ({
          ...prev,
          timeRemaining: Math.max(0, prev.timeRemaining - 1)
        }));

      } catch (err) {
        console.error('Failed to update timer:', err);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [trialState.isActive, deviceId, disconnect, trialState.timeRemaining]);

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/trial-session', { // Remove the trailing slash
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deviceId, action: 'check' })
        });

        const data = await response.json();
        setTrialState({
          isExpired: data.hasUsedTrial,
          timeRemaining: data.timeRemaining || 0,
          isActive: false
        });
      } catch (err) {
        console.error('Session check error:', err);
        toast.error('Failed to check trial status');
      }
    };

    checkSession();
  }, [deviceId]);

  const handleVoiceControl = async () => {
    try {
      setError('');
      setIsProcessing(true);

      if (readyState === VoiceReadyState.OPEN) {
        await disconnect();
        setTrialState(prev => ({ ...prev, isActive: false }));

        const response = await fetch('/api/trial-session', { // Remove '/route.ts'
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            deviceId,
            action: 'stop',
            timeRemaining: trialState.timeRemaining
          })
        });

        const data = await response.json();
        if (data.isExpired) {
          setTrialState(prev => ({ ...prev, isExpired: true }));
          toast.error('Trial time expired!');
        }
        return;
      }

      const response = await fetch('/api/trial-session', { // Remove '/route.ts'
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId, action: 'start' })
      });

      const data = await response.json();

      if (data.hasUsedTrial) {
        setTrialState(prev => ({ ...prev, isExpired: true }));
        toast.error("Trial expired. Sign up for more features!");
        return;
      }

      setTrialState({
        isExpired: false,
        timeRemaining: data.timeRemaining || 120,
        isActive: true
      });

      await connect();
      toast.success(data.message);

    } catch (err) {
      console.error('Voice control error:', err);
      toast.error("Failed to manage voice session");
    } finally {
      setIsProcessing(false);
    }
  };

  // Mic button disabled state
  const isMicDisabled = isProcessing ||
    readyState === VoiceReadyState.CONNECTING ||
    trialState.isExpired ||
    trialState.timeRemaining <= 0;

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl border border-border/50 bg-background/50 shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col" style={{ height: '600px' }}>
      {/* Header with timer */}
      <div className="animated-border flex-none" tabIndex={0}>
        <div className="flex items-center justify-between px-4 py-2 bg-background/80">
          <MacWindowControls />
          <div className="text-xs text-foreground/60">
            {trialState.isActive && (
              <span className={cn(
                "font-mono",
                trialState.timeRemaining < 30 ? "text-red-500" :
                  trialState.timeRemaining < 60 ? "text-yellow-500" : ""
              )}>
                Time Remaining: {Math.floor(trialState.timeRemaining / 60)}:
                {(trialState.timeRemaining % 60).toString().padStart(2, '0')}
              </span>
            )}
          </div>
          <div className="relative w-16">
            <div className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full",
              readyState === VoiceReadyState.OPEN ? "bg-green-500 animate-pulse" :
                readyState === VoiceReadyState.CONNECTING ? "bg-yellow-500" : "bg-gray-500"
            )} />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-6">
        {trialState.isExpired ? (
          <ExpiredState />
        ) : (
          <div className="flex flex-col h-full">
            {/* Status Message */}
            <div className="text-sm text-foreground/60 text-center mb-6">
              {error || (
                readyState === VoiceReadyState.OPEN ? 'Listening... Speak now' :
                  readyState === VoiceReadyState.CONNECTING ? 'Connecting...' :
                    'Click to start recording'
              )}
            </div>

            {/* Mic Button */}
            <div className="flex-none flex flex-col items-center mb-6">
              <Button
                size="lg"
                onClick={handleVoiceControl}
                disabled={isMicDisabled}
                className={cn(
                  "relative group h-16 w-16 rounded-full transition-all duration-300",
                  readyState === VoiceReadyState.OPEN && "animate-pulse bg-red-500",
                  isMicDisabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {readyState === VoiceReadyState.OPEN ? (
                  <StopCircle className="h-6 w-6 text-white" />
                ) : (
                  <Mic className="h-6 w-6" />
                )}
                <div className="absolute inset-0 rounded-full bg-primary opacity-20 group-hover:opacity-30 transition-opacity" />
              </Button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 min-h-0"> {/* Add min-h-0 to allow flex child to shrink */}
              <div
                ref={messagesRef}
                className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
                tabIndex={0}
                onKeyDown={handleKeyDown}
                role="region"
                aria-label="Messages"
              >
                <div className="p-4">
                  <Messages ref={messagesRef} />
                </div>
              </div>
            </div>

            {/* Voice Command Examples */}
            <div className="flex-none text-xs text-foreground/60 mt-4">
              <div>Try saying:</div>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 bg-primary/10 rounded-full">
                  &quot;Create a button component&quot;
                </span>
                <span className="px-2 py-1 bg-primary/10 rounded-full">
                  &quot;Generate a form with validation&quot;
                </span>
                <span className="px-2 py-1 bg-primary/10 rounded-full">
                  &quot;Make a navbar&quot;
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <HumeProvider>
      <div className="relative min-h-screen bg-background antialiased selection:bg-primary/20 selection:text-primary flex flex-col">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
          <svg width="100%" height="100%" className="absolute inset-0 opacity-20">
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <Nav />

        <main className="flex-1 flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-start px-6 pt-32 pb-20">
            <motion.div className="relative z-10 w-full max-w-5xl">
              <motion.a
                href="/sign-up"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group mx-auto mb-8 flex max-w-fit items-center gap-2 rounded-full border border-border/50 bg-background/50 px-5 py-2 text-sm text-foreground/60 backdrop-blur transition hover:border-border hover:bg-background/80 hover:text-foreground"
              >
                <span>✨ Experience the future of coding</span>
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
              </motion.a>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative z-10 text-center flex flex-col items-center gap-4"
              >
                <span className="text-5xl sm:text-7xl font-medium tracking-tight">
                  Code with your voice
                </span>
                <span className="text-4xl sm:text-6xl font-medium tracking-tight relative bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                  powered by AI
                  <div className="absolute inset-x-0 -bottom-2 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center text-lg text-muted-foreground"
              >
                Transform your voice into production-ready code instantly.
                Built for developers who want to code faster and smarter.
              </motion.p>

              <EpicMeetFinn />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-16 mb-20"
              >
                <InteractiveDemo />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
              >
                <FeatureHighlight
                  icon={Sparkles}
                  title="AI-Powered"
                  description="Advanced machine learning for accurate code generation"
                />
                <FeatureHighlight
                  icon={Command}
                  title="Voice Control"
                  description="Natural language processing for hands-free coding"
                />
                <FeatureHighlight
                  icon={Zap}
                  title="Instant Results"
                  description="Real-time code generation and formatting"
                />
              </motion.div>

              <CompanyLogos />
              <PricingSection />
              <TestimonialsSection />
              <CTASection />
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </HumeProvider>
  );
}
