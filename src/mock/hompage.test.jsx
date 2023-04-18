// In src/tests/pages/home.test.jsx
import { render, screen } from "@testing-library/react";
import { Home } from "../pages/home";
import { fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { setupServer } from "msw/node";
import { rest } from "msw";

const server = setupServer(
  rest.get("https://pokeapi.co/api/v2/pokemon", (req, res, ctx) => {
    const limit = req.url.searchParams.get("limit");
    return res(ctx.json({ results: [], limit }));
  })
);

describe("<Home />", () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it("should navigates to list page", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const link = screen.getByRole("link", { name: /Ir para Lista/i });
    expect(link.getAttribute("href")).toBe("/list");

    fireEvent.click(link);

    expect(window.location.pathname).toBe("/list");
  });
});
