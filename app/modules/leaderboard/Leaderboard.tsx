"use client";

import React, {useState, useEffect, useCallback} from "react";
import {useRouter} from "next/navigation";
import {useQuizContext} from "@/app/contexts/QuizContext";
import {supabase} from "@/app/utils/supabase";
import {
  Trophy,
  Zap,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  RotateCcw,
  Settings,
} from "lucide-react";

type TimeFilter = "today" | "week" | "alltime";

type LeaderboardEntry = {
  player_id: string;
  name: string;
  total_points: number;
  games_played: number;
  avg_accuracy: number;
  rank: number;
};

const PAGE_SIZE = 20;

const PODIUM_COLORS = {
  1: {
    border: "border-[#FFD700]",
    bg: "bg-surface-container-high",
    text: "text-primary",
    badge: "bg-gradient-to-br from-[#FFD700] to-[#B8860B]",
    shadow: "shadow-[0_0_30px_rgba(255,215,0,0.3)]",
  },
  2: {
    border: "border-[#C0C0C0]",
    bg: "bg-surface-container-low",
    text: "text-secondary",
    badge: "bg-gradient-to-br from-[#E0E0E0] to-[#757575]",
    shadow: "",
  },
  3: {
    border: "border-[#CD7F32]",
    bg: "bg-surface-container-low",
    text: "text-tertiary",
    badge: "bg-gradient-to-br from-[#CD7F32] to-[#8B4513]",
    shadow: "",
  },
};

function getDateFilter(filter: TimeFilter): string | null {
  const now = new Date();
  if (filter === "today") {
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).toISOString();
  }
  if (filter === "week") {
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(now.getFullYear(), now.getMonth(), diff).toISOString();
  }
  return null; // alltime
}

