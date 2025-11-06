import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light", // default
  isPremiumActivated: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    activatePremium(state) {
      state.isPremiumActivated = true;
    },
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { activatePremium, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
