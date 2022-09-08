import React, {useEffect, useState, useContext} from 'react';
import './App.css';
import Navbar from "./components/navbar"
import Searchbar from './components/Searchbar';
import Pokedex from './components/Pokedex'
import { getPokemonData, getPokemons, searchPokemon } from './api';
import { FavoriteProvider } from './contexts/favoritesContext';

interface Ipokemon {
  url: string
  name: string
  pokemon: {
    name: string,
    sprites: any,
    types: string,
    id: number,
}
}

const favoritesKey = "f"
function App() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [pokemons, setPokemons] = useState<Ipokemon[]>([]);
  const [favorites, setFavorites] =  useState<any[]>([])
  const itensPerPage = 25
  const fetchPokemons = async () => {
    try {
      setLoading(true)
      setNotFound(false)
      const data = await getPokemons(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon:Ipokemon) => {
        return await getPokemonData(pokemon.url)
      })
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotalPages(Math.ceil(data.count / itensPerPage))
    } catch (error) {
      console.log("fetchPokemonsError: ", error)
    }
  }
  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey) as any) || []
    setFavorites(pokemons)
  }

  useEffect(() => {
    loadFavoritePokemons();
    }, []);
  useEffect(() => {
    fetchPokemons();
    }, [page]);
  
  const updateFavoritePokemons = (name:Ipokemon) => {
    const updatedFavorites = [...favorites]
    const favoriteIndex = favorites.indexOf(name)
    if (favoriteIndex >= 0) {
      updatedFavorites.splice(favoriteIndex, 1)
    } else {
      updatedFavorites.push(name)
    }
    window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites))
    setFavorites(updatedFavorites);
    return null
  }
const onSearchHandler = async (pokemon:Ipokemon) => {
  if (!pokemon) {
    return fetchPokemons();
  } 
  setLoading(true)
  setNotFound(false)
  const result = await searchPokemon(pokemon)
  if (!result) {
    setNotFound(true)
  } else {
    setPokemons([result])
    setPage(0)
    setTotalPages(1)
  }
  setLoading(false)
}

  return (
    <FavoriteProvider 
      value={{favoritePokemons: favorites,updateFavoritePokemons: updateFavoritePokemons,}}
    >
    <div>
      <Navbar/> 
      <Searchbar onSearch={onSearchHandler}/>
      {notFound 
      ?
      <div className='notFoundText'>Nada poggers isso aí</div> 
      :
      <Pokedex 
        pokemons={pokemons} 
        loading={loading} 
        page={page} 
        totalPages={totalPages}
        setPage={setPage} 
      />}
    </div>
    </FavoriteProvider>
  );
}

export default App;
