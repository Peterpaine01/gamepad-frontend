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
import Filters from "../components/Filters";
import Card from "../components/Card";

const Games = () => {
  const [data, setData] = useState();
  const [gamesList, setGamesList] = useState();
  const [platformsList, setPlatformsList] = useState();
  const [genresList, setGenresList] = useState();
  const [sortList, setSortList] = useState();
  const [filtersList, setFiltersList] = useState({
    platform: "",
    genre: "",
    sort: "",
  });
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${
            import.meta.env.VITE_API_KEY
          }&page=${page}&search=${search}${filtersList.platform}${
            filtersList.genre
          }&ordering=${filtersList.sort}`
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
    const fetchPlatforms = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/platforms/lists/parents?key=${
            import.meta.env.VITE_API_KEY
          }`
        );
        const platformsSorted = response.data.results.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setPlatformsList(platformsSorted);
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/genres?key=${import.meta.env.VITE_API_KEY}`
        );
        const genresSorted = response.data.results.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setGenresList(genresSorted);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
    fetchPlatforms();
    fetchGenres();
  }, [page, search, filtersList]);

  console.log(
    "data url>",
    `https://api.rawg.io/api/games?key=${
      import.meta.env.VITE_API_KEY
    }&page=${page}&search=${search}${filtersList.platform}${
      filtersList.genre
    }&ordering=${filtersList.sort}`
  );
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

          {isLoading === true ? (
            <p>No game available</p>
          ) : search ? (
            <>
              <p className="serch-results">
                Search result for <l>“{search}“</l>
              </p>
              <p className="search-count">{data.count} games</p>
            </>
          ) : (
            <p>Search {data.count} games</p>
          )}
        </section>
        {isLoading === true ? (
          <p>Loading</p>
        ) : (
          <>
            <section className="filters-section">
              <Filters
                filtersList={filtersList}
                setFiltersList={setFiltersList}
                platformsList={platformsList}
                genresList={genresList}
                setGenresList={setGenresList}
              />
            </section>
            <section className="list-map">
              {/* <h1>Most Relevance Games</h1> */}
              <div className="flex-parent">
                {gamesList.map((game) => {
                  return <Card key={game.id} item={game} />;
                })}
              </div>
            </section>
          </>
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
