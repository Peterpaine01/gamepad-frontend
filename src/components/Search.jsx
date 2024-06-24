import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Je récupère les props
const Search = ({ search, setSearch, kind, destination }) => {
  const [searchReq, setSearchReq] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchReq(value);
    console.log(searchReq);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSearch(searchReq);
    console.log(search);
    navigate({ destination });
    setSearchReq("");
  };

  return (
    <>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder={`Search for ${kind}`}
            onChange={handleChange}
            value={searchReq}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </form>
      </div>
    </>
  );
};

export default Search;
