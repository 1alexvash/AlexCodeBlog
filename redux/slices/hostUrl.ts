import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const hostUrlSlice = createSlice({
  name: "hostUrl",
  initialState: "",
  reducers: {
    setHostUrl: (state, action: PayloadAction<string>) => {
      state = action.payload;

      return state;
    },
  },
});

export const { setHostUrl } = hostUrlSlice.actions;

export default hostUrlSlice.reducer;
