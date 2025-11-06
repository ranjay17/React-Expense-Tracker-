/**
 * @vitest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../redux/appStore";
import Home from "../components/Home";

describe("Home component", () => {
  it("renders welcome message and logout button", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Welcome to Expense Tracker/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });
});
