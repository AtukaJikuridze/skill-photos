import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import ImageLoader from "../../components/loaders/ImageLoader";
import { useEffect } from "react";

interface UnsplashTag {
  title: string;
}

const fetchPhotoDetails = async (id: string) => {
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  if (!ACCESS_KEY) {
    throw new Error("Unsplash access key is missing");
  }

  const url = `https://api.unsplash.com/photos/${id}?client_id=${ACCESS_KEY}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch photo details: ${res.status}`);
  }

  return res.json();
};

const fetchRelatedPhotos = async (tags: UnsplashTag[], userId: string) => {
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  if (!ACCESS_KEY) {
    throw new Error("Unsplash access key is missing");
  }

  const tagQuery = tags
    .slice(0, 2)
    .map((tag) => tag.title)
    .join(" OR ");
  if (tagQuery) {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      tagQuery
    )}&per_page=6&client_id=${ACCESS_KEY}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return data.results;
    }
  }

  const url = `https://api.unsplash.com/users/${userId}/photos?per_page=6&client_id=${ACCESS_KEY}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch related photos: ${res.status}`);
  }

  return res.json();
};

const ImagePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const {
    data: photo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["photo", id],
    queryFn: () => fetchPhotoDetails(id!),
    enabled: !!id,
  });

  const { data: relatedPhotos, isLoading: isLoadingRelated } = useQuery({
    queryKey: ["related", id],
    queryFn: () => fetchRelatedPhotos(photo?.tags || [], photo?.user?.username),
    enabled: !!photo,
  });

  const handleBack = () => {
    navigate(-1);
  };

  if (isError) return <div className="p-4">Error loading photo details</div>;

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleBack}
        className="inline-block mb-6 text-blue-600 hover:text-blue-800"
      >
        ← დაბრუნდი წინა გვერძე
      </button>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {isLoading ? (
          <ImageLoader type="main" />
        ) : (
          <>
            <img
              src={photo.urls.regular}
              alt={photo.alt_description || "Photo"}
              className="w-full h-[500px] object-cover"
            />
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={photo.user.profile_image.medium}
                  alt={photo.user.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h2 className="text-xl font-mainBold">{photo.user.name}</h2>
                  <a
                    href={photo.user.links.html}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    @{photo.user.username}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="font-mainBold">ლოკაცია</h3>
                  <p>{photo.location?.name || "მიუწვდომელია"}</p>
                </div>
                <div>
                  <h3 className="font-mainBold">დრო</h3>
                  <p>{new Date(photo.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="font-mainBold">ჩამოტვირთვები</h3>
                  <p>{photo.downloads?.toLocaleString() || "N/A"}</p>
                </div>
                <div>
                  <h3 className="font-mainBold">მოწონებები</h3>
                  <p>{photo.likes?.toLocaleString() || "0"}</p>
                </div>
              </div>

              {photo.description && (
                <div className="mb-4">
                  <h3 className="font-mainBold mb-2">აღწერა</h3>
                  <p className="text-gray-700">{photo.description}</p>
                </div>
              )}

              <div>
                <h3 className="font-mainBold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {photo.tags?.map((tag: any) => (
                    <span
                      key={tag.title}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      {tag.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-mainBold mb-4">მსგავსი ფოტოები</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {isLoadingRelated ? (
            <>
              {[...Array(6)].map((_, i) => (
                <ImageLoader key={i} type="suggestion" />
              ))}
            </>
          ) : (
            relatedPhotos
              ?.filter((img: any) => img.id !== id)
              .slice(0, 6)
              .map((img: any) => (
                <div
                  key={img.id}
                  onClick={() => navigate(`/image/${img.id}`)}
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <img
                    src={img.urls.small}
                    alt={img.alt_description}
                    className="w-full h-48 object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">by {img.user.name}</p>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
