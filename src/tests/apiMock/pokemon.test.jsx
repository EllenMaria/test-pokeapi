import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { useGetAllQuery } from "../../api/apiSlice";
import { Provider } from "react-redux";
import { store } from "../../app/store";

const mockPokemonData = {
  results: [
    { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
    { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
  ],
};

const server = setupServer(
  rest.get("https://pokeapi.co/api/v2/pokemon", (req, res, ctx) => {
    return res(ctx.json(mockPokemonData));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders pokemon data", async () => {
  function TestComponent() {
    const { data, isLoading } = useGetAllQuery(12);
    // console.log(data)

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <ul>
        {data.map((result) => (
          <li key={result.name}>{result.name}</li>
        ))}
      </ul>
    );
  }

  render(
    <Provider store={store}>
      <TestComponent />
    </Provider>
  );

  expect(screen.getByText("Loading...")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("charmander")).toBeInTheDocument();
    expect(screen.getByText("squirtle")).toBeInTheDocument();
  });
});
