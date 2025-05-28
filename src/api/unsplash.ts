// api/unsplash.ts

export const fetchImages = async (query: string) => {
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  console.log(ACCESS_KEY);

  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch images");
  }
  const data = await res.json();
  return data.results;
};
