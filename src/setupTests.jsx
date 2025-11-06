import "@testing-library/jest-dom";

// Mock localStorage globally for all tests
beforeAll(() => {
  const mockLocalStorage = (() => {
    let store = {};
    return {
      getItem(key) {
        return store[key] || null;
      },
      setItem(key, value) {
        store[key] = value.toString();
      },
      removeItem(key) {
        delete store[key];
      },
      clear() {
        store = {};
      },
    };
  })();

  Object.defineProperty(global, "localStorage", {
    value: mockLocalStorage,
  });
});
