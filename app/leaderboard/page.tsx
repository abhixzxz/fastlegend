"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, User, Target, Clock, TrendingUp, Medal } from "lucide-react";
import { useUserPreferencesStore } from "@/lib/user-preferences-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface LeaderboardEntry {
  id: string;
  name: string;
  location: string;
  wpm: number;
  accuracy: number;
  testsCompleted: number;
  bestTime: number;
  joinDate: string;
  rank: number;
}
const API_BASE =
  (typeof process !== "undefined" &&
    (process as any).env?.NEXT_PUBLIC_API_URL) ||
  "https://fastlegendbackend.onrender.com";

export default function LeaderboardPage() {
  const { userProfile, bestWPM, bestAccuracy, totalTests } =
    useUserPreferencesStore();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/leaderboard`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!cancelled && Array.isArray(data?.entries)) {
          const entries: LeaderboardEntry[] = data.entries;
          setLeaderboardData(entries);
          const my = entries.find((e) => e.name === (userProfile?.name || ""));
          setCurrentUserRank(my ? my.rank : null);
        }
      } catch {}
    };
    load();
    const id = setInterval(load, 30000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [userProfile?.name]);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "bg-yellow-500 text-yellow-900";
    if (rank === 2) return "bg-gray-400 text-gray-900";
    if (rank === 3) return "bg-orange-600 text-orange-900";
    return "bg-primary/20 text-primary";
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-4 h-4 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-4 h-4 text-gray-400" />;
    if (rank === 3) return <Medal className="w-4 h-4 text-orange-600" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Global Leaderboard
            </h1>
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compete with typists worldwide and climb the ranks with your speed
            and accuracy
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {leaderboardData.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Players</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">
                {leaderboardData.length
                  ? Math.max(...leaderboardData.map((d) => d.wpm))
                  : 0}
              </div>
              <div className="text-sm text-muted-foreground">Highest WPM</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">
                {leaderboardData.length
                  ? Math.max(...leaderboardData.map((d) => d.accuracy)).toFixed(
                      1
                    )
                  : (0).toFixed(1)}
                %
              </div>
              <div className="text-sm text-muted-foreground">Best Accuracy</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">
                {leaderboardData.length
                  ? leaderboardData.reduce(
                      (sum, d) => sum + d.testsCompleted,
                      0
                    )
                  : 0}
              </div>
              <div className="text-sm text-muted-foreground">Total Tests</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Current User Stats */}
        {currentUserRank && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Your Ranking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-primary">
                      #{currentUserRank}
                    </div>
                    <div>
                      <div className="font-semibold">
                        {userProfile?.name || "Anonymous"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {userProfile?.location || "Unknown"}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{bestWPM} WPM</div>
                    <div className="text-sm text-muted-foreground">
                      {bestAccuracy.toFixed(1)}% accuracy
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent>
              {leaderboardData.length === 0 ? (
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                    No Scores Yet
                  </h3>
                  <p className="text-muted-foreground">
                    Be the first to complete a typing test and appear on the
                    leaderboard!
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {leaderboardData.slice(0, 10).map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className={`p-4 rounded-lg border transition-all ${
                        entry.id === "current-user"
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 bg-card/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Badge className={getRankBadge(entry.rank)}>
                              #{entry.rank}
                            </Badge>
                            {getRankIcon(entry.rank)}
                          </div>
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold">
                              {entry.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold">{entry.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {entry.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-right">
                          <div>
                            <div className="text-lg font-bold text-primary">
                              {entry.wpm} WPM
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Speed
                            </div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-green-500">
                              {entry.accuracy.toFixed(1)}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Accuracy
                            </div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-orange-500">
                              {entry.testsCompleted}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Tests
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            {!userProfile?.hasCompletedTest
              ? "Complete your first test to join the leaderboard!"
              : "Keep practicing to improve your ranking!"}
          </p>
          <Button
            onClick={() => (window.location.href = "/")}
            className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50"
          >
            {userProfile?.hasCompletedTest
              ? "Take Another Test"
              : "Start Your First Test"}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
