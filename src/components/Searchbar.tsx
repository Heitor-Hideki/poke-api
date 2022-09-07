import React from "react";
import { useState } from "react";
import { searchPokemon } from "../api"; 

// interface IPokemon {
//     name: string;
//     weight: string
//   }

const Searchbar = () => {
    const [search, setSearch] = useState("dito")
    const [pokemon, setPokemon] = useState<any>()
    // const [pokemon, setPokemon] = useState<IPokemon>({} as IPokemon)
    const onchangeHandler = (e: any) => {
        setSearch(e.target.value)
    }
    const onButtonClickHandler = () => {
        onSearchHandler(search)
    }
    const onSearchHandler = async (pokemon: any) => {
        const result = await searchPokemon(pokemon)
        setPokemon(result)
        // console.log(result)
    }

    return (
        <div className="searchbarContainer">
            <div className="searchbar">
                <input placeholder="Buscar pokemon" onChange={onchangeHandler}></input>
            </div>
            <div>
                <button className="searchbarButton" onClick={onButtonClickHandler}>Buscar</button>
            </div>
            {pokemon ? (
                <div>
                    <div className="pokemonSearchName">Nome: {pokemon.name}</div>
                    <div>Peso: {pokemon.weight}</div>
                    <img src={pokemon.sprites.front_default} alt="" />
                </div>
            ) : null}
        </div>
        )
}

export default Searchbar;