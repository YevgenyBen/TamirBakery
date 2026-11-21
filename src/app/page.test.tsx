import { render, screen } from "@testing-library/react";
import { axe } from "@/test/axe";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("home page", () => {
  it("shows the business name as the only h1", () => {
    render(<Home />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("מאפיית תמיר");
  });

  it("marks the English line as English, left to right", () => {
    render(<Home />);
    const english = screen.getByText(/Tamir Bakery/);
    expect(english).toHaveAttribute("lang", "en");
    expect(english).toHaveAttribute("dir", "ltr");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Home />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
