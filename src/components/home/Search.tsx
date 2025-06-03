import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import FilterModal from "../filters/FilterModal";
import { useFilterStore } from "../../store/filterStore";
import { useSearchStore } from "../../store/searchStore";

interface SearchProps {
  setDebouncedValue: (value: string) => void;
  initialValue: string;
}

const Search: React.FC<SearchProps> = ({ setDebouncedValue, initialValue }) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const {
    isFilterModalOpen,
    openFilterModal,
    closeFilterModal,
    filters,
    setFilters,
  } = useFilterStore();

  const { searchHistory, addToHistory } = useSearchStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue.trim()) {
        addToHistory(inputValue);
      }
      setDebouncedValue(inputValue);
    }, 800);

    return () => clearTimeout(timer);
  }, [inputValue, setDebouncedValue, addToHistory]);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const handleTagClick = (tag: string) => {
    setInputValue(tag);
    setDebouncedValue(tag);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex justify-between items-center w-[80%] h-[50px] rounded-lg shadow-lg px-4 bg-white z-111 -translate-y-[25px] py-2">
          <div className="flex items-center gap-2 rounded-full w-full">
            <IoIosSearch className="text-paragraph text-xl translate-y-0.5" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="text-black placeholder:text-paragraph text-sm outline-none font-mainMediumborder-0 w-full"
              placeholder="მოძებნე ფოტო"
            />
          </div>
          <button
            onClick={openFilterModal}
            type="button"
            className="bg-main-blue px-4 h-full text-white rounded-md text-sm font-mainRegular cursor-pointer leading-normal sm:px-10"
          >
            გაფილტვრა
          </button>
        </div>

        {searchHistory.length > 0 && (
          <div className="w-[80%] flex flex-wrap gap-2 mt-2 ">
            {searchHistory.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="font-mainMedium cursor-pointer bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-1 transition-colors"
              >
                <span>{tag}</span>
                <IoClose
                  className="text-gray-500 hover:text-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newHistory = searchHistory.filter((t) => t !== tag);
                    useSearchStore.setState({ searchHistory: newHistory });
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
        filters={filters}
        onApplyFilters={setFilters}
      />
    </>
  );
};

export default Search;
