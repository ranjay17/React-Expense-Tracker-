/**
 * @vitest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ExpenseTracking from "../../components/ExpenseTracking";
import { Provider } from "react-redux";
import store from "../../redux/appStore";
import { MemoryRouter } from "react-router-dom";

// Note: ExpenseTracking uses axios to fetch. For these simple tests we avoid network by testing UI before fetch resolves.

describe("ExpenseTracking component", () => {
  it("renders Add Daily Expense heading", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ExpenseTracking />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Add Daily Expense/i)).toBeInTheDocument();
  });

  it('shows "No expenses added yet." when list empty', () => {
    // Ensure store currently has empty list. If not, we could dispatch setExpenses([]) but this test assumes fresh store
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ExpenseTracking />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/No expenses added yet/i)).toBeInTheDocument();
  });
});
