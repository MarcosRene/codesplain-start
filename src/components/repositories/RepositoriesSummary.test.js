import { render, screen } from "@testing-library/react";

import RepositoriesSummary from "./RepositoriesSummary";

const ownerProps = {
  stargazers_count: 42125,
  open_issues: 1,
  forks: 3874,
  language: "Javascript",
};

describe("<RepositoriesSummary/>", () => {
  it("should render the component correctly", () => {
    render(<RepositoriesSummary repository={ownerProps} />);

    for (let key in ownerProps) {
      expect(
        screen.getByText(new RegExp(ownerProps[key], "i"))
      ).toBeInTheDocument();
    }
  });
});
