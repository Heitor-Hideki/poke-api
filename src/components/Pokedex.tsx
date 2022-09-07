import React from "react";
import Pagination from "./Pagination";
import Pokemon from "./Pokemon";

const Pokedex = (props: any) => {
    const {pokemons, loading, page, setPage ,totalPages} = props;
    const onLeftClickHandler = () => {
        if(page > 0) {
            setPage(page - 1)
        }
    }
    const onRightClickHandler = () => {
        if(page+1 !== totalPages) {
            setPage(page +1)
        }
    }
    return (
        <div>
            <div className="pokedexHeader">
                <h1>Pokedex</h1>
                <Pagination 
                page={page+1}
                totalPages={totalPages}
                onLeftClick={onLeftClickHandler}
                onRightClick={onRightClickHandler}
                />
            </div>
        {loading ? (<div>Carregando, espere um pouco.</div>) : (<div className='pokedexGrid'>
            {pokemons && pokemons.map((pokemon: any, index: any) => {
                return (<Pokemon key={index} pokemon={pokemon}/>)
                })}
        </div>)}
        </div>
    )
}

export default Pokedex;