import { render, screen, fireEvent } from "@testing-library/react";
import Product from "./Product";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Product Component", () => {
  const mockNavigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

  const productProps = {
    id: "1",
    productName: "Test Product",
    image: "http://example.com/image.jpg",
    price: 29.99,
    createdAt: "2024-10-13T12:00:00Z",
    onAddToCart: jest.fn(),
  };

  beforeEach(() => {
    mockNavigate.mockClear();
    render(<Product {...productProps} />);
  });

  it("renders correctly with given props", () => {
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("29.99 ₺")).toBeInTheDocument();
  });

  it("calls onAddToCart when the button is clicked", () => {
    const button = screen.getByRole("button", { name: /Add to Cart/i });
    fireEvent.click(button);

    expect(productProps.onAddToCart).toHaveBeenCalled();
  });

  it("navigates to the product details page when the card is clicked", () => {
    const card = screen.getByText("Test Product").closest("div");

    expect(card).not.toBeNull();
    if (card) {
      fireEvent.click(card);
    }

    expect(mockNavigate).toHaveBeenCalledWith("/product/1");
  });
});
