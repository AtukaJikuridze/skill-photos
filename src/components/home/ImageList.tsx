// components/ImageList.tsx

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchImages } from "../../api/unsplash";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ImageList = ({ query }: { query: string }) => {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["images", query],
    queryFn: ({ pageParam = 1 }) => fetchImages(query, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length < lastPage.totalPages) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 10 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading images</p>;

  return (
    <>
      <div className="columns-1 sm:columns-2 md:columns-4 gap-4 p-4">
        {data?.pages.map((page) =>
          page.images.map((img: any) => (
            <Link
              to={`/image/${img.id}`}
              key={img.id}
              className="block mb-4 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <img
                src={img.urls.small}
                alt={img.alt_description}
                className="w-full rounded-lg"
                loading="lazy"
              />
            </Link>
          ))
        )}
      </div>
      {isFetchingNextPage && (
        <div className="text-center py-4">Loading more...</div>
      )}
    </>
  );
};

export default ImageList;
