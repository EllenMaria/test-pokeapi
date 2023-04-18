import favoritesReducer, {
  addToFavorites,
} from "../../features/pokemons/favoriteSlice";
import { useLocalStorage } from "../../hooks/useLocalStorage";

describe("localStorage tests", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("adds a new favorite to localStorage", () => {
    const singlePokemon = { id: 1, name: "Bulbasaur" };
    const key = "favorites";
    const defaultValue = [];
    const [getFavorites, setFavorites] = useLocalStorage(key, defaultValue);

    expect(getFavorites()).toEqual([]);

    setFavorites([singlePokemon]);
    expect(getFavorites()).toEqual([singlePokemon]);

    const action = addToFavorites({ id: 2, name: "Ivysaur" });
    const nextState = favoritesReducer({ favorites: [singlePokemon] }, action);

    expect(nextState.favorites).toEqual([
      singlePokemon,
      { id: 2, name: "Ivysaur" },
    ]);

    const storageContent = JSON.parse(localStorage.getItem(key));
    expect(storageContent).toEqual(nextState.favorites);
  });

  test("removes a favorite from localStorage", () => {
    const singlePokemon = { id: 1, name: "Bulbasaur" };
    const anotherPokemon = { id: 2, name: "Ivysaur" };
    const key = "favorites";
    const defaultValue = [singlePokemon, anotherPokemon];
    const [getFavorites, setFavorites] = useLocalStorage(key, defaultValue);

    expect(getFavorites()).toEqual([singlePokemon, anotherPokemon]);

    const action = addToFavorites(singlePokemon);
    const nextState = favoritesReducer({ favorites: defaultValue }, action);

    expect(nextState.favorites).toEqual([anotherPokemon]);
    setFavorites(nextState.favorites);
    expect(getFavorites()).toEqual([anotherPokemon]);
  });
});
