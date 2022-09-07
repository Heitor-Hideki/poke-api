import React, {useContext} from "react";
import FavoriteContext from "../contexts/favoritesContext";

interface Ipokemon {
    pokemon: {
        name: never,
        sprites: any,
        types: any,
        id: any,
    }
}

const Pokemon = (props:Ipokemon) => {
    const {favoritePokemons, updateFavoritePokemons} = useContext(FavoriteContext)
    const {pokemon} = props
    const onFavClick = () => {
        updateFavoritePokemons(pokemon.name)
    }
    const heart = favoritePokemons.includes(pokemon.name) ? "💗" : "🖤" 
    return (
        <div className="pokemonCard">
            <div className="pokemonImgContainer">
                <img alt={pokemon.name} src={pokemon.sprites.front_default} className="pokemonImg"/>
            </div>
            <div className="cardBody">
                <div className="cardTop">
                    <h3>{pokemon.name}</h3>
                    <div>#{pokemon.id}</div>
                </div>
                <div className="cardBottom">
                    <div className="pokemonType">
                        {pokemon.types.map((type:any, index:any) => {
                            return (
                                <div key={index} className="pokemonTypeText">{type.type.name}</div>
                            )
                        })}
                    </div>
                    <button onClick={onFavClick} className="pokemonFavorite">{heart}</button>
                </div>
            </div>
        </div>
    )
}

export default Pokemon