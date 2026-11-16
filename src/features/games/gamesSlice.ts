
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Game, GameFormData } from "../../types";
import { gameService } from "../../services/gameService";

interface GamesState {
  games: Game[];
  loading: boolean;
  error: string | null;
}

const initialState: GamesState = {
  games: [],
  loading: false,
  error: null,
};

export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async (_, { rejectWithValue }) => {
    try {
      return await gameService.fetchGames();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch games."
      );
    }
  }
);

export const addGame = createAsyncThunk(
  "games/addGame",
  async (data: GameFormData, { rejectWithValue }) => {
    try {
      return await gameService.addGame(data);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to add game."
      );
    }
  }
);

export const updateGame = createAsyncThunk(
  "games/updateGame",
  async (
    { id, data }: { id: string; data: GameFormData },
    { rejectWithValue }
  ) => {
    try {
      return await gameService.updateGame(id, data);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to update game."
      );
    }
  }
);

export const deleteGame = createAsyncThunk(
  "games/deleteGame",
  async (id: string, { rejectWithValue }) => {
    try {
      return await gameService.deleteGame(id);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to delete game."
      );
    }
  }
);

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    clearGamesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string ?? "Failed to fetch games.";
      })

      .addCase(addGame.fulfilled, (state, action) => {
        state.games.unshift(action.payload);
      })
      .addCase(addGame.rejected, (state, action) => {
        state.error = action.payload as string ?? "Failed to add game.";
      })

      .addCase(updateGame.fulfilled, (state, action) => {
        const index = state.games.findIndex(
          (game) => game.id === action.payload.id
        );

        if (index !== -1) {
          state.games[index] = action.payload;
        }
      })
      .addCase(updateGame.rejected, (state, action) => {
        state.error = action.payload as string ?? "Failed to update game.";
      })

      .addCase(deleteGame.fulfilled, (state, action) => {
        state.games = state.games.filter(
          (game) => game.id !== action.payload
        );
      })
      .addCase(deleteGame.rejected, (state, action) => {
        state.error = action.payload as string ?? "Failed to delete game.";
      });
  },
});

export const { clearGamesError } = gamesSlice.actions;

export default gamesSlice.reducer;
