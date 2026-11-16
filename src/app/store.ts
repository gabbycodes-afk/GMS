
import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "../features/games/gamesSlice";
import playersReducer from "../features/players/playersSlice";

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    players: playersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
