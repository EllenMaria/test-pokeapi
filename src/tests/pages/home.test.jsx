import { render, screen } from "@testing-library/react";
import { Home } from "../../pages/home";
import { fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";


describe("<Home />", () => {
  it("should navigates to the correct page", () => {
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
