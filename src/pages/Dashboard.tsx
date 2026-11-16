
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Gamepad2,
  Users,
  UserCheck,
  Star,
  ArrowUpRight,
  Plus,
  Library,
  TrendingUp,
  Clock3,
  ChevronRight,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchGames } from "../features/games/gamesSlice";
import Leaderboard from "../components/players/Leaderboard";
import Badge from "../components/ui/Badge";
import Loader from "../components/ui/Loader";

const genreProgressColors: Record<string, string> = {
  Action: "accent-violet-500",
  Adventure: "accent-blue-500",
  RPG: "accent-fuchsia-500",
  Sports: "accent-emerald-500",
  Racing: "accent-amber-500",
  Shooter: "accent-red-500",
  Simulation: "accent-cyan-500",
  Strategy: "accent-indigo-500",
  Puzzle: "accent-pink-500",
  Fighting: "accent-orange-500",
};

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { games, loading, error } = useAppSelector((state) => state.games);
  const players = useAppSelector((state) => state.players.players);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  const activePlayers = players.filter((player) => player.isActive).length;

  const averageRating =
    games.length > 0
      ? games.reduce((total, game) => total + game.rating, 0) / games.length
      : 0;

  const genreCounts = games.reduce<Record<string, number>>((counts, game) => {
    counts[game.genre] = (counts[game.genre] ?? 0) + 1;
    return counts;
  }, {});

  const genres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const maxGenreCount = Math.max(...genres.map(([, count]) => count), 1);

  const recentGames = [...games]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 4);

  const popularGames = [...games]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const stats = [
    {
      label: "Total Games",
      value: games.length.toString(),
      description: "In your collection",
      icon: Gamepad2,
      color: "text-violet-600 dark:text-violet-400",
      background: "bg-violet-500/10",
    },
    {
      label: "Registered Players",
      value: players.length.toString(),
      description: "Community members",
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      background: "bg-blue-500/10",
    },
    {
      label: "Active Players",
      value: activePlayers.toString(),
      description: "Currently marked active",
      icon: UserCheck,
      color: "text-emerald-600 dark:text-emerald-400",
      background: "bg-emerald-500/10",
    },
    {
      label: "Average Rating",
      value: averageRating.toFixed(1),
      description: "Out of 10.0",
      icon: Star,
      color: "text-amber-600 dark:text-amber-400",
      background: "bg-amber-500/10",
    },
  ];

  if (loading && games.length === 0) {
    return <Loader message="Loading your gaming dashboard..." />;
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-8">
      {/* Welcome section */}
      <section className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-[#21163b] via-[#17152c] to-[#11111a] p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-28 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 right-1/3 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <Badge variant="purple" dot>
              Admin overview
            </Badge>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Your gaming world,{" "}
              <span className="text-violet-400">at a glance.</span>
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-6 text-gray-400">
              Manage your game collection, monitor your players and keep your
              gaming community organised from one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/games"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:bg-violet-500"
            >
              <Plus size={17} />
              Add a Game
            </Link>

            <Link
              to="/players"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
            >
              <Users size={17} />
              View Players
            </Link>
          </div>
        </div>
      </section>

      {/* Error state */}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-violet-300 dark:border-white/[0.07] dark:bg-[#15151f] dark:hover:border-violet-500/20"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.background} ${stat.color}`}
                >
                  <Icon size={21} />
                </div>
                <ArrowUpRight
                  size={17}
                  className="text-slate-400 dark:text-gray-600"
                />
              </div>

              <p className="mt-5 text-sm text-slate-500 dark:text-gray-500">
                {stat.label}
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-slate-400 dark:text-gray-600">
                {stat.description}
              </p>
            </article>
          );
        })}
      </section>

      {/* Collection insights and leaderboard */}
      <section className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-white/[0.07] dark:bg-[#15151f]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Collection insights
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-gray-500">
                Your games grouped by genre
              </p>
            </div>

            <div className="rounded-xl bg-violet-500/10 p-2.5 text-violet-600 dark:text-violet-400">
              <TrendingUp size={19} />
            </div>
          </div>

          {genres.length > 0 ? (
            <div className="mt-7 space-y-5">
              {genres.map(([genre, count]) => (
                <div key={genre}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 dark:text-gray-300">
                      {genre}
                    </span>
                    <span className="text-xs tabular-nums text-slate-500 dark:text-gray-500">
                      {count} {count === 1 ? "game" : "games"}
                    </span>
                  </div>

                  <progress
                    className={`h-2 w-full overflow-hidden rounded-full ${genreProgressColors[genre] ?? "accent-violet-500"}`}
                    value={count}
                    max={maxGenreCount}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Library
                className="mx-auto text-slate-400 dark:text-gray-600"
                size={30}
              />
              <p className="mt-3 text-sm text-slate-500 dark:text-gray-400">
                Your collection is empty.
              </p>
              <Link
                to="/games"
                className="mt-2 inline-block text-xs font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
              >
                Add your first game
              </Link>
            </div>
          )}
        </article>

        <Leaderboard players={players} />
      </section>

      {/* Recently added games */}
      <section className="rounded-2xl border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#15151f]">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 sm:px-6 dark:border-white/[0.07]">
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Recently added games
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-gray-500">
              The latest additions to your collection
            </p>
          </div>

          <Link
            to="/games"
            className="flex items-center gap-1 text-xs font-semibold text-violet-600 transition hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
          >
            View library <ChevronRight size={15} />
          </Link>
        </div>

        {recentGames.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-white/[0.05]">
            {recentGames.map((game) => (
              <div
                key={game.id}
                className="flex items-center gap-3 px-5 py-4 transition hover:bg-slate-50 sm:gap-4 sm:px-6 dark:hover:bg-white/[0.02]"
              >
                <img
                  src={game.cover}
                  alt={game.title}
                  className="h-14 w-12 shrink-0 rounded-lg object-cover sm:h-16 sm:w-14"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {game.title}
                  </h3>
                  <p className="mt-1 truncate text-xs text-slate-500 dark:text-gray-500">
                    {game.developer} · {game.genre}
                  </p>
                </div>

                <div className="hidden items-center gap-1.5 text-xs text-amber-500 sm:flex">
                  <Star size={13} fill="currentColor" />
                  {game.rating.toFixed(1)}
                </div>

                <Badge
                  variant={game.status === "Available" ? "success" : "warning"}
                >
                  {game.status}
                </Badge>

                <div className="hidden items-center gap-1 text-xs text-slate-400 md:flex dark:text-gray-600">
                  <Clock3 size={13} />
                  {new Date(game.releaseDate).getFullYear()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center text-sm text-slate-500 dark:text-gray-500">
            No games have been added yet.
          </div>
        )}
      </section>

      {/* Top-rated games */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Top-rated games
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-gray-500">
              Highest-rated titles in your collection
            </p>
          </div>

          <Link
            to="/games"
            className="text-xs font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
          >
            Explore all
          </Link>
        </div>

        {popularGames.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {popularGames.map((game, index) => (
              <article
                key={game.id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#15151f]"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={game.cover}
                    alt={game.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-[#15151f]" />
                  <span className="absolute left-3 top-3 rounded-lg border border-white/10 bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
                    #{index + 1} TOP RATED
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                      {game.title}
                    </h3>
                    <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-amber-500">
                      <Star size={13} fill="currentColor" />
                      {game.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-gray-500">
                    {game.genre} · {game.platform}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 dark:border-white/[0.07] dark:bg-[#15151f] dark:text-gray-500">
            Add games to see your top-rated titles here.
          </div>
        )}
      </section>
    </div>
  );
}
