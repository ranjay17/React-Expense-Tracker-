/**
 * @vitest-environment jsdom
 */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import UpdateProfile from "../components/UpdateProfile";
import { MemoryRouter } from "react-router-dom";

describe("UpdateProfile component", () => {
  beforeEach(() => {
    // mock token in localStorage
    localStorage.setItem("token", "dummy-token");

    // mock fetch to return user with displayName and photoUrl
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            users: [
              {
                email: "test@t.com",
                displayName: "Test User",
                photoUrl: "http://img",
              },
            ],
          }),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.removeItem("token");
  });

  it("prefills name and photoUrl from Firebase lookup", async () => {
    render(
      <MemoryRouter>
        <UpdateProfile />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue(/Test User/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue(/http:\/\/img/i)).toBeInTheDocument();
    });
  });
});
