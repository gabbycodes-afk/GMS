
import { CalendarDays, Monitor, Pencil, Star, Trash2 } from "lucide-react";
import type { Game } from "../../types";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

interface GameCardProps {
  game: Game;
  onEdit: (game: Game) => void;
  onDelete: (game: Game) => void;
}

export default function GameCard({
  game,
  onEdit,
  onDelete,
}: GameCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-[#15151f] transition duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-950/20">
      <div className="relative h-48 overflow-hidden">
        <img
          src={game.cover}
          alt={game.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#15151f] via-black/10 to-transparent" />

        <div className="absolute left-3 top-3">
          <Badge
            variant={game.status === "Available" ? "success" : "warning"}
            dot
          >
            {game.status}
          </Badge>
        </div>

        <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onEdit(game)}
            aria-label={`Edit ${game.title}`}
            className="rounded-lg bg-black/60 p-2 text-white backdrop-blur transition hover:bg-violet-600"
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(game)}
            aria-label={`Delete ${game.title}`}
            className="rounded-lg bg-black/60 p-2 text-white backdrop-blur transition hover:bg-red-500"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div>
          <div className="mb-2 flex items-start justify-between gap-3">
            <h3 className="line-clamp-1 font-semibold text-white">
              {game.title}
            </h3>
            <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-amber-400">
              <Star size={13} fill="currentColor" />
              {game.rating.toFixed(1)}
            </span>
          </div>

          <p className="text-xs text-gray-500">{game.developer}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="purple">{game.genre}</Badge>
          <Badge variant="neutral">{game.platform}</Badge>
        </div>

        <div className="flex items-center justify-between border-t border-white/[0.07] pt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <Monitor size={13} />
            {game.platform}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays size={13} />
            {new Date(game.releaseDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="flex gap-2 sm:hidden">
          <Button
            size="sm"
            variant="outline"
            fullWidth
            onClick={() => onEdit(game)}
          >
            <Pencil size={13} /> Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            fullWidth
            onClick={() => onDelete(game)}
          >
            <Trash2 size={13} /> Delete
          </Button>
        </div>
      </div>
    </article>
  );
}
