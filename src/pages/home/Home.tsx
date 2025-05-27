import React, { useState } from "react";
import Search from "../../components/home/Search";

const Home: React.FC = () => {
  const [debounceValue, setDebouncedValue] = useState<string>("");
  console.log(debounceValue);

  return (
    <main>
      <Search setDebouncedValue={setDebouncedValue} />
    </main>
  );
};

export default Home;
