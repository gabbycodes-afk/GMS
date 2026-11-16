
import { Crown, Medal, Trophy } from "lucide-react";
import type { Player } from "../../types";
import Badge from "../ui/Badge";

interface LeaderboardProps {
  players: Player[];
}

const rankStyles = [
  {
    icon: Crown,
    color: "text-amber-400",
    background: "bg-amber-400/10",
    label: "1st",
  },
  {
    icon: Medal,
    color: "text-gray-300",
    background: "bg-gray-400/10",
    label: "2nd",
  },
  {
    icon: Medal,
    color: "text-orange-400",
    background: "bg-orange-400/10",
    label: "3rd",
  },
];

export default function Leaderboard({ players }: LeaderboardProps) {
  const rankedPlayers = [...players]
    .sort((a, b) => b.wins - a.wins)
    .slice(0, 5);

  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#15151f]">
      <div className="flex items-center justify-between border-b border-white/[0.07] p-5">
        <div>
          <h2 className="font-semibold text-white">Top Players</h2>
          <p className="mt-1 text-xs text-gray-500">
            Ranked by total victories
          </p>
        </div>

        <div className="rounded-xl bg-violet-500/10 p-2.5 text-violet-400">
          <Trophy size={19} />
        </div>
      </div>

      <div className="divide-y divide-white/[0.05]">
        {rankedPlayers.length > 0 ? (
          rankedPlayers.map((player, index) => {
            const rank = rankStyles[index];
            const RankIcon = rank?.icon;
            const totalMatches = player.wins + player.losses;
            const winRate =
              totalMatches > 0
                ? Math.round((player.wins / totalMatches) * 100)
                : 0;

            return (
              <div
                key={player.id}
                className="flex items-center gap-3 px-5 py-4 transition hover:bg-white/[0.02]"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                    rank?.background ?? "bg-white/5"
                  }`}
                >
                  {RankIcon ? (
                    <RankIcon size={17} className={rank.color} />
                  ) : (
                    <span className="text-xs font-bold text-gray-400">
                      {index + 1}
                    </span>
                  )}
                </div>

                <img
                  src={player.avatar}
                  alt={player.username}
                  className="h-10 w-10 rounded-xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">
                    {player.username}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {player.wins} victories
                  </p>
                </div>

                <div className="text-right">
                  <Badge variant="success">{winRate}%</Badge>
                  <p className="mt-1 text-[10px] text-gray-500">Win rate</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-sm text-gray-500">
            No players available yet.
          </div>
        )}
      </div>
    </section>
  );
}
