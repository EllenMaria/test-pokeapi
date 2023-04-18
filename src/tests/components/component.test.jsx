import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { useGetAllQuery } from "../../api/apiSlice";
import Pokemon from "../../features/pokemons/Pokemon";

jest.mock("../../api/apiSlice");

describe("Pokemon component", () => {
  const mockStore = configureStore([]);
  const initialState = {
    favorites: {
      favorites: [],
    },
  };
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test("renders the component", async () => {
    useGetAllQuery.mockReturnValue({
      data: {
        results: [
          {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/bulbasaur/",
          },
        ],
      },
      isLoading: false,
      isFetching: false,
    });

    render(
      <Provider store={store}>
        <Pokemon />
      </Provider>
    );

    expect(screen.getByTestId("pokemon-component")).toBeInTheDocument();
    expect(screen.getByText("Lista")).toBeInTheDocument();
    expect(screen.getByText("Todos")).toBeInTheDocument();
    expect(screen.getByText("Favoritos")).toBeInTheDocument();
    expect(screen.getByTestId("total")).toBeInTheDocument();
    expect(screen.getByTestId("button-loadmore")).toBeInTheDocument();
    const totalLength = screen.getByTestId("total");
    expect(totalLength).toHaveTextContent(`Total: 1`);
  });

  test("renders the component with error", async () => {
    useGetAllQuery.mockReturnValue({
      error: {
        message: "Something went wrong",
      },
      isLoading: false,
      isFetching: false,
    });

    render(
      <Provider store={store}>
        <Pokemon />
      </Provider>
    );

    expect(screen.getByText("Error: Something went wrong")).toBeInTheDocument();
  });

  test("renders the favorites tab as disabled if there are no favorites", async () => {
    useGetAllQuery.mockReturnValue({
      data: [{}],
      isLoading: false,
      isFetching: false,
    });

    render(
      <Provider store={store}>
        <Pokemon />
      </Provider>
    );

    expect(screen.getByText("Favoritos")).toBeDisabled();
  });

  test("clicking the load more button calls useGetAllQuery with the expected limit", async () => {
    useGetAllQuery.mockReturnValue({
      data: {
        results: [
          {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/bulbasaur/",
          },
          {
            name: "charmander",
            url: "https://pokeapi.co/api/v2/pokemon/charmander/",
          },
        ],
      },
      isLoading: false,
      isFetching: false,
    });

    render(
      <Provider store={store}>
        <Pokemon />
      </Provider>
    );

    const loadMoreButton = screen.getByTestId("button-loadmore");

    expect(useGetAllQuery).toHaveBeenCalledWith(12);

    await waitFor(() => {
      fireEvent.click(loadMoreButton);
    });
    expect(useGetAllQuery).toHaveBeenCalledWith(20);
  });
});
