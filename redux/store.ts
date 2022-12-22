import { configureStore } from "@reduxjs/toolkit";

import premissionsSlice from "./slices/admin";
import paginationSlice from "./slices/pagination";
import selectedTagsSlice from "./slices/selectedTags";
import themeSlice from "./slices/theme";

const store = configureStore({
  reducer: {
    selectedTags: selectedTagsSlice,
    pagination: paginationSlice,
    theme: themeSlice,
    admin: premissionsSlice,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
