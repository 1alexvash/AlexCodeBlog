import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TagsType = string[];

export const selectedTagsSlice = createSlice({
  name: "selectedTags",
  initialState: [] as TagsType,
  reducers: {
    resetTags: () => {
      return [];
    },
    updateTags: (state, action: PayloadAction<TagsType>) => {
      console.log("state:", JSON.parse(JSON.stringify(state)));
      console.log("action:", action);
      return (state = action.payload);
    },
  },
});

export const { resetTags, updateTags } = selectedTagsSlice.actions;

export default selectedTagsSlice.reducer;
