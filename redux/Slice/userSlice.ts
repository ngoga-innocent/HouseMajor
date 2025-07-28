import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { loggedIn: false },
  reducers: {
    login: state => { state.loggedIn = true },
    logout: state => { state.loggedIn = false },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
