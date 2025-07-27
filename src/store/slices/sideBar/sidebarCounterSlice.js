import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shouldUpdate: false, // Flag to track if the sidebar needs to update
  dashboardUpdate: false,
};

export const sidebarCounterSlice = createSlice({
  name: "sidebarCounter",
  initialState,
  reducers: {
    addsidebarCounter: (state, action) => {
      state.shouldUpdate = true;
    },

    resetsidebarCounter: (state, action) => {
      state.shouldUpdate = false;
    },

    // Optional: You can manually toggle the shouldUpdate flag if needed
    toggleShouldUpdate: (state) => {
      state.shouldUpdate = !state.shouldUpdate;
    },

    dashboardUpdate: (state) => {
      state.dashboardUpdate = !state.dashboardUpdate;
    },
  },
});

export const {
  addsidebarCounter,
  resetsidebarCounter,
  toggleShouldUpdate,
  dashboardUpdate,
} = sidebarCounterSlice.actions;

export default sidebarCounterSlice.reducer;
