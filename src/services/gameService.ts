
import type { Game, GameFormData } from "../types";

const STORAGE_KEY = "gms_games";

const getStoredGames = (): Game[] => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) return [];

  try {
    return JSON.parse(stored) as Game[];
  } catch {
    return [];
  }
};

const saveGames = (games: Game[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
};

const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const initialGames: Game[] = [
  {
    id: "1",
    title: "Cyberpunk 2077",
    genre: "RPG",
    platform: "PC",
    releaseDate: "2020-12-10",
    rating: 8.5,
    cover: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500",
    developer: "CD Projekt Red",
    description: "An open-world RPG set in a futuristic cyberpunk city.",
    status: "Available",
    createdAt: "2026-01-10",
  },
  {
    id: "2",
    title: "God of War Ragnarök",
    genre: "Action",
    platform: "PlayStation",
    releaseDate: "2022-11-09",
    rating: 9.2,
    cover: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500",
    developer: "Santa Monica Studio",
    description: "An epic Norse mythology action adventure.",
    status: "Available",
    createdAt: "2026-01-12",
  },
  {
    id: "3",
    title: "Forza Horizon 5",
    genre: "Racing",
    platform: "Xbox",
    releaseDate: "2021-11-09",
    rating: 8.8,
    cover: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500",
    developer: "Playground Games",
    description: "An open-world racing experience set in Mexico.",
    status: "Available",
    createdAt: "2026-01-15",
  },
  {
    id: "4",
    title: "The Legend of Zelda",
    genre: "Adventure",
    platform: "Switch",
    releaseDate: "2023-05-12",
    rating: 9.5,
    cover: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500",
    developer: "Nintendo",
    description: "An expansive fantasy adventure.",
    status: "Available",
    createdAt: "2026-01-18",
  },
];

const seedGames = (): Game[] => {
  const existing = localStorage.getItem(STORAGE_KEY);

  if (existing !== null) return getStoredGames();

  saveGames(initialGames);
  return initialGames;
};

export const gameService = {
  async fetchGames(): Promise<Game[]> {
    await wait(700);
    return seedGames();
  },

  async addGame(data: GameFormData): Promise<Game> {
    await wait(400);

    const games = getStoredGames();

    const newGame: Game = {
      ...data,
      id: crypto.randomUUID(),
      status: "Available",
      createdAt: new Date().toISOString(),
    };

    saveGames([newGame, ...games]);

    return newGame;
  },

  async updateGame(id: string, data: GameFormData): Promise<Game> {
    await wait(400);

    const games = getStoredGames();
    const existingGame = games.find((game) => game.id === id);

    if (!existingGame) {
      throw new Error("Game not found.");
    }

    const updatedGame: Game = {
      ...existingGame,
      ...data,
    };

    saveGames(
      games.map((game) => (game.id === id ? updatedGame : game))
    );

    return updatedGame;
  },

  async deleteGame(id: string): Promise<string> {
    await wait(400);

    const games = getStoredGames();
    const exists = games.some((game) => game.id === id);

    if (!exists) {
      throw new Error("Game not found.");
    }

    saveGames(games.filter((game) => game.id !== id));

    return id;
  },
};
