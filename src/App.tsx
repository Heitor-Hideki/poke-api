import React, {useEffect, useState, useContext} from 'react';
import './App.css';
import Navbar from "./components/navbar"
import Searchbar from './components/Searchbar';
import Pokedex from './components/Pokedex'
import { getPokemonData, getPokemons } from './api';
import { FavoriteProvider } from './contexts/favoritesContext';

interface Ipokemon {
  url: string
}

function App() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false)
  const [pokemons, setPokemons] = useState<Ipokemon[]>([]);
  const [favorites, setFavorites] =  useState<any[]>([])
  const itensPerPage = 25
  const fetchPokemons = async () => {
    try {
      setLoading(true)
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
  useEffect(() => {
    console.log("caregou")
    fetchPokemons();
    }, [page]);
  
  const updateFavoritePokemons = (name:any) => {
    const updatedFavorites = [...favorites]
    const favoriteIndex = favorites.indexOf(name)
    if (favoriteIndex >= 0) {
      updatedFavorites.slice(favoriteIndex, 1)
    } else {
      updatedFavorites.push(name)
    }
    setFavorites(updatedFavorites);
    return null
  }
  return (
    <FavoriteProvider 
      value={{favoritePokemons: favorites,updateFavoritePokemons: updateFavoritePokemons,}}
    >
    <div>
      <Navbar/> 
      <Searchbar/>
      <Pokedex 
        pokemons={pokemons} 
        loading={loading} 
        page={page} 
        totalPages={totalPages}
        setPage={setPage} 
      />
    </div>
    </FavoriteProvider>
  );
}

export default App;
