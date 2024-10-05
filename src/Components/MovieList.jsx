/* eslint-disable react/prop-types */

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MovieContext } from "../Context/MovieProvider";
import { useContext } from "react";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1200, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

function MovieList({ title, data }) {
  const { handleTrailer } = useContext(MovieContext);

  return (
    <div className="text-white p-10 mb-10">
      <h2 className="uppercase text-xl mb-4">{title}</h2>
      <Carousel responsive={responsive}>
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <div
              key={item.id}
              className="h-[300px] w-[200px] relative group "
              onClick={() => handleTrailer(item.id)}
            >
              <div className="h-full w-full  group-hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer">
                <div className="absolute top-0 left-0 h-full w-full bg-black/40" />
                <img
                  src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`}
                  alt={item.name}
                  className="h-full w-full object-cover  "
                />
                <div className="absolute bottom-4 left-2">
                  <p className="uppercase text-sm ">
                    {item.title || item.original_title}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
}

export default MovieList;
