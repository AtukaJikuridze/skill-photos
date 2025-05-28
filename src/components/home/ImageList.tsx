// components/ImageList.tsx

import { useQuery } from "@tanstack/react-query";
import { fetchImages } from "../../api/unsplash";

const ImageList = ({ query }: { query: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["images", query],
    queryFn: () => fetchImages(query),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading images</p>;

  return (
    <div className="columns-1 sm:columns-2 md:columns-4 gap-4 p-4">
      {data?.map((img: any) => (
        <img
          key={img.id}
          src={img.urls.small}
          alt={img.alt_description}
          className="mb-4 w-full rounded-lg "
        />
      ))}
    </div>
  );
};

export default ImageList;
