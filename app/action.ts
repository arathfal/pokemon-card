export interface IPokemonDetail {
  name: string;
  url: string;
}

export interface IPokemonData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<IPokemonDetail>;
}

export default async function fetchPokemon(urlPage: string): Promise<IPokemonData> {
  const response = await fetch(urlPage);
  const pokemons = await response?.json();

  return pokemons;
}
