"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { RotateCcw, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { generatePhrase } from "@/lib/phrase-generator"
import { calculateStats } from "@/lib/stats-calculator"

interface TypingTestProps {
  config: {
    duration: number
    mode: string
  }
  onComplete: (results: any) => void
}

export default function TypingTest({ config, onComplete }: TypingTestProps) {
  const [phrase, setPhrase] = useState("")
  const [input, setInput] = useState("")
  const [timeLeft, setTimeLeft] = useState(config.duration)
  const [isActive, setIsActive] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [startTime, setStartTime] = useState(Date.now())
  const inputRef = useRef<HTMLInputElement>(null)

  // Generate initial phrase
  useEffect(() => {
    setPhrase(generatePhrase(config.duration))
  }, [config.duration])

  // Timer effect
  useEffect(() => {
    if (!isActive || timeLeft <= 0 || isPaused) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, timeLeft, isPaused])

  // Handle test completion
  useEffect(() => {
    if (!isActive && timeLeft === 0) {
      const stats = calculateStats(input, phrase, Date.now() - startTime, config.mode)
      onComplete(stats)
    }
  }, [isActive, timeLeft])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleInputChange = (e: string) => {
    if (!isActive || isPaused) return
    setInput(e)

    // Generate new phrase when current is completed
    if (e.length > 0 && e.trim() === phrase.trim()) {
      setPhrase(generatePhrase(config.duration))
      setInput("")
    }
  }

  const handleReset = () => {
    setInput("")
    setTimeLeft(config.duration)
    setIsActive(true)
    setIsPaused(false)
    setStartTime(Date.now())
    setPhrase(generatePhrase(config.duration))
    inputRef.current?.focus()
  }

  const handlePause = () => {
    setIsPaused(!isPaused)
    if (!isPaused) {
      inputRef.current?.focus()
    }
  }

  // Calculate current stats for display
  const currentStats = calculateStats(input, phrase, Date.now() - startTime, config.mode)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.div className="max-w-5xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
      {/* Stats Bar */}
      <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: "WPM", value: Math.round(currentStats.wpm), color: "primary" },
          { label: "Accuracy", value: `${currentStats.accuracy.toFixed(1)}%`, color: "accent" },
          { label: "Time", value: `${timeLeft}s`, color: "primary" },
          { label: "Chars", value: input.length, color: "accent" },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            className={`bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-${stat.color} transition-all`}
            variants={itemVariants}
            whileHover={{ scale: 1.05, borderColor: "var(--primary)" }}
          >
            <div className="text-muted-foreground text-sm mb-2 font-medium">{stat.label}</div>
            <motion.div
              className={`text-3xl font-bold text-${stat.color}`}
              key={stat.value}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {stat.value}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Typing Area */}
      <motion.div
        className="bg-card/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-border mb-8 shadow-xl"
        variants={itemVariants}
      >
        {/* Display Text */}
        <motion.div
          className="mb-8 text-xl md:text-2xl leading-relaxed font-mono text-muted-foreground min-h-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {phrase.split("").map((char, idx) => {
            let charClass = "text-muted-foreground"
            let bgClass = ""

            if (idx < input.length) {
              if (input[idx] === char) {
                charClass = "text-primary font-semibold"
              } else {
                charClass = "text-destructive font-semibold"
                bgClass = "bg-destructive/20"
              }
            } else if (idx === input.length) {
              charClass = "text-foreground font-bold"
              bgClass = "bg-primary/30 animate-pulse-glow"
            }

            return (
              <motion.span
                key={idx}
                className={`${charClass} ${bgClass} px-0.5 py-1 rounded transition-all`}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
              >
                {char === " " ? "·" : char}
              </motion.span>
            )
          })}
        </motion.div>

        {/* Input Field */}
        <motion.input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          disabled={!isActive || isPaused}
          className="w-full bg-background/50 border-2 border-primary/50 rounded-xl px-6 py-4 text-lg font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder-muted-foreground/50"
          placeholder={isPaused ? "Test paused..." : "Start typing..."}
          autoComplete="off"
          spellCheck="false"
          variants={itemVariants}
        />
      </motion.div>

      {/* Controls */}
      <motion.div className="flex justify-center gap-4" variants={itemVariants}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleReset}
            variant="outline"
            className="gap-2 bg-card/50 border-border hover:border-primary hover:bg-primary/10 rounded-xl px-6 py-3"
          >
            <RotateCcw size={18} />
            Reset
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handlePause}
            variant="outline"
            className="gap-2 bg-card/50 border-border hover:border-primary hover:bg-primary/10 rounded-xl px-6 py-3"
          >
            {isPaused ? <Play size={18} /> : <Pause size={18} />}
            {isPaused ? "Resume" : "Pause"}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
