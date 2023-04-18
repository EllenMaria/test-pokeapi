import fetchMock from "jest-fetch-mock";
import { renderHook, waitFor } from "@testing-library/react";
import { useGetByIdQuery } from "../../api/apiSlice";
import { Provider } from "react-redux";
import { store } from "../../app/store";

fetchMock.enableMocks();

function Wrapper({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("Pokemon API", () => {
  const pokemon = "bulbasaur";
  const data = {};

  beforeAll(() => {
    fetchMock.mockOnceIf(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify({ data }),
      })
    );
  });

  it("should render correctly", async () => {
    const {result} = renderHook(() => useGetByIdQuery(pokemon), { wrapper: Wrapper });
  

  expect(result.current).toMatchObject({
    status: 'pending',
    endpointName: "getById",
    isLoading: true,
    isSuccess: false,
    isError: false,
    isFetching: true,
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(fetchMock).toBeCalledTimes(1);

    expect(result.current).toMatchObject({
      status: "fulfilled",
      data: {},
      endpointName: "getById",
      isLoading: false,
      isSuccess: true,
      isError: false,
      isFetching: false,
    });
  });
});  

