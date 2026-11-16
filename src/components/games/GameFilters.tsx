
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { GameFilters as GameFiltersType, Genre, Platform } from "../../types";

interface GameFiltersProps {
  filters: GameFiltersType;
  onChange: (filters: GameFiltersType) => void;
}

const genres: (Genre | "All")[] = [
  "All",
  "Action",
  "Adventure",
  "RPG",
  "Sports",
  "Racing",
  "Shooter",
  "Simulation",
  "Strategy",
  "Puzzle",
  "Fighting",
];

const platforms: (Platform | "All")[] = [
  "All",
  "PC",
  "PlayStation",
  "Xbox",
  "Switch",
];

export default function GameFilters({
  filters,
  onChange,
}: GameFiltersProps) {
  const update = (key: keyof GameFiltersType, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const hasFilters =
    filters.search !== "" ||
    filters.genre !== "All" ||
    filters.platform !== "All" ||
    filters.sortBy !== "title";

  return (
    <div className="space-y-4 rounded-2xl border border-white/[0.07] bg-[#15151f] p-4">
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            value={filters.search}
            onChange={(event) => update("search", event.target.value)}
            placeholder="Search games by title or developer..."
            className="w-full rounded-xl border border-white/10 bg-[#0e0e16] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-violet-500"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={filters.genre}
            onChange={(event) => update("genre", event.target.value)}
            className="min-w-32 flex-1 rounded-xl border border-white/10 bg-[#0e0e16] px-3 py-3 text-sm text-gray-300 outline-none focus:border-violet-500"
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre === "All" ? "All genres" : genre}
              </option>
            ))}
          </select>

          <select
            value={filters.platform}
            onChange={(event) => update("platform", event.target.value)}
            className="min-w-32 flex-1 rounded-xl border border-white/10 bg-[#0e0e16] px-3 py-3 text-sm text-gray-300 outline-none focus:border-violet-500"
          >
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform === "All" ? "All platforms" : platform}
              </option>
            ))}
          </select>

          <select
            value={filters.sortBy}
            onChange={(event) => update("sortBy", event.target.value)}
            className="min-w-32 flex-1 rounded-xl border border-white/10 bg-[#0e0e16] px-3 py-3 text-sm text-gray-300 outline-none focus:border-violet-500"
          >
            <option value="title">Sort: Title</option>
            <option value="rating">Sort: Rating</option>
            <option value="releaseDate">Sort: Release date</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
        <span className="flex items-center gap-2 text-xs text-gray-500">
          <SlidersHorizontal size={14} />
          Refine your game collection
        </span>

        {hasFilters && (
          <button
            type="button"
            onClick={() =>
              onChange({
                search: "",
                genre: "All",
                platform: "All",
                sortBy: "title",
              })
            }
            className="flex items-center gap-1 text-xs font-medium text-violet-400 transition hover:text-violet-300"
          >
            <X size={13} />
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
