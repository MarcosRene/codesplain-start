/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import HomeRoute from "./HomeRoute";

import { createServer } from "../test/server";

describe("<HomeRoute />", () => {
  createServer([
    {
      path: "/api/repositories",
      res: (req) => {
        const query = req.url.searchParams.get("q");
        const language = query.split("language:")[1];

        return {
          items: [
            {
              id: 123,
              full_name: `${language}_one`,
            },
            {
              id: 321,
              full_name: `${language}_two`,
            },
          ],
        };
      },
    },
  ]);

  it("should render two links for each table", async () => {
    render(
      <MemoryRouter>
        <HomeRoute />
      </MemoryRouter>
    );

    const languages = [
      "javascript",
      "typescript",
      "rust",
      "go",
      "python",
      "java",
    ];

    for (let language of languages) {
      const link = await screen.findAllByRole("link", {
        name: new RegExp(`${language}_`),
      });

      expect(link).toHaveLength(2);
    }
  });
});
