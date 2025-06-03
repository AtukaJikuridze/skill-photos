import type { UnsplashTag } from "../types/fetch";
import type { PhotoFilters } from "../types/filter-types";

export const fetchImages = async (
  query: string,
  page = 1,
  filters: PhotoFilters = {}
) => {
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  if (!ACCESS_KEY) {
    throw new Error("Unsplash access key is missing");
  }

  const params = new URLSearchParams({
    query: query,
    page: page.toString(),
    per_page: "12",
    client_id: ACCESS_KEY,
    ...(filters.orderBy && { order_by: filters.orderBy }),
    ...(filters.orientation && { orientation: filters.orientation }),
    ...(filters.color && { color: filters.color }),
  });

  const url = `${
    import.meta.env.VITE_UNSPLASH_BASE_URL
  }/search/photos?${params.toString()}`;
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

export const fetchImage = async (id: string, ACCESS_KEY: string) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_UNSPLASH_BASE_URL
      }/photos/${id}?client_id=${ACCESS_KEY}`
    );
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};

export const fetchRelatedPhotos = async (tags: UnsplashTag[]) => {
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  if (!ACCESS_KEY) {
    throw new Error("Unsplash access key is missing");
  }

  const tagQuery = tags
    .slice(0, 2)
    .map((tag) => tag.title)
    .join(" OR ");

  if (!tagQuery) return [];

  const url = `${
    import.meta.env.VITE_UNSPLASH_BASE_URL
  }/search/photos?query=${encodeURIComponent(
    tagQuery
  )}&per_page=6&client_id=${ACCESS_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(
      `Failed to fetch related photos: ${res.status} - ${errText}`
    );
  }

  const data = await res.json();
  return data.results;
};
