
import {
  Gamepad2,
  Pencil,
  Trophy,
  Trash2,
  Clock3,
  Target,
} from "lucide-react";
import type { Player } from "../../types";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

interface PlayerCardProps {
  player: Player;
  onEdit: (player: Player) => void;
  onDelete: (player: Player) => void;
}

const skillVariants = {
  Beginner: "info",
  Intermediate: "purple",
  Advanced: "warning",
  Professional: "success",
} as const;

export default function PlayerCard({
  player,
  onEdit,
  onDelete,
}: PlayerCardProps) {
  const totalMatches = player.wins + player.losses;
  const winRate =
    totalMatches > 0 ? Math.round((player.wins / totalMatches) * 100) : 0;

  return (
    <article className="group rounded-2xl border border-white/[0.07] bg-[#15151f] p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-950/20">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={player.avatar}
              alt={player.username}
              className="h-14 w-14 rounded-2xl border border-white/10 object-cover"
            />
            <span
              className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[#15151f] ${
                player.isActive ? "bg-emerald-400" : "bg-gray-500"
              }`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-white">{player.username}</h3>
            <p className="mt-1 text-xs text-gray-500">{player.email}</p>
          </div>
        </div>

        <div className="flex gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onEdit(player)}
            aria-label={`Edit ${player.username}`}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-violet-500/10 hover:text-violet-400"
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(player)}
            aria-label={`Delete ${player.username}`}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Badge variant={skillVariants[player.skillLevel]}>
          {player.skillLevel}
        </Badge>
        <Badge variant="neutral">{player.platform}</Badge>
        <Badge variant={player.isActive ? "success" : "neutral"} dot>
          {player.isActive ? "Online" : "Offline"}
        </Badge>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 border-y border-white/[0.07] py-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-gray-500">
            Games
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-lg font-bold text-white">
            <Gamepad2 size={14} className="text-violet-400" />
            {player.gamesPlayed}
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wider text-gray-500">
            Hours
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-lg font-bold text-white">
            <Clock3 size={14} className="text-blue-400" />
            {player.hoursPlayed.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wider text-gray-500">
            Win rate
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-lg font-bold text-emerald-400">
            <Target size={14} />
            {winRate}%
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">Match record</p>
          <p className="mt-1 text-sm font-semibold text-white">
            <span className="text-emerald-400">{player.wins}W</span>
            <span className="mx-1.5 text-gray-600">/</span>
            <span className="text-red-400">{player.losses}L</span>
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Trophy size={14} className="text-amber-400" />
          Joined{" "}
          {new Date(player.joinedAt).toLocaleDateString("en-GB", {
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>

      <div className="mt-4 flex gap-2 sm:hidden">
        <Button
          size="sm"
          variant="outline"
          fullWidth
          onClick={() => onEdit(player)}
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="danger"
          fullWidth
          onClick={() => onDelete(player)}
        >
          Delete
        </Button>
      </div>
    </article>
  );
}
