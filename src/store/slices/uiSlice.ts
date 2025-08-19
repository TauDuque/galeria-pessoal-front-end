import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UIState, Notification } from "../../types";

const initialState: UIState = {
  theme: "dark",
  sidebarOpen: false,
  modalOpen: false,
  notifications: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
    },
    addNotification: (
      state,
      action: PayloadAction<Omit<Notification, "id">>
    ) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const {
  toggleTheme,
  toggleSidebar,
  setModalOpen,
  addNotification,
  removeNotification,
} = uiSlice.actions;

export default uiSlice.reducer;
