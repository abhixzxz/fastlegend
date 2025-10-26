"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, RotateCcw, Share2, Download, Clock, Target, TrendingUp, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface ResultsScreenProps {
  results: {
    wpm: number
    accuracy: number
    errors: number
    consistency: number
    chartData: Array<{ time: number; wpm: number; errors: number }>
    phrasesUsed: string[]
  }
  onRetry: () => void
}

export default function ResultsScreen({ results, onRetry }: ResultsScreenProps) {
  const [isSharing, setIsSharing] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleShare = async () => {
    setIsSharing(true)
    try {
      const shareText = `🚀 FastLegend Typing Test Results\n\nWPM: ${results.wpm.toFixed(1)}\nAccuracy: ${results.accuracy.toFixed(1)}%\nErrors: ${results.errors}\nConsistency: ${results.consistency.toFixed(1)}%\n\nChallenge yourself at FastLegend!`
      
      if (navigator.share) {
        await navigator.share({
          title: 'FastLegend Typing Results',
          text: shareText
        })
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText)
        alert('Results copied to clipboard!')
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = shareText
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        alert('Results copied to clipboard!')
      }
    } catch (error) {
      console.error('Share failed:', error)
      alert('Failed to share results')
    }
    setIsSharing(false)
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const data = {
        timestamp: new Date().toISOString(),
        results: {
          wpm: results.wpm,
          accuracy: results.accuracy,
          errors: results.errors,
          consistency: results.consistency
        },
        chartData: results.chartData,
        phrasesUsed: results.phrasesUsed
      }
      
      const jsonString = JSON.stringify(data, null, 2)
      const blob = new Blob([jsonString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `fastlegend-results-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Failed to download results')
    }
    setIsDownloading(false)
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto p-4 md:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div className="text-center mb-8" variants={itemVariants}>
        <motion.div
          className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-3 rounded-full mb-4"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Trophy className="w-6 h-6" />
          <span className="text-xl font-bold">Test Complete!</span>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Your Results
        </h1>
        <p className="text-muted-foreground text-lg">Great job completing the typing test!</p>
      </motion.div>

      {/* Main Stats Grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" variants={itemVariants}>
        <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              WPM
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{results.wpm.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground mt-1">Words per minute</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Target className="w-4 h-4" />
              Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{results.accuracy.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Correct characters</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Errors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{results.errors}</div>
            <p className="text-xs text-muted-foreground mt-1">Mistakes made</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Consistency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-chart-3">{results.consistency.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Typing rhythm</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Section */}
      <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8" variants={itemVariants}>
        {/* WPM Chart */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-lg">WPM Progress</CardTitle>
            <CardDescription>Your typing speed over time</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={results.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis 
                  dataKey="time" 
                  stroke="var(--muted-foreground)"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="var(--muted-foreground)"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--card)", 
                    border: "1px solid var(--border)",
                    borderRadius: "8px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="wpm" 
                  stroke="var(--primary)" 
                  strokeWidth={2}
                  dot={{ fill: "var(--primary)", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "var(--primary)", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Errors Chart */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-lg">Error Rate</CardTitle>
            <CardDescription>Mistakes made over time</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={results.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis 
                  dataKey="time" 
                  stroke="var(--muted-foreground)"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="var(--muted-foreground)"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--card)", 
                    border: "1px solid var(--border)",
                    borderRadius: "8px"
                  }}
                />
                <Bar 
                  dataKey="errors" 
                  fill="var(--destructive)"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onRetry}
            size="lg"
            className="gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90 rounded-xl px-8"
          >
            <RotateCcw size={20} />
            Try Again
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleShare}
            disabled={isSharing}
            size="lg"
            variant="outline"
            className="gap-2 bg-card/50 border-border hover:border-primary hover:bg-primary/10 rounded-xl px-8"
          >
            <Share2 size={20} />
            {isSharing ? "Sharing..." : "Share Results"}
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            size="lg"
            variant="outline"
            className="gap-2 bg-card/50 border-border hover:border-primary hover:bg-primary/10 rounded-xl px-8"
          >
            <Download size={20} />
            {isDownloading ? "Downloading..." : "Download Data"}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
