
import { useMemo, useState, type FormEvent } from "react";
import {
  Plus,
  Search,
  Users,
  Trophy,
  Target,
  Clock3,
  X,
  Pencil,
  ChevronDown,
  Gamepad2,
  Activity,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addPlayer,
  updatePlayer,
  deletePlayer,
} from "../features/players/playersSlice";
import PlayerCard from "../components/players/PlayerCard";
import Leaderboard from "../components/players/Leaderboard";
import type { Player, PlayerFormData, SkillLevel } from "../types";

const skillLevels: SkillLevel[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Professional",
];

const platforms: Player["platform"][] = [
  "PC",
  "PlayStation",
  "Xbox",
  "Switch",
];

const emptyForm: PlayerFormData = {
  username: "",
  email: "",
  platform: "PC",
  skillLevel: "Beginner",
};

export default function Players() {
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.players.players);

  const [search, setSearch] = useState("");
  const [skillFilter, setSkillFilter] = useState<SkillLevel | "All">("All");
  const [platformFilter, setPlatformFilter] = useState<Player["platform"] | "All">("All");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [formData, setFormData] = useState<PlayerFormData>(emptyForm);
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");

  const activePlayers = players.filter((player) => player.isActive).length;
  const totalWins = players.reduce((total, player) => total + player.wins, 0);
  const totalHours = players.reduce((total, player) => total + player.hoursPlayed, 0);

  const filteredPlayers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return players.filter((player) => {
      const matchesSearch =
        player.username.toLowerCase().includes(query) ||
        player.email.toLowerCase().includes(query);

      const matchesSkill =
        skillFilter === "All" || player.skillLevel === skillFilter;

      const matchesPlatform =
        platformFilter === "All" || player.platform === platformFilter;

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" && player.isActive) ||
        (statusFilter === "Inactive" && !player.isActive);

      return matchesSearch && matchesSkill && matchesPlatform && matchesStatus;
    });
  }, [players, search, skillFilter, platformFilter, statusFilter]);

  const openAddModal = () => {
    setEditingPlayer(null);
    setFormData(emptyForm);
    setFormError("");
    setModalOpen(true);
  };

  const openEditModal = (player: Player) => {
    setEditingPlayer(player);
    setFormData({
      username: player.username,
      email: player.email,
      platform: player.platform,
      skillLevel: player.skillLevel,
    });
    setFormError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingPlayer(null);
    setFormData(emptyForm);
    setFormError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setNotice("");

    const username = formData.username.trim();
    const email = formData.email.trim();

    if (!username || !email) {
      setFormError("Please enter a username and email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    const duplicateEmail = players.some(
      (player) =>
        player.email.toLowerCase() === email.toLowerCase() &&
        player.id !== editingPlayer?.id
    );

    if (duplicateEmail) {
      setFormError("A player with this email address already exists.");
      return;
    }

    if (editingPlayer) {
      dispatch(
        updatePlayer({
          ...editingPlayer,
          username,
          email,
          platform: formData.platform,
          skillLevel: formData.skillLevel,
        })
      );
      setNotice(`${username}'s profile has been updated.`);
    } else {
      const newPlayer: Player = {
        id: crypto.randomUUID(),
        username,
        email,
        platform: formData.platform,
        skillLevel: formData.skillLevel,
        gamesPlayed: 0,
        hoursPlayed: 0,
        wins: 0,
        losses: 0,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=6d28d9&color=fff&bold=true`,
        joinedAt: new Date().toISOString(),
        isActive: true,
      };

      dispatch(addPlayer(newPlayer));
      setNotice(`${username} has been added to the player community.`);
    }

    closeModal();
  };

  const handleDelete = (player: Player) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${player.username}?`
    );

    if (!confirmed) return;

    dispatch(deletePlayer(player.id));
    setNotice(`${player.username} has been removed.`);
  };

  const clearFilters = () => {
    setSearch("");
    setSkillFilter("All");
    setPlatformFilter("All");
    setStatusFilter("All");
  };

  return (
    <div className="space-y-8 pb-10">
      <section className="relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-[#251642] via-[#19172e] to-[#111827] p-7 sm:p-9">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-violet-300">
              <Users size={17} />
              COMMUNITY MANAGEMENT
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Players
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
              Manage your gaming community, monitor player activity, and keep
              track of your top performers.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-950/40 transition hover:bg-violet-400"
          >
            <Plus size={18} />
            Add Player
          </button>
        </div>

        <div className="relative mt-8 grid grid-cols-2 gap-3 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-400">Total players</p>
              <Users size={17} className="text-violet-300" />
            </div>
            <p className="mt-3 text-2xl font-bold text-white">{players.length}</p>
            <p className="mt-1 text-xs text-slate-500">Registered accounts</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-400">Active players</p>
              <Activity size={17} className="text-emerald-400" />
            </div>
            <p className="mt-3 text-2xl font-bold text-white">{activePlayers}</p>
            <p className="mt-1 text-xs text-slate-500">Currently active</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-400">Total victories</p>
              <Trophy size={17} className="text-amber-300" />
            </div>
            <p className="mt-3 text-2xl font-bold text-white">{totalWins.toLocaleString()}</p>
            <p className="mt-1 text-xs text-slate-500">Across all players</p>
          </div>

          <div className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.06] p-4 xl:col-span-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-400">Hours played</p>
              <Clock3 size={17} className="text-sky-300" />
            </div>
            <p className="mt-3 text-2xl font-bold text-white">{totalHours.toLocaleString()}</p>
            <p className="mt-1 text-xs text-slate-500">Community playtime</p>
          </div>
        </div>
      </section>

      {notice && (
        <div className="flex items-center justify-between rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-3 text-sm text-violet-200">
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss message"
          >
            <X size={17} />
          </button>
        </div>
      )}

      <section className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="min-w-0 space-y-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-white">Player directory</h2>
              <p className="mt-1 text-sm text-slate-400">
                {filteredPlayers.length} of {players.length} players
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Target size={15} />
              Community overview
            </div>
          </div>

          <div className="grid gap-3 rounded-2xl border border-white/10 bg-[#171827] p-4 sm:grid-cols-2">
            <div className="relative sm:col-span-2">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by username or email..."
                className="w-full rounded-xl border border-white/10 bg-[#10111d] py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500"
              />
            </div>

            <div className="relative">
              <select
                value={skillFilter}
                onChange={(event) =>
                  setSkillFilter(event.target.value as SkillLevel | "All")
                }
                className="w-full appearance-none rounded-xl border border-white/10 bg-[#10111d] px-4 py-3 pr-9 text-sm text-slate-200 outline-none focus:border-violet-500"
              >
                <option value="All">All skill levels</option>
                {skillLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
            </div>

            <div className="relative">
              <select
                value={platformFilter}
                onChange={(event) =>
                  setPlatformFilter(event.target.value as Player["platform"] | "All")
                }
                className="w-full appearance-none rounded-xl border border-white/10 bg-[#10111d] px-4 py-3 pr-9 text-sm text-slate-200 outline-none focus:border-violet-500"
              >
                <option value="All">All platforms</option>
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>{platform}</option>
                ))}
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as "All" | "Active" | "Inactive")
                }
                className="w-full appearance-none rounded-xl border border-white/10 bg-[#10111d] px-4 py-3 pr-9 text-sm text-slate-200 outline-none focus:border-violet-500"
              >
                <option value="All">All statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-400 transition hover:border-violet-400/40 hover:text-white"
            >
              Clear filters
            </button>
          </div>

          {filteredPlayers.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#171827] px-5 text-center">
              <div className="mb-4 rounded-2xl bg-violet-500/10 p-4 text-violet-300">
                <Users size={30} />
              </div>
              <h3 className="text-lg font-bold text-white">
                {players.length === 0 ? "No players yet" : "No players found"}
              </h3>
              <p className="mt-2 max-w-sm text-sm text-slate-400">
                {players.length === 0
                  ? "Add your first player to start building your community."
                  : "Try adjusting your search or filters."}
              </p>
              {players.length === 0 ? (
                <button
                  type="button"
                  onClick={openAddModal}
                  className="mt-5 rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-violet-400"
                >
                  Add first player
                </button>
              ) : (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 text-sm font-semibold text-violet-300 hover:text-violet-200"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredPlayers.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onEdit={() => openEditModal(player)}
                  onDelete={() => handleDelete(player)}
                />
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-white/10 bg-[#171827] p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-white">Community snapshot</h2>
                <p className="mt-1 text-xs text-slate-500">Player skill distribution</p>
              </div>
              <div className="rounded-xl bg-violet-500/10 p-2 text-violet-300">
                <Gamepad2 size={18} />
              </div>
            </div>

            <div className="space-y-4">
              {skillLevels.map((level) => {
                const count = players.filter(
                  (player) => player.skillLevel === level
                ).length;
                const percentage = players.length
                  ? Math.round((count / players.length) * 100)
                  : 0;

                return (
                  <div key={level}>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-300">{level}</span>
                      <span className="text-slate-500">
                        {count} players · {percentage}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-violet-500 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#171827] p-5">
            <Leaderboard players={players} />
          </div>
        </aside>
      </section>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div className="my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#191a2b] shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-violet-400">
                  GameVault community
                </p>
                <h2 className="mt-1 text-xl font-bold text-white">
                  {editingPlayer ? "Edit player" : "Register player"}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
                aria-label="Close form"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-300">Username</span>
                <input
                  required
                  value={formData.username}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      username: event.target.value,
                    }))
                  }
                  placeholder="Enter a gaming username"
                  className="w-full rounded-xl border border-white/10 bg-[#10111d] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-500"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-300">Email address</span>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  placeholder="player@example.com"
                  className="w-full rounded-xl border border-white/10 bg-[#10111d] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-500"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-300">Platform</span>
                  <select
                    value={formData.platform}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        platform: event.target.value as Player["platform"],
                      }))
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#10111d] px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
                  >
                    {platforms.map((platform) => (
                      <option key={platform} value={platform}>{platform}</option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-300">Skill level</span>
                  <select
                    value={formData.skillLevel}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        skillLevel: event.target.value as SkillLevel,
                      }))
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#10111d] px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
                  >
                    {skillLevels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </label>
              </div>

              {formError && (
                <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {formError}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-400"
                >
                  {editingPlayer ? (
                    <>
                      <Pencil size={16} />
                      Save changes
                    </>
                  ) : (
                    <>
                      <Plus size={17} />
                      Add player
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
