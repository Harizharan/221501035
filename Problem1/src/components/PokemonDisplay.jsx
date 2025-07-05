import React, { useState, useEffect } from "react";

const PokemonDisplay = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPokemon = async () => {
    if (!pokemonName) return;

    setLoading(true);
    setError(null);
    setPokemonData(null);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error(`Pokemon "${pokemonName}" not found.`);
      }
      const data = await response.json();
      setPokemonData({
        name: data.name,
        image: data.sprites.front_default,
        type: data.types.map((typeInfo) => typeInfo.type.name).join(", "),
        abilities: data.abilities
          .map((abilityInfo) => abilityInfo.ability.name)
          .join(", "),
        stats: data.stats.reduce((acc, stat) => {
          acc[stat.stat.name] = stat.base_stat;
          return acc;
        }, {}),
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setPokemonName(e.target.value);
  };

  const handleSearchClick = () => {
    fetchPokemon();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchPokemon();
    }
  };

  return (
    <div className="pokemon-display-container">
      <h1>POKIDEX</h1>
      <div className="search-section">
        <input
          type="text"
          value={pokemonName}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter Pokemon name"
          className="pokemon-input"
        />
        <button onClick={handleSearchClick} className="search-button">
          Search
        </button>
      </div>

      {loading && <p className="loading-message">Loading Pokemon data...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      {pokemonData && (
        <div className="pokemon-card">
          <h2>{pokemonData.name.toUpperCase()}</h2>
          <img
            src={pokemonData.image}
            alt={pokemonData.name}
            className="pokemon-image"
          />
          <div className="pokemon-details">
            <p>
              <strong>Type:</strong> {pokemonData.type}
            </p>
            <p>
              <strong>Abilities:</strong> {pokemonData.abilities}
            </p>
            <h3>Stats:</h3>
            <ul>
              {Object.entries(pokemonData.stats).map(
                ([statName, statValue]) => (
                  <li key={statName}>
                    <strong>
                      {statName
                        .replace("special-", "Sp. ")
                        .replace("attack", "Attack")
                        .replace("defense", "Defense")
                        .replace("hp", "HP")}
                      :
                    </strong>{" "}
                    {statValue}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDisplay;
