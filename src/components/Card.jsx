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

  const addEllipsis = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <>
      <Link className="link-card" to={`/game/${item.id}`}>
        <article
          className="card"
          style={{
            backgroundImage: `url(${item.background_image})`,
          }}
        >
          <div className="card-bottom">
            <h2>{addEllipsis(item.name, 30)}</h2>
          </div>
        </article>
      </Link>
    </>
  );
};

export default Card;
