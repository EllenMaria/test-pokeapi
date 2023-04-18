import { addToFavorites } from "../../features/pokemons/favoriteSlice";
import reducer from "../../features/pokemons/favoriteSlice";
const initialState = { favorites: [] };

describe("addToFavorites reducer", () => {
  test("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  // test("should handle a pokemon being added to an empty favorite list", () => {
  //   const previousState = [];

  //   expect(reducer(previousState, addToFavorites({name: "pokemon"}))).toEqual([
  //     { favorites: [{name: "pokemon"}], count: 1 },
  //   ]);
  // });

  test("should handle addToFavorites adding a new item", () => {
    const pokemon = { id: 1, name: "Bulbasaur" };
    const action = addToFavorites(pokemon);
    const nextState = reducer(initialState, action);

    expect(nextState.favorites.length).toEqual(1);
    expect(nextState.favorites[0]).toEqual(pokemon);
  });

  test("should handle addToFavorites removing an existing item", () => {
    const pokemon1 = { id: 1, name: "Bulbasaur" };
    const pokemon2 = { id: 2, name: "Charmander" };
    const state = { favorites: [pokemon1, pokemon2]};
    const action = addToFavorites(pokemon1);
    const nextState = reducer(state, action);

    expect(nextState.favorites.length).toEqual(1);
    expect(nextState.favorites[0]).toEqual(pokemon2);
  });

  test("should handle addToFavorites when item is already in favorites", () => {
    const pokemon1 = { id: 1, name: "Bulbasaur" };
    const pokemon2 = { id: 2, name: "Charmander" };
    const state = { favorites: [pokemon1, pokemon2]};
    const action = addToFavorites(pokemon2);
    const nextState = reducer(state, action);

    expect(nextState.favorites.length).toEqual(1);
    expect(nextState.favorites[0]).toEqual(pokemon1);
  });
});
