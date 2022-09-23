import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TagsType = string[];

export const selectedTagsSlice = createSlice({
  name: "selectedTags",
  initialState: [] as TagsType,
  reducers: {
    resetTags: () => {
      return [];
    },
    setTags: (state, action: PayloadAction<TagsType>) => {
      return (state = action.payload);
    },
  },
});

export const { resetTags, setTags } = selectedTagsSlice.actions;

export default selectedTagsSlice.reducer;
