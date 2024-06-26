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
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();

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
        const next = response.data.next;
        const numNext = next.split("page=");
        setNextPage(numNext[1]);

        if (response.data.previous) {
          const prev = response.data.previous;
          const numPrev = prev.split("page=");

          if (typeof numPrev[1] === "undefined") {
            setPrevPage(1);
            console.log("numPrev[1]", numPrev[1]);
          } else {
            setPrevPage(numPrev[1]);
          }
        } else {
          setPrevPage(0);
          console.log(response.data.previous);
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [page]);
  console.log("gameList >", gamesList);
  console.log("prevPage >", prevPage);

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
            gamesList={gamesList}
            setGamesList={setGamesList}
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
        {isLoading === false && (
          <section className="pagination">
            <button
              onClick={() => {
                setPage(prevPage);
              }}
              className={prevPage === 0 ? "btn-prev disabled" : "btn-prev"}
            >
              <i className="fa-solid fa-angle-left"></i>
            </button>

            <button
              onClick={() => {
                setPage(nextPage);
              }}
              className="btn-next"
            >
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </section>
        )}
      </div>
    </main>
  );
};

export default Games;
