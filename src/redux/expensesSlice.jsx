import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    list: [],
    total: 0,
    premiumActive: false,
  },
  reducers: {
    setExpenses(state, action) {
      state.list = action.payload;
      state.total = state.list.reduce(
        (sum, exp) => sum + Number(exp.amount),
        0
      );
      state.premiumActive = state.total > 10000;
    },
    addExpense(state, action) {
      state.list.unshift(action.payload);
      state.total += Number(action.payload.amount);
      state.premiumActive = state.total > 10000;
    },
    updateExpense(state, action) {
      const index = state.list.findIndex((exp) => exp.id === action.payload.id);
      if (index !== -1) {
        state.total -= Number(state.list[index].amount);
        state.list[index] = action.payload;
        state.total += Number(action.payload.amount);
        state.premiumActive = state.total > 10000;
      }
    },
    deleteExpense(state, action) {
      const deleted = state.list.find((exp) => exp.id === action.payload);
      if (deleted) state.total -= Number(deleted.amount);
      state.list = state.list.filter((exp) => exp.id !== action.payload);
      state.premiumActive = state.total > 10000;
    },
  },
});

export const { setExpenses, addExpense, updateExpense, deleteExpense } =
  expensesSlice.actions;
export default expensesSlice.reducer;
