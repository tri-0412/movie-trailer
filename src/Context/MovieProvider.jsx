import { createContext, useState } from "react";
import Modal from "react-modal";
import YouTube from "react-youtube";
import PropTypes from "prop-types";

// Tạo MovieContext
export const MovieContext = createContext();

// Tùy chọn cho YouTube player
const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 1, // Bắt đầu tự động phát video
  },
};

// eslint-disable-next-line react/prop-types
export const MovieProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

  const handleTrailer = async (id) => {
    setTrailerKey(""); // Reset trailer key trước khi gọi API
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, // Lấy API key từ biến môi trường
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);

      // Nếu có trailer, cập nhật trailer key và mở modal
      if (data.results && data.results.length > 0) {
        setTrailerKey(data.results[0].key);
        setModalIsOpen(true);
      } else {
        console.log("No trailers found.");
      }
    } catch (error) {
      setModalIsOpen(false);
      console.log("Error fetching trailer:", error);
    }
  };

  return (
    <MovieContext.Provider value={{ handleTrailer }}>
      {children}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            position: "fixed",
            zIndex: 9999,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
        contentLabel="Movie Trailer Modal"
      >
        {trailerKey ? (
          <YouTube videoId={trailerKey} opts={opts} />
        ) : (
          <p>Loading trailer...</p>
        )}
      </Modal>
    </MovieContext.Provider>
  );
};

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
