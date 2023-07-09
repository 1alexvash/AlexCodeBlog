import { configureStore } from "@reduxjs/toolkit";

import hostUrl from "./slices/hostUrl";
import paginationSlice from "./slices/pagination";
import selectedTagsSlice from "./slices/selectedTags";
import tinaData from "./slices/tinaData";

const store = configureStore({
  reducer: {
    selectedTags: selectedTagsSlice,
    pagination: paginationSlice,

    tinaData,
    hostUrl,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
