import { createSlice } from "@reduxjs/toolkit";

import { MainConfigQuery } from "./../../.tina/__generated__/types";

const initialState: MainConfigQuery = {
  mainConfig: {
    __typename: "MainConfig", // <-- add this line
    siteTitle: "",
    id: "",
    siteDescription: "",
    ogSiteTitle: "",
    authorName: "",
    authorPosition: "",
    socialLinks: [],
    defaultImage: "",
    postsPerPage: 0,
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
