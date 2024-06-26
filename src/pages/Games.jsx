import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
//import Slider from "react-slick";
//import Markdown from "react-markdown";
//import remarkGfm from "remark-gfm";

// images
import LogoHD from "../assets/logo-gamepad-HD.png";

// Components
import Search from "../components/Search";
import Card from "../components/Card";

const Games = () => {
  const [data, setData] = useState();
  const [gamesList, setGamesList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${
            import.meta.env.VITE_API_KEY
          }&page=${page}`
        );
        setData(response.data);
        setGamesList(response.data.results);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);
  console.log(gamesList);
  // if (isLoading === true) {
  //   // We haven't finished checking for the data yet
  //   return <p>Loading</p>;
  // }

  return (
    <main>
      <div className="container">
        <section className="search-section">
          <img src={LogoHD} className="logoHD" alt="logo Gamepad" />
          <Search
            search={search}
            setSearch={setSearch}
            kind={"a game..."}
            destination={"/"}
          />
          <p>
            {isLoading === true
              ? "No game available"
              : `Search ${data.count} games`}
          </p>
        </section>
        {isLoading === true ? (
          <p>Loading</p>
        ) : (
          <section className="list-map">
            <h1>Most Relevance Games</h1>
            <div className="flex-parent">
              {gamesList.map((game) => {
                return <Card key={game.id} item={game} />;
              })}
            </div>
          </section>
        )}
        <section className="pagination">
          <a href="{data.next}">{data.next.split("page=")}[1]</a>
        </section>
      </div>
    </main>
  );
};

export default Games;
