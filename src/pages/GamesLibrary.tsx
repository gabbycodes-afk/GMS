
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Gamepad2,
  Pencil,
  Trash2,
  Star,
  Monitor,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addGame,
  deleteGame,
  fetchGames,
  updateGame,
} from "../features/games/gamesSlice";
import GameCard from "../components/games/GameCard";
import GameForm from "../components/games/GameForm";
import GameFilters from "../components/games/GameFilters";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Loader from "../components/ui/Loader";
import type { Game, GameFilters as GameFiltersType, GameFormData } from "../types";

const initialFilters: GameFiltersType = {
  search: "",
  genre: "All",
  platform: "All",
  sortBy: "title",
};

export default function GamesLibrary() {
  const dispatch = useAppDispatch();
  const { games, loading, error } = useAppSelector((state) => state.games);

  const [filters, setFilters] = useState<GameFiltersType>(initialFilters);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [deletingGame, setDeletingGame] = useState<Game | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (games.length === 0) {
      dispatch(fetchGames());
    }
  }, [dispatch, games.length]);

  const filteredGames = useMemo(() => {
    const result = games.filter((game) => {
      const matchesSearch =
        game.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        game.developer.toLowerCase().includes(filters.search.toLowerCase());

      const matchesGenre =
        filters.genre === "All" || game.genre === filters.genre;

      const matchesPlatform =
        filters.platform === "All" || game.platform === filters.platform;

      return matchesSearch && matchesGenre && matchesPlatform;
    });

    return result.sort((a, b) => {
      if (filters.sortBy === "rating") return b.rating - a.rating;
      if (filters.sortBy === "releaseDate") {
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      }
      return a.title.localeCompare(b.title);
    });
  }, [games, filters]);

  const handleAddGame = async (data: GameFormData) => {
    await dispatch(addGame(data)).unwrap();
    setModalOpen(false);
    setNotice("Game added successfully.");
  };

  const handleUpdateGame = async (data: GameFormData) => {
    if (!editingGame) return;

    await dispatch(
      updateGame({
        ...editingGame,
        ...data,
      })
    ).unwrap();

    setEditingGame(null);
    setModalOpen(false);
    setNotice("Game updated successfully.");
  };

  const handleDeleteGame = async () => {
    if (!deletingGame) return;

    await dispatch(deleteGame(deletingGame.id)).unwrap();
    setDeletingGame(null);
    setNotice("Game deleted successfully.");
  };

  const openEditModal = (game: Game) => {
    setEditingGame(game);
    setModalOpen(true);
  };

  const openAddModal = () => {
    setEditingGame(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingGame(null);
  };

  const totalGames = games.length;
  const averageRating =
    totalGames > 0
      ? games.reduce((total, game) => total + game.rating, 0) / totalGames
      : 0;
  const availableGames = games.filter(
    (game) => game.status === "Available"
  ).length;

  return (
    <div className="space-y-8 pb-10">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#21183b] via-[#17152b] to-[#111827] p-7 sm:p-9">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-1/3 h-64 w-64 rounded-full bg-fuchsia-600/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <Badge variant="purple">GAME COLLECTION</Badge>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Games Library
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
              Manage your gaming catalogue, explore titles, and keep your
              collection organised in one place.
            </p>
          </div>

          <Button onClick={openAddModal}>
            <Plus size={18} />
            Add New Game
          </Button>
        </div>

        <div className="relative mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <div className="flex items-center gap-3 text-slate-400">
              <Gamepad2 size={18} />
              <span className="text-xs">Total Games</span>
            </div>
            <p className="mt-3 text-2xl font-bold text-white">{totalGames}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <div className="flex items-center gap-3 text-slate-400">
              <Star size={18} />
              <span className="text-xs">Average Rating</span>
            </div>
            <p className="mt-3 text-2xl font-bold text-white">
              {averageRating.toFixed(1)}
              <span className="ml-1 text-sm text-slate-500">/ 10</span>
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <div className="flex items-center gap-3 text-slate-400">
              <Monitor size={18} />
              <span className="text-xs">Available Games</span>
            </div>
            <p className="mt-3 text-2xl font-bold text-white">
              {availableGames}
            </p>
          </div>
        </div>
      </section>

      {notice && (
        <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          {notice}
          <button onClick={() => setNotice("")} aria-label="Dismiss notification">
            <X size={16} />
          </button>
        </div>
      )}

      <section className="space-y-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-xl font-bold text-white">Your Collection</h2>
            <p className="mt-1 text-sm text-slate-500">
              {filteredGames.length} {filteredGames.length === 1 ? "game" : "games"} found
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#171827] p-4">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-300">
            <SlidersHorizontal size={16} />
            Filters and sorting
          </div>
          <GameFilters filters={filters} onChange={setFilters} />
        </div>

        {loading && games.length === 0 ? (
          <div className="flex min-h-64 items-center justify-center">
            <Loader />
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center text-sm text-red-400">
            {error}
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#171827] px-6 py-16 text-center">
            <Gamepad2 className="mx-auto text-slate-600" size={40} />
            <h3 className="mt-4 text-lg font-semibold text-white">
              No games found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try adjusting your filters or add a new game to your collection.
            </p>
            <Button className="mt-5" onClick={openAddModal}>
              <Plus size={17} />
              Add a Game
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onEdit={() => openEditModal(game)}
                onDelete={() => setDeletingGame(game)}
              />
            ))}
          </div>
        )}
      </section>

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingGame ? "Edit Game" : "Add New Game"}
      >
        <GameForm
          initialData={editingGame}
          onSubmit={editingGame ? handleUpdateGame : handleAddGame}
          onCancel={closeModal}
        />
      </Modal>

      <Modal
        isOpen={Boolean(deletingGame)}
        onClose={() => setDeletingGame(null)}
        title="Delete Game"
      >
        <div className="space-y-5">
          <p className="text-sm leading-6 text-slate-400">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-white">
              {deletingGame?.title}
            </span>
            ? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeletingGame(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteGame}>
              <Trash2 size={16} />
              Delete Game
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
