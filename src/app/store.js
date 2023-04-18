import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import favoriteReducer from "../features/pokemons/favoriteSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    favorites: favoriteReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // immutableCheck: false,
      // serializableCheck: false,
    }).concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
