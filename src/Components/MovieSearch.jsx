// esl
import PropType from "prop-types";
import { useContext } from "react";
import { MovieContext } from "../Context/MovieProvider";

function MovieSearch({ title, data }) {
  const { handleTrailer } = useContext(MovieContext);
  return (
    <div className="text-white p-10 mb-10">
      <h2 className="uppercase text-xl mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {data &&
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
      </div>
    </div>
  );
}

MovieSearch.propTypes = {
  title: PropType.string.isRequired,
  data: PropType.arrayOf(PropType.object).isRequired,
};

export default MovieSearch;
