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
    <main className="project-page">
      <div className="wrap">
        <div className="container">
          <section
            className="flex-parent two-colums"
            // style={{
            //   backgroundImage: `url(` + project.preview.secure_url + `)`,
            // }}
          ></section>
        </div>
      </div>
    </main>
  );
};

export default GameDetail;
