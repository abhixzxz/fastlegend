"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Quote, Sparkles } from "lucide-react";
import { useUserPreferencesStore } from "@/lib/user-preferences-store";

const MODES = [
  {
    id: "time",
    label: "Time",
    icon: Clock,
    description: "Race against the clock",
  },
  {
    id: "words",
    label: "Words",
    icon: BookOpen,
    description: "Type a set number of words",
  },
  {
    id: "quote",
    label: "Quote",
    icon: Quote,
    description: "Type famous quotes",
  },
  {
    id: "zen",
    label: "Zen",
    icon: Sparkles,
    description: "No timer, just flow",
  },
];

const DURATIONS = {
  time: [15, 30, 60, 120],
  words: [10, 25, 50, 100],
};

interface SettingsProps {
  onStartTest: (config: any) => void;
}

export default function Settings({ onStartTest }: SettingsProps) {
  const { defaultMode, defaultDuration, setDefaultMode, setDefaultDuration } = useUserPreferencesStore();
  const [mode, setMode] = useState(defaultMode);
  const [duration, setDuration] = useState(defaultDuration);

  // Update local state when preferences change
  useEffect(() => {
    setMode(defaultMode);
    setDuration(defaultDuration);
  }, [defaultMode, defaultDuration]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const handleModeChange = (newMode: string) => {
    setMode(newMode);
    setDefaultMode(newMode as 'time' | 'words' | 'quote' | 'zen');
    // Set duration to first available for this mode
    const newDuration = DURATIONS[newMode as keyof typeof DURATIONS]?.[0] || 60;
    setDuration(newDuration);
    setDefaultDuration(newDuration);
  };

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
    setDefaultDuration(newDuration);
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.div className="text-center mb-16" variants={itemVariants}>
        <motion.h2
          className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent font-bitcount"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Test Your Speed
        </motion.h2>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto play-bold"
          variants={itemVariants}
        >
          Choose your test mode and duration to measure your typing speed,
          accuracy, and improve your skills
        </motion.p>
      </motion.div>

      <motion.div className="space-y-12" variants={containerVariants}>
        {/* Mode Selection */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">
            <span className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
            Test Mode
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {MODES.map((m, idx) => {
              const Icon = m.icon;
              return (
                <motion.button
                  key={m.id}
                  onClick={() => handleModeChange(m.id)}
                  className={`p-6 rounded-xl border-2 transition-all group relative overflow-hidden ${
                    mode === m.id
                      ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                      : "border-border hover:border-primary/50 bg-card/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <div className="relative z-10">
                    <motion.div
                      className="text-4xl mb-3 group-hover:scale-110 transition-transform"
                      whileHover={{ rotate: 10 }}
                    >
                      <Icon size={32} className="text-primary" />
                    </motion.div>
                    <div className="font-bold text-lg mb-1">{m.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {m.description}
                    </div>
                  </div>
                  {mode === m.id && (
                    <motion.div
                      className="absolute inset-0 bg-primary/5"
                      layoutId="activeMode"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Duration Selection */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">
            <span className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
            Duration
          </h3>
          <div className="flex gap-3 flex-wrap">
            {DURATIONS[mode as keyof typeof DURATIONS]?.map((d, idx) => (
              <motion.button
                key={d}
                onClick={() => handleDurationChange(d)}
                className={`px-8 py-4 rounded-lg border-2 font-bold text-lg transition-all ${
                  duration === d
                    ? "border-primary bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30"
                    : "border-border hover:border-primary/50 bg-card/50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                {d}
                {mode === "time" ? "s" : " words"}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          className="flex justify-center pt-8"
          variants={itemVariants}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => onStartTest({ mode, duration })}
              className="px-12 py-6 text-lg bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 text-primary-foreground font-bold rounded-xl"
            >
              Start Test
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
