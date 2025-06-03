import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchImages } from "../../api/unsplash";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ImageLoader from "../loaders/ImageLoader";
import { useFilterStore } from "../../store/filterStore";
import Masonry from "react-masonry-css";
import Skeleton from "../loaders/Skeleton";

const ImageList: React.FC<{ query: string }> = ({ query }) => {
  const filters = useFilterStore((state) => state.filters);

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["images", query, filters],
    queryFn: ({ pageParam = 1 }) => fetchImages(query, pageParam, filters),
    getNextPageParam: (lastPage, allPages) => {
      console.log("Fetching page:", allPages.length + 1, allPages);
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
        scrollTop + clientHeight >= scrollHeight - 200 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        // fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) return <p>Error loading images</p>;
  const breakpointColumnsObj = {
    default: 4,
    1024: 3,
    768: 2,
    500: 1,
  };
  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid w-full flex gap-4 mt-5"
        columnClassName="my-masonry-grid_column"
      >
        {isLoading
          ? [...Array(12)].map((_, i) => (
              <div key={i}>
                <ImageLoader type="suggestion" />
              </div>
            ))
          : data?.pages.flatMap((page) =>
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
        {[...Array(12)].map((_, i) => (
          <div key={i}>
            <Skeleton />
          </div>
        ))}
      </Masonry>
      {isFetchingNextPage && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {[...Array(4)].map((_, i) => (
            <ImageLoader key={i} type="suggestion" />
          ))}
        </div>
      )}
    </>
  );
};

export default ImageList;
