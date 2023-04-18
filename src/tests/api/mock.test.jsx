import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { useGetAllQuery } from "../../api/apiSlice";
import Pokemon from "../../features/pokemons/Pokemon";
import { render, screen, waitFor } from "@testing-library/react";

jest.mock("../../api/apiSlice");

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

test("Pokemon component displays data from useGetAllQuery hook", async () => {
  const mockData = {
    results: [
      {
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/bulbasaur/",
      },
    ],
  };

  useGetAllQuery.mockReturnValue({
    data: mockData,
    isLoading: false,
    isError: false,
    isSuccess: true,
  });

  render(
    <Provider store={store}>
      <Pokemon />
    </Provider>
  );

  expect(screen.getByText("Loading...")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  });
});
