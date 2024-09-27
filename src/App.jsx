import { useEffect, useState } from "react";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((pokemon) => {
          fetch(pokemon.url)
            .then((response) => response.json())
            .then((pokemonData) => {
              console.log(pokemonData);
              setPokemon((pokemon) => [...pokemon, pokemonData]);
            });
        });
      });
  }, []);

  return (
    <div className="container">
      <h1>Gotta Catch&apos;Em All</h1>
      <div className="two-columns">
        <div id="cardsContainer" className="grid">
          {pokemon.map((pokemon) => (
            <div
              key={pokemon.id}
              className="pokemon-card"
              onClick={() => setSelectedPokemon(pokemon)}
            >
              <img
                className="pokemon-card-image"
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />
              <h2 className="pokemon-card-title">{pokemon.name}</h2>
              <p className="pokemon-card-subtitle">
                {pokemon.types.map((type) => type.type.name).join(", ")}
              </p>
            </div>
          ))}
        </div>
        {selectedPokemon && (
          <div className="info">
            <img
              className="pokemon-card-image"
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
            />
            <h2 className="pokemon-card-title">{selectedPokemon.name}</h2>
            <p className="pokemon-card-subtitle">
              {selectedPokemon.types.map((type) => type.type.name).join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