const Leaderboard = () => {
  const router = useRouter();
  const {playerId, playerName, isAuthReady} = useQuizContext();

  const handleStartQuiz = () => {
    router.push(playerName ? "/choices" : "/");
  };
  const [filter, setFilter] = useState<TimeFilter>("alltime");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    if (!isAuthReady) {
      setLoading(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const dateFrom = getDateFilter(filter);
      const from = page * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      // Fetch quiz results with optional date filter
      let query = supabase
        .from("quiz_results")
        .select("player_id, score, total, points");

      if (dateFrom) {
        query = query.gte("created_at", dateFrom);
      }

      const {data: results, error: resultsError} = await query;

      if (resultsError) throw resultsError;

      // Aggregate by player
      const playerMap = new Map<
        string,
        {
          total_points: number;
          games_played: number;
          total_score: number;
          total_questions: number;
        }
      >();

      for (const r of results || []) {
        const existing = playerMap.get(r.player_id) || {
          total_points: 0,
          games_played: 0,
          total_score: 0,
          total_questions: 0,
        };
        existing.total_points += r.points;
        existing.games_played += 1;
        existing.total_score += r.score;
        existing.total_questions += r.total;
        playerMap.set(r.player_id, existing);
      }

      // Get player names
      const playerIds = Array.from(playerMap.keys());
      if (playerIds.length === 0) {
        setEntries([]);
        setTotalCount(0);
        setLoading(false);
        return;
      }

      const {data: players, error: playersError} = await supabase
        .from("players")
        .select("id, name")
        .in("id", playerIds);

      if (playersError) throw playersError;

      const nameMap = new Map<string, string>();
      for (const p of players || []) {
        nameMap.set(p.id, p.name);
      }

      // Build sorted leaderboard
      const sorted = Array.from(playerMap.entries())
        .map(([pid, stats]) => ({
          player_id: pid,
          name: nameMap.get(pid) || "Anonymous",
          total_points: stats.total_points,
          games_played: stats.games_played,
          avg_accuracy:
            stats.total_questions > 0
              ? Math.round((stats.total_score / stats.total_questions) * 100)
              : 0,
          rank: 0,
        }))
        .sort((a, b) => {
          if (b.total_points !== a.total_points)
            return b.total_points - a.total_points;
          return a.games_played - b.games_played; // fewer games = higher rank
        });

      // Assign ranks
      sorted.forEach((entry, idx) => {
        entry.rank = idx + 1;
      });

      setEntries(sorted.slice(from, to + 1));
      setTotalCount(sorted.length);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load leaderboard"
      );
    } finally {
      setLoading(false);
    }
  }, [filter, page, isAuthReady]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  // Reset page when filter changes
  useEffect(() => {
    setPage(0);
  }, [filter]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // Split into podium (top 3 from page 0) and table entries
  const showPodium = page === 0 && entries.length >= 3;
  const podiumPlayers = showPodium ? entries.slice(0, 3) : [];
  const tablePlayers = showPodium ? entries.slice(3) : entries;

  // Reorder podium: [2nd, 1st, 3rd]
  const podiumOrder = showPodium
    ? [podiumPlayers[1], podiumPlayers[0], podiumPlayers[2]]
    : [];

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body">
      {/* Header */}
      <header className="bg-surface sticky top-0 z-50 flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center p-2 rounded-full hover:bg-surface-container transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-2xl font-bold tracking-tighter text-primary font-headline">
            Quizap
          </span>
        </div>
        <button
          onClick={() => router.push("/settings")}
          className="p-2 rounded-full hover:bg-surface-container transition-all cursor-pointer text-on-surface-variant hover:text-on-surface"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </header>

      <main className="max-w-7xl mx-auto w-full px-6 py-8">
        {/* Title & Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-10 h-10 text-secondary" />
              <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight">
                Leaderboard
              </h1>
            </div>
            <p className="text-on-surface-variant font-medium">
              Ranked against the top minds globally.
            </p>
          </div>
          <div className="bg-surface-container-low p-1.5 rounded-full flex gap-1">
            {(
              [
                {key: "today", label: "Today"},
                {key: "week", label: "This Week"},
                {key: "alltime", label: "All Time"},
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all cursor-pointer ${
                  filter === tab.key
                    ? "bg-primary text-on-primary-container shadow-lg"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-on-surface-variant font-bold">
              Loading rankings...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-32">
            <AlertCircle className="w-12 h-12 text-error mb-4" />
            <p className="text-on-surface-variant font-bold mb-4">{error}</p>
            <button
              onClick={fetchLeaderboard}
              className="btn-primary flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && entries.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32">
            <Trophy className="w-16 h-16 text-on-surface-variant/30 mb-6" />
            <h2 className="font-headline text-2xl font-bold mb-2">
              No rankings yet
            </h2>
            <p className="text-on-surface-variant mb-8">
              Be the first to play and claim the top spot!
            </p>
            <button
              onClick={handleStartQuiz}
              className="btn-primary text-lg flex items-center gap-3"
            >
              START A QUIZ
              <Zap className="w-5 h-5" fill="currentColor" />
            </button>
          </div>
        )}

        {/* Leaderboard Content */}
        {!loading && !error && entries.length > 0 && (
          <>
            {/* Podium (only on first page with 3+ entries) */}
            {showPodium && (
              <div className="grid grid-cols-1 md:grid-cols-3 items-end gap-4 mb-16 px-4">
                {podiumOrder.map((player, idx) => {
                  const rank = (idx === 0 ? 2 : idx === 1 ? 1 : 3) as 1 | 2 | 3;
                  const colors = PODIUM_COLORS[rank];
                  const isFirst = rank === 1;
                  const isMe = player.player_id === playerId;

                  return (
                    <div
                      key={player.player_id}
                      className={`flex flex-col items-center ${
                        isFirst
                          ? "order-1 md:order-2 md:-translate-y-8"
                          : rank === 2
                            ? "order-2 md:order-1"
                            : "order-3"
                      }`}
                    >
                      <div className="relative mb-6">
                        {isFirst && (
                          <Trophy className="absolute -top-8 left-1/2 -translate-x-1/2 w-8 h-8 text-yellow-400" />
                        )}
                        <div
                          className={`${isFirst ? "w-32 h-32" : "w-24 h-24"} rounded-full ${colors.border} border-4 p-1 ${colors.shadow}
                            bg-surface-container flex items-center justify-center ${isMe ? "ring-4 ring-primary/40" : ""}`}
                        >
                          <span className="font-headline font-extrabold text-2xl text-on-surface-variant">
                            {player.name.charAt(0)}
                          </span>
                        </div>
                        <div
                          className={`absolute -bottom-2 -right-2 ${isFirst ? "w-10 h-10 text-sm" : "w-8 h-8 text-xs"}
                            ${colors.badge} rounded-full flex items-center justify-center text-on-primary-fixed font-black shadow-lg`}
                        >
                          {rank}
                        </div>
                      </div>
                      <div
                        className={`text-center w-full ${colors.bg} ${isFirst ? "p-8 border-t-4 border-primary shadow-2xl" : "p-6 border-t-2 border-outline-variant/20"} rounded-t-3xl`}
                      >
                        <p
                          className={`font-headline ${isFirst ? "font-extrabold text-2xl" : "font-bold text-lg"} mb-1`}
                        >
                          {isMe ? `You (${player.name})` : player.name}
                        </p>
                        <p
                          className={`${colors.text} ${isFirst ? "font-black text-4xl" : "font-bold text-2xl"} mb-2`}
                        >
                          {player.total_points.toLocaleString()}{" "}
                          <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">
                            Pts
                          </span>
                        </p>
                        <div className="text-xs text-on-surface-variant uppercase font-bold tracking-tighter">
                          {player.games_played} Quizzes Played
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Table (desktop) */}
            {tablePlayers.length > 0 && (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block bg-surface-container rounded-[1rem] overflow-hidden border border-outline-variant/10 shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface-container-high text-on-surface-variant uppercase text-[11px] font-black tracking-widest border-b border-outline-variant/20">
                          <th className="px-8 py-5">Rank</th>
                          <th className="px-6 py-5">Player</th>
                          <th className="px-6 py-5">Score</th>
                          <th className="px-6 py-5">Played</th>
                          <th className="px-6 py-5 text-right">Avg Accuracy</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/5">
                        {tablePlayers.map((player) => {
                          const isMe = player.player_id === playerId;
                          return (
                            <tr
                              key={player.player_id}
                              className={
                                isMe
                                  ? "bg-primary/10 border-l-4 border-primary"
                                  : "hover:bg-surface-bright transition-colors"
                              }
                            >
                              <td
                                className={`px-8 py-4 font-bold ${isMe ? "text-primary font-black" : "text-on-surface-variant"}`}
                              >
                                {player.rank}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                                    ${isMe ? "bg-primary text-on-primary-fixed border-2 border-primary" : "bg-surface-container-high text-on-surface-variant"}`}
                                  >
                                    {player.name.charAt(0)}
                                  </div>
                                  <div className="flex flex-col">
                                    <span
                                      className={
                                        isMe ? "font-black" : "font-bold"
                                      }
                                    >
                                      {isMe
                                        ? `You (${player.name})`
                                        : player.name}
                                    </span>
                                    {isMe && (
                                      <span className="text-[10px] uppercase tracking-tighter text-primary-fixed-dim font-black">
                                        Climbing fast!
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td
                                className={`px-6 py-4 font-bold ${isMe ? "text-primary font-black" : "text-primary"}`}
                              >
                                {player.total_points.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 text-on-surface-variant">
                                {player.games_played}
                              </td>
                              <td className="px-6 py-4 text-right text-secondary font-bold">
                                {player.avg_accuracy}%
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden flex flex-col gap-3">
                  {tablePlayers.map((player) => {
                    const isMe = player.player_id === playerId;
                    return (
                      <div
                        key={player.player_id}
                        className={`rounded-[1rem] p-4 ${
                          isMe
                            ? "bg-primary/10 border-2 border-primary"
                            : "bg-surface-container border border-outline-variant/10"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className={`text-lg font-black w-8 text-center ${isMe ? "text-primary" : "text-on-surface-variant"}`}
                          >
                            {player.rank}
                          </span>
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                            ${isMe ? "bg-primary text-on-primary-fixed" : "bg-surface-container-high text-on-surface-variant"}`}
                          >
                            {player.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`font-bold truncate ${isMe ? "text-primary" : ""}`}
                            >
                              {isMe ? `You (${player.name})` : player.name}
                            </p>
                          </div>
                          <span className="text-primary font-black text-lg">
                            {player.total_points.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-on-surface-variant font-bold ml-11">
                          <span>{player.games_played} games</span>
                          <span className="text-secondary">
                            {player.avg_accuracy}% accuracy
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="p-3 rounded-full bg-surface-container hover:bg-surface-bright transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-bold text-on-surface-variant">
                  Page {page + 1} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setPage((p) => Math.min(totalPages - 1, p + 1))
                  }
                  disabled={page >= totalPages - 1}
                  className="p-3 rounded-full bg-surface-container hover:bg-surface-bright transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}

        {/* CTA */}
        <div className="mt-12 mb-8 flex justify-center">
          <div className="glass-card p-8 rounded-[2rem] w-full max-w-2xl border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-headline text-2xl font-bold mb-1">
                Play to Climb!
              </h3>
              <p className="text-on-surface-variant">
                Start a new quiz to earn points and climb the ranks.
              </p>
            </div>
            <button
              onClick={handleStartQuiz}
              className="btn-primary text-lg flex items-center gap-3 whitespace-nowrap"
            >
              START NEW QUIZ
              <Zap className="w-5 h-5" fill="currentColor" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
