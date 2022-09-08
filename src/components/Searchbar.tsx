import React from "react";
import { useState } from "react";

// interface IPokemon {
//     name: string;
//     weight: string;
//     onSearch: any;
//   }

const Searchbar = (props:any) => {
    const [search, setSearch] = useState("dito")
    const {onSearch} = props
    // const [pokemon, setPokemon] = useState<any>()
    // const [pokemon, setPokemon] = useState<IPokemon>({} as IPokemon)
    const onchangeHandler = (e: any) => {
        setSearch(e.target.value)
        if (e.target.value.length === 0) {
            onSearch(undefined)
        }
    }
    const onButtonClickHandler = () => {
        onSearch(search)
    }
    // const onSearchHandler = async (pokemon: any) => {
    //     const result = await searchPokemon(pokemon)
    //     setPokemon(result)
    //     // console.log(result)
    // }

    return (
        <div className="searchbarContainer">
            <div className="searchbar">
                <input placeholder="Buscar pokemon" onChange={onchangeHandler}></input>
            </div>
            <div>
                <button className="searchbarButton" onClick={onButtonClickHandler}>Buscar</button>
            </div>
            {/* {pokemon ? (
                <div>
                    <div className="pokemonSearchName">Nome: {pokemon.name}</div>
                    <div>Peso: {pokemon.weight}</div>
                    <img src={pokemon.sprites.front_default} alt="" />
                </div>
            ) : null} */}
        </div>
        )
}

export default Searchbar;