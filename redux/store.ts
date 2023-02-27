import { configureStore } from "@reduxjs/toolkit";

import adminSlice from "./slices/admin";
import paginationSlice from "./slices/pagination";
import selectedTagsSlice from "./slices/selectedTags";
import themeSlice from "./slices/theme";

const store = configureStore({
  reducer: {
    selectedTags: selectedTagsSlice,
    pagination: paginationSlice,
    theme: themeSlice,
    admin: adminSlice,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
