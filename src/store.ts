import { configureStore } from "@reduxjs/toolkit";
import { playerReducer } from "./slices/player-slice";

export const store = configureStore({
  reducer: {
    videoPlayer: playerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
