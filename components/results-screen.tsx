"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Share2, Download, RotateCcw } from "lucide-react"
import { useStatsStore } from "@/lib/store"
import { useEffect } from "react"

interface ResultsScreenProps {
  results: any
  onRetry: () => void
}

export default function ResultsScreen({ results, onRetry }: ResultsScreenProps) {
  const { updateStats } = useStatsStore()

  useEffect(() => {
    updateStats({
      totalTests: (prev) => (prev || 0) + 1,
      bestWPM: Math.max(results.wpm, (prev) => prev || 0),
      averageWPM: ((prev) => (prev || 0) + results.wpm) / 2,
      bestAccuracy: Math.max(results.accuracy, (prev) => prev || 0),
      totalTimeTyped: (prev) => (prev || 0) + results.timeTaken,
    })
  }, [results, updateStats])

  // Generate chart data
  const chartData = Array.from({ length: 15 }, (_, i) => ({
    time: i + 1,
    wpm: Math.max(0, results.wpm + Math.random() * 20 - 10),
    errors: Math.floor(Math.random() * 5),
  }))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div className="max-w-5xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
      {/* Main Stats */}
      <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: "WPM", value: Math.round(results.wpm), color: "from-primary to-accent" },
          { label: "Accuracy", value: `${results.accuracy.toFixed(1)}%`, color: "from-accent to-primary" },
          { label: "Raw WPM", value: Math.round(results.rawWpm), color: "from-primary to-accent" },
          { label: "Errors", value: results.errors, color: "from-destructive to-red-600" },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            className={`bg-gradient-to-br ${stat.color} p-0.5 rounded-xl`}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-card p-6 rounded-lg text-center">
              <div className="text-muted-foreground text-sm mb-2 font-medium">{stat.label}</div>
              <motion.div
                className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {stat.value}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <motion.div className="grid md:grid-cols-2 gap-8 mb-12" variants={containerVariants}>
        {/* WPM Chart */}
        <motion.div
          className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border"
          variants={itemVariants}
          whileHover={{ borderColor: "var(--primary)" }}
        >
          <h3 className="text-lg font-bold mb-4 text-primary">WPM Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#282828" />
              <XAxis stroke="#b3b3b3" />
              <YAxis stroke="#b3b3b3" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #1db954", borderRadius: "8px" }}
                labelStyle={{ color: "#1db954" }}
              />
              <Line type="monotone" dataKey="wpm" stroke="#1db954" dot={false} strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Error Chart */}
        <motion.div
          className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border"
          variants={itemVariants}
          whileHover={{ borderColor: "var(--primary)" }}
        >
          <h3 className="text-lg font-bold mb-4 text-primary">Errors Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#282828" />
              <XAxis stroke="#b3b3b3" />
              <YAxis stroke="#b3b3b3" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #e74c3c", borderRadius: "8px" }}
                labelStyle={{ color: "#e74c3c" }}
              />
              <Bar dataKey="errors" fill="#1db954" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      {/* Detailed Stats */}
      <motion.div
        className="bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-border mb-8"
        variants={itemVariants}
      >
        <h3 className="text-xl font-bold mb-6 text-primary">Detailed Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { label: "Characters Typed", value: results.charsTyped },
            { label: "Correct Characters", value: results.correctChars },
            { label: "Incorrect Characters", value: results.errors },
            { label: "Time Taken", value: `${results.timeTaken}s` },
            { label: "Consistency", value: `${results.consistency}%` },
            { label: "Test Mode", value: results.mode?.toUpperCase() },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <div className="text-muted-foreground text-sm mb-2">{stat.label}</div>
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div className="flex gap-4 justify-center flex-wrap" variants={itemVariants}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onRetry}
            className="gap-2 px-8 py-3 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 text-primary-foreground font-bold rounded-xl"
          >
            <RotateCcw size={18} />
            Try Again
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            className="gap-2 px-8 py-3 bg-card/50 border-border hover:border-primary hover:bg-primary/10 rounded-xl"
          >
            <Share2 size={18} />
            Share
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            className="gap-2 px-8 py-3 bg-card/50 border-border hover:border-primary hover:bg-primary/10 rounded-xl"
          >
            <Download size={18} />
            Download
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
