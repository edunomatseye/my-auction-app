import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, describe, afterEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";

import LoginForm from "./loginForm"; // Assuming LoginForm is in the same directory
// Configure a default query client for testing
const defaultQueryClient = new QueryClient();

// Custom render function with React Query provider
const customRender = (ui: React.ReactNode, options = {}) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={defaultQueryClient}>
      {children}
    </QueryClientProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

// Override global render function with customRender
//global.render = customRender;

// Reset query client after each test
afterEach(() => {
  defaultQueryClient.resetQueries();
});

describe("LoginForm", () => {
  it("should render correctly", async () => {
    customRender(<LoginForm />);

    expect(screen.getByText("loginForm")).toBeDefined();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeDefined();
    expect(screen.getByLabelText(/Password/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /login/i })).toBeDefined();
  });

  it.skip("should show validation errors for empty fields", async () => {
    customRender(<LoginForm />);

    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it.skip("should show validation error for invalid email", async () => {
    customRender(<LoginForm />);

    await userEvent.type(screen.getByLabelText(/email/i), "invalid_email");
    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(
      screen.getByText(/Please provide a valid email address/i),
    ).toBeInTheDocument();
  });

  // Consider mocking `useMutation` for more comprehensive testing
  // (outside the scope of this example)
  it.skip("should submit the form with valid data (consider mocking useMutation)", async () => {
    const { findByLabelText, getByLabelText, getByRole } = customRender(<LoginForm />);

    await userEvent.type(await findByLabelText(/Email/i), "valid@email.com");
    await userEvent.type(getByLabelText(/Password/i), "password123");
    await userEvent.click(getByRole("button", { name: /login/i }));

    // Assertions for form submission logic (consider mocking useMutation)
  });
});
