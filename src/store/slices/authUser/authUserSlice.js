import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  name: "Demo",
  email: "demo@user.com",
  auth: false,
  token: "",
  loading: false,
  profile_picture: ""
};

export const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    addAuthData: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.first_name;
      state.email = action.payload.email;
      state.auth = action.payload.auth;
      state.token = action.payload.token;
      state.profile_picture = ""
    },

    resetAuthData: (state, action) => {
      state.id = null;
      state.name = "";
      state.email = "";
      state.auth = false;
      state.token = "";
      state.profile_picture = ""
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addAuthData, resetAuthData, setLoading } = authUserSlice.actions;

export default authUserSlice.reducer;
