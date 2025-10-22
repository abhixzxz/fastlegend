"use client"

import { motion } from "framer-motion"
import { SettingsIcon, User, Zap, Moon, Sun, Palette } from "lucide-react"
import { useThemeStore, type Theme } from "@/lib/store"
import { useState } from "react"

const THEMES: { id: Theme; label: string }[] = [
  { id: "spotify", label: "Spotify" },
  { id: "ocean", label: "Ocean" },
  { id: "sunset", label: "Sunset" },
  { id: "forest", label: "Forest" },
  { id: "cyberpunk", label: "Cyberpunk" },
]

export default function Header() {
  const { theme, colorMode, setTheme, setColorMode } = useThemeStore()
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const [showColorMode, setShowColorMode] = useState(false)

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap size={24} className="text-primary-foreground" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              FastLegend
            </h1>
            <p className="text-xs text-muted-foreground">Typing Speed Test</p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative">
            <motion.button
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowThemeMenu(!showThemeMenu)}
            >
              <Palette size={20} className="text-muted-foreground hover:text-primary" />
            </motion.button>
            {showThemeMenu && (
              <motion.div
                className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg p-2 z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id)
                      setShowThemeMenu(false)
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      theme === t.id ? "bg-primary/20 text-primary" : "hover:bg-muted text-foreground"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          <div className="relative">
            <motion.button
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowColorMode(!showColorMode)}
            >
              {colorMode === "dark" ? (
                <Moon size={20} className="text-muted-foreground hover:text-primary" />
              ) : (
                <Sun size={20} className="text-muted-foreground hover:text-primary" />
              )}
            </motion.button>
            {showColorMode && (
              <motion.div
                className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-lg p-2 z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {["light", "dark", "auto"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setColorMode(mode as any)
                      setShowColorMode(false)
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors capitalize ${
                      colorMode === mode ? "bg-primary/20 text-primary" : "hover:bg-muted text-foreground"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          <motion.button
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <SettingsIcon size={20} className="text-muted-foreground hover:text-primary" />
          </motion.button>
          <motion.button
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <User size={20} className="text-muted-foreground hover:text-primary" />
          </motion.button>
        </motion.div>
      </div>
    </header>
  )
}
