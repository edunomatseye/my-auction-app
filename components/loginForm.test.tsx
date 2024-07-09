// loginForm.test.jsx

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LoginForm from "./loginForm";

const queryClient = new QueryClient();

const WrappedLoginForm = () => (
  <QueryClientProvider client={queryClient}>
    <LoginForm />
  </QueryClientProvider>
);

describe("LoginForm Component", () => {
  beforeEach(() => {
    render(<WrappedLoginForm />);
  });

  afterEach(() => {
    queryClient.clear();
  });

  it("renders the form with default values", () => {
    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("password");

    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(emailInput).toContain("olowo@bab.com");
    expect(passwordInput).toContain("olowo@bab.com");
  });

  it("displays error messages on invalid form submission", async () => {
    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("password");
    const submitButton = screen.getByText("Login");

    // Clear the input values to trigger validation errors
    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toContain(
        "Please provide a valid email address",
      );
    });
  });

  it("submits the form with valid data", async () => {
    const emailInput = screen.getAllByPlaceholderText("email");
    const passwordInput = screen.getAllByPlaceholderText("password");
    const submitButton = screen.getAllByText("Login");

    // Fill in the form with valid data
    fireEvent.change(emailInput[0], { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput[0], { target: { value: "password123" } });

    fireEvent.click(submitButton[0]);
  });
});
