import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserProfile {
  name: string
  location: string
  hasSeenWelcome: boolean
  hasCompletedTest: boolean
}

interface UserPreferences {
  // Test settings
  defaultDuration: number
  defaultMode: 'time' | 'words'
  theme: 'spotify' | 'ocean' | 'sunset' | 'forest' | 'cyberpunk'
  colorMode: 'light' | 'dark' | 'auto'
  
  // User profile
  userProfile: UserProfile
  
  // Test history
  bestWPM: number
  bestAccuracy: number
  totalTests: number
  
  // Actions
  setDefaultDuration: (duration: number) => void
  setDefaultMode: (mode: 'time' | 'words') => void
  setTheme: (theme: 'spotify' | 'ocean' | 'sunset' | 'forest' | 'cyberpunk') => void
  setColorMode: (mode: 'light' | 'dark' | 'auto') => void
  setUserProfile: (name: string, location: string) => void
  setHasSeenWelcome: (hasSeen: boolean) => void
  setUserProfileAndWelcome: (name: string, location: string) => void
  updateBestStats: (wpm: number, accuracy: number) => void
  incrementTotalTests: () => void
}

const defaultUserProfile: UserProfile = {
  name: '',
  location: '',
  hasSeenWelcome: false,
  hasCompletedTest: false
}

export const useUserPreferencesStore = create<UserPreferences>()(
  persist(
    (set, get) => ({
      // Default values
      defaultDuration: 60,
      defaultMode: 'time',
      theme: 'ocean',
      colorMode: 'auto',
      userProfile: defaultUserProfile,
      bestWPM: 0,
      bestAccuracy: 0,
      totalTests: 0,
      
      // Actions
      setDefaultDuration: (duration) => set({ defaultDuration: duration }),
      setDefaultMode: (mode) => set({ defaultMode: mode }),
      setTheme: (theme) => set({ theme }),
      setColorMode: (mode) => set({ colorMode: mode }),
      setUserProfile: (name, location) => set((state) => ({
        userProfile: {
          ...state.userProfile,
          name: name,
          location: location
        }
      })),
      setHasSeenWelcome: (hasSeen) => set((state) => ({
        userProfile: {
          ...state.userProfile,
          hasSeenWelcome: hasSeen
        }
      })),
      setUserProfileAndWelcome: (name, location) => set((state) => ({
        userProfile: {
          ...state.userProfile,
          name: name,
          location: location,
          hasSeenWelcome: true
        }
      })),
      updateBestStats: (wpm, accuracy) => set((state) => ({
        bestWPM: Math.max(state.bestWPM, wpm),
        bestAccuracy: Math.max(state.bestAccuracy, accuracy)
      })),
      incrementTotalTests: () => set((state) => ({ 
        totalTests: state.totalTests + 1 
      }))
    }),
    {
      name: 'user-preferences',
      // Add migration to handle old data format
      migrate: (persistedState: any, version: number) => {
        // Handle migration from old format
        if (persistedState && !persistedState.userProfile) {
          return {
            ...persistedState,
            userProfile: defaultUserProfile
          }
        }
        return persistedState
      }
    }
  )
)