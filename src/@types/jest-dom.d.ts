import "@testing-library/jest-dom";

declare global {
  // Jest için özel eşleştiriciler
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
    }
  }
}
