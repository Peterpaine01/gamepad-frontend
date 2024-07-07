import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Je récupère les props
const Filters = ({
  platformsList,
  genresList,
  sortList,
  filtersList,
  setFiltersList,
}) => {
  const navigate = useNavigate();
  const [platform, setPlatform] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setFiltersList({ platform: platform, genre: genre, sort: sort });
    console.log("filtersList >", filtersList);
  };

  const handleChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    const idFilter = event.target.id;
    if (idFilter === "platforms") {
      setPlatform(value);
      console.log("platform >", platform);
    }
    if (idFilter === "genres") {
      setGenre(value);
      console.log("genre >", genre);
    }
    if (idFilter === "sort") {
      setSort(value);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex-parent">
        <div className="left flex-parent align-items">
          <div className="dropdown-filter">
            <label className="label-dropdown-list" htmlFor="platforms">
              Platforms :
            </label>
            <select
              name="platforms"
              id="platforms"
              className="dropdown-list"
              onChange={handleChange}
            >
              <option value="">All</option>
              {platformsList.map((platform) => {
                return (
                  <option key={platform.id} value={`&platforms=${platform.id}`}>
                    {platform.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="dropdown-filter">
            <label className="label-dropdown-list" htmlFor="genres">
              Type :
            </label>
            <select
              name="genres"
              id="genres"
              className="dropdown-list"
              onChange={handleChange}
            >
              <option value="">All</option>
              {genresList.map((genre) => {
                return (
                  <option key={genre.id} value={`&genres=${genre.id}`}>
                    {genre.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <aside className="flex-parent align-items">
          <div className="dropdown-filter">
            <label className="label-dropdown-list" htmlFor="sort">
              Sort by :
            </label>
            <select
              name="sort"
              id="sort"
              className="dropdown-list"
              onChange={handleChange}
            >
              <option value="">Default</option>
              <option value="name">Ascending</option>
              <option value="-name">Descending</option>
            </select>
          </div>

          <button type="submit" className="btn-solid">
            Go filter !
          </button>
        </aside>
      </form>
    </>
  );
};

export default Filters;
