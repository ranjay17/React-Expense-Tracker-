/**
 * @vitest-environment jsdom
 */

import expensesReducer, {
  setExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../../redux/expensesSlice";

describe("expensesSlice reducer", () => {
  it("should return initial state", () => {
    const initial = expensesReducer(undefined, { type: "@@INIT" });
    expect(initial).toHaveProperty("list");
    expect(Array.isArray(initial.list)).toBe(true);
    expect(initial).toHaveProperty("total");
    expect(typeof initial.total).toBe("number");
  });

  it("should handle setExpenses", () => {
    const mock = [
      { id: "a", amount: 100 },
      { id: "b", amount: 200 },
    ];
    const next = expensesReducer(undefined, setExpenses(mock));
    expect(next.list).toEqual(mock);
    expect(next.total).toBe(300);
    expect(next.premiumActive).toBe(false);
  });

  it("should handle addExpense", () => {
    const startState = { list: [], total: 0, premiumActive: false };
    const next = expensesReducer(
      startState,
      addExpense({ id: "c", amount: 150 })
    );
    expect(next.list.length).toBe(1);
    expect(next.total).toBe(150);
  });

  it("should handle deleteExpense", () => {
    const startState = {
      list: [
        { id: "x", amount: 50 },
        { id: "y", amount: 100 },
      ],
      total: 150,
      premiumActive: false,
    };
    const next = expensesReducer(startState, deleteExpense("x"));
    expect(next.list.find((i) => i.id === "x")).toBeUndefined();
    expect(next.total).toBe(100);
  });
});
