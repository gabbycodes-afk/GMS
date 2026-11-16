
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Player } from "../../types";

interface PlayersState {
  players: Player[];
  loading: boolean;
  error: string | null;
}

const initialState: PlayersState = {
  players: [
    {
      id: "1",
      username: "ShadowX",
      email: "shadow@example.com",
      platform: "PC",
      skillLevel: "Professional",
      gamesPlayed: 142,
      hoursPlayed: 320,
      wins: 98,
      losses: 44,
      avatar: "https://i.pravatar.cc/150?img=12",
      joinedAt: "2025-10-12",
      isActive: true,
    },
    {
      id: "2",
      username: "NovaQueen",
      email: "nova@example.com",
      platform: "PlayStation",
      skillLevel: "Advanced",
      gamesPlayed: 96,
      hoursPlayed: 210,
      wins: 71,
      losses: 25,
      avatar: "https://i.pravatar.cc/150?img=47",
      joinedAt: "2025-11-03",
      isActive: true,
    },
    {
      id: "3",
      username: "GhostRider",
      email: "ghost@example.com",
      platform: "Xbox",
      skillLevel: "Intermediate",
      gamesPlayed: 64,
      hoursPlayed: 145,
      wins: 38,
      losses: 26,
      avatar: "https://i.pravatar.cc/150?img=33",
      joinedAt: "2025-12-08",
      isActive: false,
    },
    {
      id: "4",
      username: "PixelMaster",
      email: "pixel@example.com",
      platform: "Switch",
      skillLevel: "Advanced",
      gamesPlayed: 118,
      hoursPlayed: 275,
      wins: 86,
      losses: 32,
      avatar: "https://i.pravatar.cc/150?img=15",
      joinedAt: "2026-01-15",
      isActive: true,
    },
  ],
  loading: false,
  error: null,
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<Player>) => {
      state.players.unshift(action.payload);
    },

    updatePlayer: (state, action: PayloadAction<Player>) => {
      const index = state.players.findIndex(
        (player) => player.id === action.payload.id
      );

      if (index !== -1) {
        state.players[index] = action.payload;
      }
    },

    deletePlayer: (state, action: PayloadAction<string>) => {
      state.players = state.players.filter(
        (player) => player.id !== action.payload
      );
    },
  },
});

export const { addPlayer, updatePlayer, deletePlayer } =
  playersSlice.actions;

export default playersSlice.reducer;
