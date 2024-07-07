import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
//import Slider from "react-slick";
//import Markdown from "react-markdown";
//import remarkGfm from "remark-gfm";

// images
import LogoHD from "../assets/logo-gamepad-HD.png";

// Components
import Underconstruction from "../components/Underconstruction";

const MyCollection = () => {
  const [data, setData] = useState();
  const [gamesList, setGamesList] = useState();
  const [platformsList, setPlatformsList] = useState();
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
          }${filtersList.sort}`
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

    fetchData();
    fetchPlatforms();
  }, [page, search]);

  console.log(
    "data >",
    `https://api.rawg.io/api/games?key=${
      import.meta.env.VITE_API_KEY
    }&page=${page}&search=${search}${filtersList.platform}${filtersList.genre}${
      filtersList.sort
    }`
  );
  console.log("prevPage >", prevPage);

  return (
    <main>
      <div className="container">
        <Underconstruction />
      </div>
    </main>
  );
};

export default MyCollection;
