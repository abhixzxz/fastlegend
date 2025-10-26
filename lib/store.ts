import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Theme = "spotify" | "ocean" | "sunset" | "forest" | "cyberpunk"
export type ColorMode = "light" | "dark" | "auto"

interface ThemeState {
  theme: Theme
  colorMode: ColorMode
  setTheme: (theme: Theme) => void
  setColorMode: (mode: ColorMode) => void
}

interface UserStats {
  totalTests: number
  bestWPM: number
  averageWPM: number
  bestAccuracy: number
  totalTimeTyped: number
}

interface AppState {
  stats: UserStats
  updateStats: (newStats: Partial<UserStats>) => void
  resetStats: () => void
}

const defaultStats: UserStats = {
  totalTests: 0,
  bestWPM: 0,
  averageWPM: 0,
  bestAccuracy: 0,
  totalTimeTyped: 0,
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "ocean",
      colorMode: "dark",
      setTheme: (theme) => set({ theme }),
      setColorMode: (colorMode) => set({ colorMode }),
    }),
    {
      name: "fastlegend-theme",
    },
  ),
)

export const useStatsStore = create<AppState>()(
  persist(
    (set) => ({
      stats: defaultStats,
      updateStats: (newStats) =>
        set((state) => ({
          stats: { ...state.stats, ...newStats },
        })),
      resetStats: () => set({ stats: defaultStats }),
    }),
    {
      name: "fastlegend-stats",
    },
  ),
)
