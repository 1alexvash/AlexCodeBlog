import { createSlice } from "@reduxjs/toolkit";

import { Main_ConfigQuery } from "./../../.tina/__generated__/types";

const initialState: Main_ConfigQuery = {
  main_config: {
    site_title: "",
    id: "",
    site_description: "",
    site_keywords: [],
    author_name: "",
    author_position: "",
    social_links: [],
    host_url: "",
    default_image: "",
    posts_per_page: 0,
    latest_posts_per_page: 0,
    _sys: {
      filename: "",
      basename: "",
      breadcrumbs: [],
      path: "",
      relativePath: "",
      extension: "",
    },
  },
};

export const tinaDataSlice = createSlice({
  name: "tinaData",
  initialState,
  reducers: {
    setTinaData: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setTinaData } = tinaDataSlice.actions;

export default tinaDataSlice.reducer;
