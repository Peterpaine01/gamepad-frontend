import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Je récupère les props
const Search = ({ kind, destination, gamesList, setGamesList }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    const filteredGames = gamesList.filter((game) =>
      game.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearch(value);
    console.log(value);
    setGamesList(filteredGames);
    console.log(filteredGames);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.value;
    const filteredGames = gamesList.filter((game) =>
      game.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearch(value);
    console.log(value);
    setGamesList(filteredGames);
    console.log(filteredGames);
  };

  return (
    <>
      <div className="search">
        <form onChange={handleChange} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder={`Search for ${kind}`}
            onChange={handleChange}
            value={search}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </form>
      </div>
    </>
  );
};

export default Search;
