export const fetchImages = async (query: string, page = 1) => {
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  if (!ACCESS_KEY) {
    throw new Error("Unsplash access key is missing");
  }

  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    query
  )}&page=${page}&per_page=12&client_id=${ACCESS_KEY}`;
  console.log("Request URL:", url);

  const res = await fetch(url);

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to fetch images: ${res.status} - ${errText}`);
  }

  const data = await res.json();
  return {
    images: data.results,
    total: data.total,
    totalPages: data.total_pages,
  };
};
