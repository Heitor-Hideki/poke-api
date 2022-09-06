import React from "react";

const Pokedex = (props: any) => {
    const {pokemons, loading} = props;
    console.log("pokemons: ", pokemons)
    return (
        <div>
            <div className="pokedexHeader">
                <h1>Pokedex</h1>
                <div>Paginação</div>
            </div>
        {loading ? (<div>Carregando, espere um pouco.</div>) : (<div className='pokedexGrid'>
            {pokemons && pokemons.map((pokemon: any, index: any) => {
                return (<div> 
                    <div> Nome: {pokemon.name} </div>
                    <img src={pokemons.url} alt=""></img>
                </div>)
                })}
        </div>)}
        </div>
    )
}

export default Pokedex;