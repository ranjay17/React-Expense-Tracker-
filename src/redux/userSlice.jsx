import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token") || null,
    userId: localStorage.getItem("userId") || null,
    isLoggedIn: !!localStorage.getItem("token"),
  },
  reducers: {
    login(state, action) {
      const { token, userId } = action.payload;
      state.token = token;
      state.userId = userId;
      state.isLoggedIn = true;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
    },
    logout(state) {
      state.token = null;
      state.userId = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
