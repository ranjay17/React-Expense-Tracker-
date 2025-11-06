/**
 * @vitest-environment jsdom
 */

import themeReducer, {
  activatePremium,
  toggleTheme,
} from "../../redux/ThemeSlice";

describe("themeSlice", () => {
  it("should activate premium and toggle theme", () => {
    let state = themeReducer(undefined, { type: "@@INIT" });
    expect(state.isPremiumActivated).toBe(false);
    expect(state.theme).toBe("light");

    state = themeReducer(state, activatePremium());
    expect(state.isPremiumActivated).toBe(true);

    state = themeReducer(state, toggleTheme());
    expect(state.theme).toBe("dark");

    state = themeReducer(state, toggleTheme());
    expect(state.theme).toBe("light");
  });
});
