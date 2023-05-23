import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  link: string;
};

const initialState: State = {
  link: "",
};

export const hostUrlSlice = createSlice({
  name: "hostUrl",
  initialState,
  reducers: {
    setHostUrl: (state, action: PayloadAction<string>) => {
      state.link = action.payload;
    },
  },
});

export const { setHostUrl } = hostUrlSlice.actions;

export default hostUrlSlice.reducer;
