import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
//import Slider from "react-slick";
//import Markdown from "react-markdown";
//import remarkGfm from "remark-gfm";

// images

const GameDetail = () => {
  const [gameDetail, setGameDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${
            import.meta.env.VITE_API_KEY
          }`
        );
        setGameDetail(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  // Settings slider
  // const settings = {
  //   dots: false,
  //   infinite: false,
  //   speed: 300,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   initialSlide: 0,
  //   prevArrow: (
  //     <button type="button" class="slick-prev">
  //       <i class="fa-solid fa-angle-left"></i>
  //     </button>
  //   ),
  //   nextArrow: (
  //     <button type="button" class="slick-prev">
  //       <i class="fa-solid fa-angle-right"></i>
  //     </button>
  //   ),
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         // infinite: true,
  //         dots: false,
  //         // arrows: false,
  //       },
  //     },
  //     {
  //       breakpoint: 990,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         // arrows: false,
  //       },
  //     },
  //     {
  //       breakpoint: 920,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         // arrows: false,
  //       },
  //     },
  //     {
  //       breakpoint: 640,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         // arrows: false,
  //       },
  //     },
  //   ],
  // };

  console.log(gameDetail);

  if (isLoading === true) {
    // We haven't finished checking for the data yet
    return <p>Loading</p>;
  }

  return (
    <main className="game-page">
      <div className="container">
        <section>
          <h1 className="game-title">{gameDetail.name}</h1>
          <div className="flex-parent two-columns">
            <div className="img-column">
              <img src={gameDetail.background_image} alt="" />
            </div>
            <div className="details-colum">
              <div className="flex-start">
                <button className="btn-favoris">
                  <p>Save to Collection</p>
                  <i className="fa-regular fa-bookmark"></i>
                </button>
                <button className="btn-favoris">
                  <p>Add a Review</p>
                  <i className="fa-regular fa-message"></i>
                </button>
              </div>
              {/* Platforms & genres */}
              <div className="space-between two-columns">
                <div className="spec">
                  <h3>Plateforms</h3>
                  <p>
                    {gameDetail.platforms.map((platform, index) => {
                      return (
                        <>
                          <span key={index}>{platform.platform.name}</span>
                          {index === gameDetail.platforms.length - 1
                            ? ""
                            : ", "}
                        </>
                      );
                    })}
                  </p>
                </div>
                <div className="spec">
                  <h3>Genre</h3>
                  <p>
                    {gameDetail.genres.map((genre, index) => {
                      return (
                        <>
                          <span key={index}>{genre.name}</span>
                          {index === gameDetail.genres.length - 1 ? "" : ", "}
                        </>
                      );
                    })}
                  </p>
                </div>
              </div>
              {/* Release date & dev */}
              <div className="space-between two-columns">
                <div className="spec">
                  <h3>Release date</h3>
                  <p>{gameDetail.released}</p>
                </div>
                <div className="spec">
                  <h3>Developper</h3>
                  <p>
                    {gameDetail.developers.map((developer, index) => {
                      return (
                        <>
                          <span key={index}>{developer.name}</span>
                          {index === gameDetail.developers.length - 1
                            ? ""
                            : ", "}
                        </>
                      );
                    })}
                  </p>
                </div>
              </div>
              {/* Publisher & Age rating */}
              <div className="space-between two-columns">
                {gameDetail.publishers.length !== 0 && (
                  <div className="spec">
                    <h3>Publisher</h3>
                    <p>
                      {gameDetail.publishers.map((publisher, index) => {
                        return (
                          <>
                            <span key={index}>{publisher.name}</span>
                            {index === gameDetail.publishers.length - 1
                              ? ""
                              : ", "}
                          </>
                        );
                      })}
                    </p>
                  </div>
                )}
                {gameDetail.esrb_rating && (
                  <div className="spec">
                    <h3>Age rating</h3>
                    <p>
                      {gameDetail.esrb_rating.map((esrb_rating, index) => {
                        return (
                          <>
                            <span key={index}>{esrb_rating.name}</span>
                            {index === gameDetail.esrb_rating.length - 1
                              ? ""
                              : ", "}
                          </>
                        );
                      })}
                    </p>
                  </div>
                )}
              </div>
              <div className="one-columns">
                {gameDetail.description && (
                  <div className="spec">
                    <h3>About</h3>
                    <p>{gameDetail.description_raw}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default GameDetail;
