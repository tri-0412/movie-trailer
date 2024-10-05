// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
function Header({ onSearch }) {
  const [textSearch, setTextSearch] = useState("");

  return (
    <div className=" flex p-4 bg-black items-center justify-between">
      <div className="space-x-4 flex items-center ">
        <h1 className="text-[30px] text-red-700 font-bold">MOVIE</h1>
        <nav className="flex items-center space-x-4 ">
          <a href="#" className="text-white">
            Home
          </a>
          <a href="#" className="text-white">
            About
          </a>
          <a href="#" className="text-white">
            Contact
          </a>
        </nav>
      </div>
      <div className="space-x-4 flex items-center ">
        <input
          type="text"
          className="text-black p-3"
          placeholder="Search"
          onChange={(e) => setTextSearch(e.target.value)}
          value={textSearch}
        />
        <button
          className="p-2 text-white bg-red-700"
          onClick={() => onSearch(textSearch)}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Header;
