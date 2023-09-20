import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import RepositoriesListItem from "./RepositoriesListItem";

const ownerProps = {
  full_name: "typescript-cheatsheets/react",
  language: "Javascript",
  description:
    "Cheatsheets for experienced React developers getting started with TypeScript",
  owner: {
    login: "typescript-cheatsheets",
  },
  name: "react",
  html_url: "https://github.com/typescript-cheatsheets/react",
};

describe("<RepositoriesListItem />", () => {
  it("should render repository link on github", async () => {
    render(
      <MemoryRouter>
        <RepositoriesListItem repository={ownerProps} />
      </MemoryRouter>
    );

    await screen.findByRole("img", { name: /javascript/i });

    expect(
      screen.getByRole("link", { name: /github repository/i })
    ).toHaveAttribute("href", ownerProps.html_url);
  });

  it("should render file icon with the appropriate icon", async () => {
    render(
      <MemoryRouter>
        <RepositoriesListItem repository={ownerProps} />
      </MemoryRouter>
    );

    expect(await screen.findByRole("img", { name: /javascript/i })).toHaveClass(
      "js-icon"
    );
  });

  it("should render a link to the code editor page", async () => {
    render(
      <MemoryRouter>
        <RepositoriesListItem repository={ownerProps} />
      </MemoryRouter>
    );

    // await screen.findByRole("img", { name: /javascript/i });

    expect(
      await screen.findByRole("link", {
        name: new RegExp(ownerProps.owner.login, "i"),
      })
    ).toHaveAttribute("href", `/repositories/${ownerProps.full_name}`);
  });
});
