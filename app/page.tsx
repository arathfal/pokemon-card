'use client';

import { useQuery } from 'react-query';
import fetchPokemon, { IPokemonDetail } from './action';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Card from '@/components/Card';
import Pagination from '@/components/Pagination';
import SearchInput from '@/components/SearchInput';

export default function Home() {
  const LIMIT = 12;
  const [search, setSearch] = useState<string>('');
  const [pokemons, setPokemons] = useState<IPokemonDetail[]>([]);
  const [page, setPage] = useState<number>(1);
  const [url, setUrl] = useState<string>(
    `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=0`,
  );

  const { data } = useQuery(['pokemons', url], () => fetchPokemon(url));

  const dataPrev = data?.previous;
  const dataNext = data?.next;

  const onPrev = useCallback(() => {
    if (dataPrev) {
      setUrl(dataPrev);
      setPage((prev) => prev - 1);
    }
  }, [dataPrev]);

  const onNext = useCallback(() => {
    if (dataNext) {
      setPage((prev) => prev + 1);
      setUrl(dataNext);
    }
  }, [dataNext]);

  useEffect(() => {
    if (data?.results?.length) {
      const pokes = data?.results?.map((val, index) => {
        // page - 1, because offset from the api is started by 0;
        const pokeNumb = (page - 1) * LIMIT + (index + 1);
        return {
          ...val,
          url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNumb}.png`,
        };
      });

      setPokemons(pokes);
    }
  }, [data, page]);

  const pokemonList = useMemo(() => {
    if (search) {
      return pokemons?.filter((poke) => poke?.name?.toLowerCase()?.includes(search?.toLowerCase()));
    }

    return pokemons;
  }, [search, pokemons]);

  return (
    <main className="p-10">
      <h1 className='text-5xl text-center mb-10'>
        <strong>Pokedex</strong>
      </h1>
      <div className="flex justify-between gap-4">
        <SearchInput value={search} onChange={(e) => setSearch(e?.target?.value)} />
        <Pagination
          disabledPrev={!dataPrev}
          disabledNext={!dataNext}
          onPrev={onPrev}
          onNext={onNext}
          totalCount={data?.count || 0}
          limit={LIMIT}
          page={page}
        />
      </div>
      <div className="grid grid-cols-6 gap-4 mt-10">
        {pokemonList?.map((pokemon, index) => {
          const pokeNumb = index + 1;
          return (
            <Card key={`${pokeNumb}-${pokemon?.name}`} img={pokemon?.url} name={pokemon?.name} />
          );
        })}
      </div>
    </main>
  );
}
