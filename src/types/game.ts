
export type Platform = "PC" | "PlayStation" | "Xbox" | "Switch";

export type Genre =
  | "Action"
  | "Adventure"
  | "RPG"
  | "Sports"
  | "Racing"
  | "Shooter"
  | "Simulation"
  | "Strategy"
  | "Puzzle"
  | "Fighting";

export interface Game {
  id: string;
  title: string;
  genre: Genre;
  platform: Platform;
  releaseDate: string;
  rating: number;
  cover: string;
  developer: string;
  description: string;
  status: "Available" | "Coming Soon";
  createdAt: string;
}

export interface GameFormData {
  title: string;
  genre: Genre;
  platform: Platform;
  releaseDate: string;
  rating: number;
  cover: string;
  developer: string;
  description: string;
}

export interface GameFilters {
  search: string;
  genre: Genre | "All";
  platform: Platform | "All";
  sortBy: "title" | "rating" | "releaseDate";
}
