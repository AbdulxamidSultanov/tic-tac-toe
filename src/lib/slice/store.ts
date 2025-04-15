import { configureStore } from "@reduxjs/toolkit";
import playerConfigSlice from "./playerConfigSlice";

export const store = configureStore({
  reducer: {
    playerConfigSlice: playerConfigSlice,
  },
});
