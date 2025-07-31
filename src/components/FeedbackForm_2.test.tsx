import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FeedbackForm } from "./FeedbackForm_2";
import { describe, it, expect } from "vitest";

describe("FeedbackForm", () => {
  it("renders all inputs", () => {
    render(<FeedbackForm />);
    expect(screen.getByTestId("input-name")).toBeInTheDocument();
    expect(screen.getByTestId("input-email")).toBeInTheDocument();
    expect(screen.getByTestId("input-rating")).toBeInTheDocument();
    expect(screen.getByTestId("input-message")).toBeInTheDocument();
  });

  it("shows error when required fields are missing", () => {
    render(<FeedbackForm />);
    fireEvent.submit(screen.getByTestId("feedback-form"));

    // TODO: Expect email and rating errors to appear
    // Example:
    expect(screen.getByTestId("error-email")).toBeInTheDocument();
    expect(screen.getByTestId("error-rating")).toBeInTheDocument();
  });

  it("validates invalid email and rating out of range", async() => {
    render(<FeedbackForm />);
    fireEvent.change(screen.getByTestId("input-email"), {
      target: { value: "invalidemail" },
    });
    fireEvent.change(screen.getByTestId("input-rating"), {
      target: { value: "7" },
    });
    fireEvent.submit(screen.getByTestId("feedback-form"));

    // TODO: Expect error messages for invalid email and rating
    await waitFor(() => {
        expect(screen.getByTestId('error-email')).toHaveTextContent("Invalid Email")
        expect(screen.getByTestId('error-rating')).toHaveTextContent("Invalid Rating")
    })
    

    
  });

  it("submits the form when all fields are valid", async() => {
    render(<FeedbackForm />);
    fireEvent.change(screen.getByTestId("input-email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("input-rating"), {
      target: { value: "5" },
    });
    fireEvent.submit(screen.getByTestId("feedback-form"));
    // TODO: Expect success message to be shown
    waitFor(() => {
        expect(screen.getByTestId("success-message").innerText).toHaveTextContent("Feedback submitted!")
    })
    
  });

  it("does not accept message longer than 250 chars", async () => {
    render(<FeedbackForm />);
    fireEvent.change(screen.getByTestId("input-message"), {
      target: { value: "x".repeat(251) },
    });
    fireEvent.submit(screen.getByTestId("feedback-form"));
    // TODO: Expect error about message length
    await waitFor(() => {
        expect(screen.getByTestId("error-message")).toHaveTextContent("Message must be less than 250 characters.")
        // expect(screen.getByTestId("error-message")).toBeVisible()
    })
    
  });
});
