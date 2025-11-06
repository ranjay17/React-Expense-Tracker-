/**
 * @vitest-environment jsdom
 */

import userReducer, { login, logout } from "../redux/userSlice";

describe("userSlice", () => {
  it("should handle login and logout", () => {
    const stateAfterLogin = userReducer(
      undefined,
      login({ token: "t", userId: "u" })
    );
    expect(stateAfterLogin.token).toBe("t");
    expect(stateAfterLogin.userId).toBe("u");
    expect(stateAfterLogin.isLoggedIn).toBe(true);

    const stateAfterLogout = userReducer(stateAfterLogin, logout());
    expect(stateAfterLogout.token).toBeNull();
    expect(stateAfterLogout.userId).toBeNull();
    expect(stateAfterLogout.isLoggedIn).toBe(false);
  });
});
