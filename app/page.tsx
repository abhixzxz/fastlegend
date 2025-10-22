"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/header";
import TypingTest from "@/components/typing-test";
import ResultsScreen from "@/components/results-screen";
import Settings from "@/components/settings";

export default function Home() {
  const [testState, setTestState] = useState<"idle" | "typing" | "results">(
    "idle"
  );
  const [testConfig, setTestConfig] = useState({
    duration: 60,
    mode: "time" as const,
  });
  const [results, setResults] = useState<any>(null);

  const handleStartTest = (config: any) => {
    setTestConfig(config);
    setTestState("typing");
  };

  const handleTestComplete = (testResults: any) => {
    setResults(testResults);
    setTestState("results");
  };

  const handleRetry = () => {
    setTestState("idle");
    setResults(null);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <meta
        name="google-site-verification"
        content="86qviRUa8WRVue3dDj0XZ1Y7shbOMUTnui-bzmSPJ5g"
      />
      <Header />

      <div className="container mx-auto px-4 py-8 md:py-16">
        <AnimatePresence mode="wait">
          {testState === "idle" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Settings onStartTest={handleStartTest} />
            </motion.div>
          )}

          {testState === "typing" && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <TypingTest config={testConfig} onComplete={handleTestComplete} />
            </motion.div>
          )}

          {testState === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ResultsScreen results={results} onRetry={handleRetry} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
