import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SWRConfig } from "swr";

import { createServer } from "../../test/server";

import AuthButtons from "./AuthButtons";

const renderAuthButtons = async () => {
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <MemoryRouter>
        <AuthButtons />
      </MemoryRouter>
    </SWRConfig>
  );

  await screen.findAllByRole("link");
};

describe("<AuthButtons />", () => {
  describe("when user is signed in", () => {
    createServer([
      {
        path: "/api/user",
        res: () => {
          return {
            user: {
              id: parseInt(Math.random() * 10),
              email: "johndoe@johndoe.com",
            },
          };
        },
      },
    ]);

    it("should not render the buttons Sign in and Sign up", async () => {
      await renderAuthButtons();

      const signInButton = screen.queryByRole("link", {
        name: /sign in/i,
      });

      const signUpButton = screen.queryByRole("link", {
        name: /sign up/i,
      });

      expect(signInButton).not.toBeInTheDocument();
      expect(signUpButton).not.toBeInTheDocument();
    });

    it("should render the button Sign out", async () => {
      await renderAuthButtons();

      const signOutButton = screen.getByRole("link", {
        name: /sign out/i,
      });

      expect(signOutButton).toBeInTheDocument();
      expect(signOutButton).toHaveAttribute("href", "/signout");
    });
  });

  describe("when user is not signed in", () => {
    createServer([
      {
        path: "/api/user",
        res: () => {
          return { user: null };
        },
      },
    ]);

    it("should render the buttons Sign in and Sign up", async () => {
      await renderAuthButtons();

      const signInButton = screen.getByRole("link", {
        name: /sign in/i,
      });

      const signUpButton = screen.getByRole("link", {
        name: /sign up/i,
      });

      expect(signInButton).toBeInTheDocument();
      expect(signInButton).toHaveAttribute("href", "/signin");

      expect(signUpButton).toBeInTheDocument();
      expect(signUpButton).toHaveAttribute("href", "/signup");
    });

    it("should not render the button Sign out", async () => {
      await renderAuthButtons();

      const signOutButton = screen.queryByRole("link", {
        name: /sign out/i,
      });

      expect(signOutButton).not.toBeInTheDocument();
    });
  });
});
