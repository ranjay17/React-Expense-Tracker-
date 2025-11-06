import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import expensesReducer from "./expensesSlice";
import themeReducer from './ThemeSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    expenses: expensesReducer,
    theme: themeReducer,
  },
});

export default appStore;
