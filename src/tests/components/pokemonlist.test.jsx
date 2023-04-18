import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import fetchMock from "jest-fetch-mock";
import Pokemon from "../../features/pokemons/Pokemon";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../app/store";

fetchMock.enableMocks();

describe("Pokemon component", () => {
  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("renders successfully with fetched data", async () => {
    // Mock successful fetch response
    fetchMock.mockResponseOnce(
      JSON.stringify({
        results: [
          { id: 1, name: "bulbasaur" },
          { id: 2, name: "ivysaur" },
          { id: 3, name: "pikachu" },
        ],
      })
    );

    render(
      <Provider store={store}>
        <Router>
          <Pokemon />
        </Router>
      </Provider>
    );

    // Wait for the data to load
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    // Check if the fetched data is displayed
    expect(screen.getByText("Total: 3")).toBeInTheDocument();
  });

  it("clicking the button loads more results and updates the limit state", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        results: [
          { id: 1, name: "bulbasaur" },
          { id: 2, name: "ivysaur" },
          { id: 3, name: "pikachu" },
        ],
      })
    );

    const { getByTestId } = render(
      <Provider store={store}>
        <Pokemon />
      </Provider>
    );

    const button = getByTestId("button-loadmore");
    fireEvent.click(button);

    // Wait for the API call to finish and the component to re-render
    await waitFor(() => expect(button).toBeDisabled());

    // Check if the limit state has been updated to 20
    expect(getByTestId("total")).toHaveTextContent("Total: 3");

    // Check if there are more results being displayed
    expect(getByTestId("total")).toHaveTextContent("Total: 6");
  });
});