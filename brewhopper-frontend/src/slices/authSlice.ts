import { createSlice } from "@reduxjs/toolkit";

interface AuthInitialStateProps {
  userInfo: userInfo | null;
}

type userInfo = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

const initialUserInfo: string | null = localStorage.getItem("userInfo");

const initialState: AuthInitialStateProps = {
  userInfo: initialUserInfo ? JSON.parse(initialUserInfo) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
