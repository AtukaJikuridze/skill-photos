import React, { useState, useEffect } from "react";
import Search from "../../components/home/Search";
import ImageList from "../../components/home/ImageList";
import { useSearchParams } from "react-router-dom";

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedValue, setDebouncedValue] = useState<string>(
    searchParams.get("q") || ""
  );

  // Update URL when search changes
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
      {debouncedValue ? <ImageList query={debouncedValue} /> : <h1>Hellooo</h1>}
    </main>
  );
};

export default Home;
