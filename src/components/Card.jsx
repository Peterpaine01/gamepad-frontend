import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

// Je récupère les props
const Card = ({ item }) => {
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
      <Link to={`/game/${item.id}`}>
        <article
          className="card"
          style={{
            backgroundImage: `url(${item.background_image})`,
          }}
        >
          <div className="card-bottom">
            <h2>{item.name}</h2>
          </div>
        </article>
      </Link>
    </>
  );
};

export default Card;
