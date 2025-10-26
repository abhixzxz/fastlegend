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

// Dummy data for leaderboard
const dummyLeaderboardData: LeaderboardEntry[] = [
  {
    id: "1",
    name: "Abhiraj K",
    location: "Kottayam, Kerala",
    wpm: 156,
    accuracy: 98.5,
    testsCompleted: 342,
    bestTime: 15,
    joinDate: "2024-01-15",
    rank: 1,
  },
  {
    id: "2",
    name: "Adarsh Menon",
    location: "Ernakulam, Kerala",
    wpm: 142,
    accuracy: 96.2,
    testsCompleted: 289,
    bestTime: 30,
    joinDate: "2024-02-03",
    rank: 2,
  },
  {
    id: "3",
    name: "Dinto Thomas",
    location: "Thrissur, Kerala",
    wpm: 138,
    accuracy: 97.8,
    testsCompleted: 456,
    bestTime: 60,
    joinDate: "2024-01-28",
    rank: 3,
  },
  {
    id: "4",
    name: "Ashish Babu",
    location: "Kozhikode, Kerala",
    wpm: 134,
    accuracy: 95.1,
    testsCompleted: 198,
    bestTime: 15,
    joinDate: "2024-03-10",
    rank: 4,
  },
  {
    id: "5",
    name: "Akku Mathew",
    location: "Alappuzha, Kerala",
    wpm: 129,
    accuracy: 94.7,
    testsCompleted: 267,
    bestTime: 30,
    joinDate: "2024-02-15",
    rank: 5,
  },
  {
    id: "6",
    name: "Ron Thomas",
    location: "Trivandrum, Kerala",
    wpm: 125,
    accuracy: 96.9,
    testsCompleted: 334,
    bestTime: 60,
    joinDate: "2024-01-20",
    rank: 6,
  },
  {
    id: "7",
    name: "Sibu Varghese",
    location: "Pathanamthitta, Kerala",
    wpm: 121,
    accuracy: 93.8,
    testsCompleted: 156,
    bestTime: 15,
    joinDate: "2024-03-05",
    rank: 7,
  },
  {
    id: "8",
    name: "Jithin Raj",
    location: "Palakkad, Kerala",
    wpm: 118,
    accuracy: 95.4,
    testsCompleted: 423,
    bestTime: 30,
    joinDate: "2024-01-12",
    rank: 8,
  },
];

export default function LeaderboardPage() {
  const { userProfile, bestWPM, bestAccuracy, totalTests } =
    useUserPreferencesStore();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);

  useEffect(() => {
    // Add current user to leaderboard if they have completed tests
    let updatedData = [...dummyLeaderboardData];

    if (userProfile?.hasCompletedTest && (bestWPM > 0 || totalTests > 0)) {
      const userEntry: LeaderboardEntry = {
        id: "current-user",
        name: userProfile.name || "Anonymous",
        location: userProfile.location || "Unknown",
        wpm: bestWPM,
        accuracy: bestAccuracy,
        testsCompleted: totalTests,
        bestTime: 60,
        joinDate: new Date().toISOString().split("T")[0],
        rank: 0, // Will be calculated
      };

      // Add user entry and sort by WPM
      updatedData.push(userEntry);
      updatedData.sort((a, b) => b.wpm - a.wpm);

      // Update ranks
      updatedData = updatedData.map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }));

      // Find current user's rank
      const userRank =
        updatedData.find((entry) => entry.id === "current-user")?.rank || null;
      setCurrentUserRank(userRank);
    }

    setLeaderboardData(updatedData);
  }, [userProfile, bestWPM, bestAccuracy, totalTests]);

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
                {Math.max(...leaderboardData.map((d) => d.wpm))}
              </div>
              <div className="text-sm text-muted-foreground">Highest WPM</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">
                {Math.max(...leaderboardData.map((d) => d.accuracy)).toFixed(1)}
                %
              </div>
              <div className="text-sm text-muted-foreground">Best Accuracy</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">
                {leaderboardData.reduce((sum, d) => sum + d.testsCompleted, 0)}
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
