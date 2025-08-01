import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import ProductFilter from "./ProductFilter";

describe("ProductFilter Component", () => {
  test("shows all products by default", () => {
    render(<ProductFilter />);
    const items = screen.getAllByTestId("product-item");
    expect(items.length).toBe(5);
  });

  test("filters products by name", () => {
    render(<ProductFilter />);
    fireEvent.change(screen.getByPlaceholderText("Search by name"), {
      target: { value: "apple" },
    });

    const items = screen.getAllByTestId("product-item");
    expect(items.length).toBe(1);
    expect(items[0].textContent).toMatch(/iphone/i);
  });

  test("filters products by category", () => {
    render(<ProductFilter />);
    fireEvent.change(screen.getByDisplayValue("All Categories"), {
      target: { value: "Accessories" },
    });

    const items = screen.getAllByTestId("product-item");
    expect(items.length).toBe(1);
    expect(items[0].textContent).toMatch(/wallet/i);
  });

  test("filters products by min and max price", () => {
    render(<ProductFilter />);
    fireEvent.change(screen.getByPlaceholderText("Min Price"), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByPlaceholderText("Max Price"), {
      target: { value: "200" },
    });

    const items = screen.getAllByTestId("product-item");
    expect(items.length).toBe(1); // Should match "Running Shoes"
    expect(items[0].textContent).toMatch(/shoes/i);
  });

  test("returns no products if minPrice > maxPrice", () => {
    render(<ProductFilter />);
    fireEvent.change(screen.getByPlaceholderText("Min Price"), {
      target: { value: "2000" },
    });
    fireEvent.change(screen.getByPlaceholderText("Max Price"), {
      target: { value: "1000" },
    });

    const items = screen.queryAllByTestId("product-item");
    expect(items.length).toBe(0);
  });
});
