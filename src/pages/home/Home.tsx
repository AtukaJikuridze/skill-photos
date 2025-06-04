import React, { useState, useEffect } from "react";
import Search from "../../components/home/Search";
import ImageList from "../../components/home/ImageList";
import { useSearchParams } from "react-router-dom";

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedValue, setDebouncedValue] = useState<string>(
    searchParams.get("q") || ""
  );

  useEffect(() => {
    if (debouncedValue) {
      setSearchParams({ q: debouncedValue });
    } else {
      setSearchParams({});
    }
  }, [debouncedValue, setSearchParams]);

  return (
    <main className="container">
      <Search
        initialValue={searchParams.get("q") || ""}
        setDebouncedValue={setDebouncedValue}
      />
      {debouncedValue ? (
        <ImageList query={debouncedValue} />
      ) : (
        <div className="text-center py-12">
          <h1 className="text-4xl font-mainBold mb-4">
            მოგესალმებით ფოტო გალერეაში
          </h1>
          <p className="text-gray-600 mb-8 font-mainRegular">
            მოძებნეთ და აღმოაჩინეთ მილიონობით უფასო ფოტო
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto ">
            {["Nature", "Architecture", "Animals", "Technology"].map(
              (suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setDebouncedValue(suggestion)}
                  className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 transition-colors font-mainMedium cursor-pointer"
                >
                  {suggestion}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
