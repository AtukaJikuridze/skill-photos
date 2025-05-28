import React, { useState } from "react";
import Search from "../../components/home/Search";
import ImageList from "../../components/home/ImageList";

const Home: React.FC = () => {
  const [debounceValue, setDebouncedValue] = useState<string>("");

  return (
    <main className="container ">
      <Search setDebouncedValue={setDebouncedValue} />
      <ImageList query={debounceValue} />
    </main>
  );
};

export default Home;
