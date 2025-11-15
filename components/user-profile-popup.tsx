"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, MapPin, Rocket, Globe, Heart, Phone } from "lucide-react";
import { useUserPreferencesStore } from "@/lib/user-preferences-store";

export default function UserProfilePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const store = useUserPreferencesStore();
  const API_BASE =
    (typeof process !== "undefined" &&
      (process as any).env?.NEXT_PUBLIC_API_URL) ||
    "http://localhost:5002";

  // More defensive initialization
  useEffect(() => {
    // Clear any corrupted localStorage data on first load
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("user-preferences");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (
            !parsed.state?.userProfile ||
            typeof parsed.state.userProfile.hasSeenWelcome !== "boolean"
          ) {
            // Clear corrupted data
            localStorage.removeItem("user-preferences");
            // Reload page to get fresh state
            window.location.reload();
            return;
          }
        }
      } catch (e) {
        // If parsing fails, clear the data
        localStorage.removeItem("user-preferences");
        window.location.reload();
        return;
      }
    }

    const checkSession = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/session`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data?.loggedIn) {
          store.setHasSeenWelcome(true);
          setIsOpen(false);
          return;
        }
      } catch {}
      if (store?.userProfile && store.userProfile.hasSeenWelcome === false) {
        setIsOpen(true);
      }
    };
    checkSession();
  }, []);

  // Don't render if store is not ready
  if (!store || !store.userProfile) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!name.trim() || !mobile.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: name.trim(),
          mobileNumber: mobile.trim(),
          country: location.trim(),
        }),
      });
      if (res.status === 409) {
        setErrorMsg("Mobile number already registered");
        setLoading(false);
        return;
      }
      if (!res.ok) {
        setErrorMsg("Failed to save profile");
        setLoading(false);
        return;
      }
      store.setUserProfileAndWelcome(name.trim(), location.trim());
      setIsOpen(false);
    } catch (e) {
      setErrorMsg("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    store.setHasSeenWelcome(true);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/20 dark:border-gray-700/50"
        >
          {/* Header with icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="text-center mb-8"
          >
            <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Rocket className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Welcome to FastLegend!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Let's personalize your typing experience
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label
                htmlFor="name"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                <User className="w-4 h-4 text-blue-500" />
                What's your name?
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                placeholder="Enter your name"
                required
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label
                htmlFor="mobile"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                <Phone className="w-4 h-4 text-purple-500" />
                What's your mobile number?
              </label>
              <input
                type="text"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                placeholder="Enter your mobile number"
                required
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label
                htmlFor="location"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                <Globe className="w-4 h-4 text-purple-500" />
                Where are you from? (optional)
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                placeholder="City, Country"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-3 pt-4"
            >
              <button
                type="button"
                onClick={handleSkip}
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all font-medium border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-500"
              >
                Skip for now
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all font-medium disabled:opacity-60"
              >
                {loading ? "Saving..." : "Get Started"}
              </button>
            </motion.div>
          </form>
          {errorMsg && (
            <div className="mt-4 text-sm text-red-600 dark:text-red-400">
              {errorMsg}
            </div>
          )}

          {/* Footer tip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800/50"
          >
            <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
              <Heart className="w-4 h-4" />
              <span>
                Your name will appear on the leaderboard when you complete
                typing tests!
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
