import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";

interface SearchProps {
  setDebouncedValue: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ setDebouncedValue }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 800);

    return () => clearTimeout(timer);
  }, [inputValue, setDebouncedValue]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-between items-center w-[80%] h-[50px] rounded-lg shadow-lg px-4 bg-white z-111 -translate-y-[25px] py-2">
        <div className="flex items-center gap-2 rounded-full w-full">
          <IoIosSearch className="text-paragraph text-xl translate-y-0.5" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="text-black placeholder:text-paragraph text-sm outline-none border-0 w-full"
            placeholder="მოძებნე ფოტო"
          />
        </div>
        <button
          type="submit"
          className="bg-main-blue px-10 h-full text-white rounded-md text-sm font-mainRegular cursor-pointer leading-normal"
        >
          გაფილტვრა
        </button>
      </div>
    </div>
  );
};

export default Search;
