import { useState, useEffect } from "react";

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
              setPokemon((array) => [...array, pokemonData]);
            });
        });
      });
  }, []);

  return (
    <div className="container">
      <h1>Gotta catch them all</h1>
      <div className="two-columns">
        <div className="grid">
          {/* pokemon cards */}
          {pokemon.map((pok, index) => (
            <div
              key={pok.id + index.toString()}
              className="pokemon-card"
              onClick={() => setSelectedPokemon(pok)}
            >
              <img
                src={pok.sprites.front_default}
                alt={pok.name}
                className="pokemon-card-image"
              />
              <h2 className="pokemon-card-title">{pok.name}</h2>
              <p className="pokemon-card-subtitle">
                {pok.types.map((type) => type.type.name).join(", ")}
              </p>
            </div>
          ))}
        </div>
        {/* selected Pokemon- bigger card */}
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
