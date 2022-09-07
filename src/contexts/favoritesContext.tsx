import React from "react";

const FavoriteContext = React.createContext({
    favoritePokemons: [] as any[],
    updateFavoritePokemons: (id:any) => null
});

export const FavoriteProvider = FavoriteContext.Provider

export default FavoriteContext;