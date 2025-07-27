// redux/slices/sidebarSlice.js
import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isVisible: true, // Initial state of the sidebar
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isVisible = !state.isVisible; // Toggle the sidebar state
    },
    showSidebar: (state) => {
      state.isVisible = true; // Set the sidebar to visible
    },
    hideSidebar: (state) => {
      state.isVisible = false; // Set the sidebar to hidden
    },
  },
});

export const { toggleSidebar, showSidebar, hideSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;