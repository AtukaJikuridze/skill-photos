import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import ImageLoader from "../../components/loaders/ImageLoader";
import { useEffect, useState } from "react";
import { fetchImage, fetchRelatedPhotos } from "../../api/unsplash";
import ZoomPicture from "../../components/modal/ZoomPicture";
import NotFound from "../NotFound";

const ImagePage: React.FC = () => {
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsZoomed(false); // reset zoom on route change
  }, [id]);

  const {
    data: photo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["photo", id],
    queryFn: () => fetchImage(id!, ACCESS_KEY),
    enabled: !!id,
  });

  const { data: relatedPhotos, isLoading: isLoadingRelated } = useQuery({
    queryKey: ["related", id],
    queryFn: () => fetchRelatedPhotos(photo?.tags || []),
    enabled: !!photo,
  });

  const handleBack = () => navigate(-1);
  const handleHome = () => navigate("/");
  console.log(photo, isError);
  if (!photo && !isLoading) return <NotFound />;
  return (
    <div className="container mx-auto p-4 relative">
      <ZoomPicture
        isZoomed={isZoomed}
        setIsZoomed={setIsZoomed}
        photo={photo}
      />

      <div className="flex gap-4">
        <button
          onClick={handleBack}
          className="cursor-pointer flex gap-1 mb-6 text-blue-600 hover:text-blue-800 group"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            ←
          </span>
          დაბრუნდი წინა გვერძე
        </button>
        <button
          onClick={handleHome}
          className="cursor-pointer flex gap-1 mb-6 text-blue-600 hover:text-blue-800 group"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            ←
          </span>
          დაბრუნდი მთავარ გვერძე
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {isLoading ? (
          <ImageLoader type="main" />
        ) : (
          <>
            <div
              className="w-full h-[550px] hover:brightness-70 transition-all duration-300 cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
            >
              <img
                src={photo.urls.regular}
                alt={photo.alt_description || "Photo"}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              {/* User info */}
              <div className="flex items-center mb-4">
                <a
                  href={photo.user.links.html}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <img
                    src={photo.user.profile_image.medium}
                    alt={photo.user.name}
                    className="w-12 h-12 rounded-full mr-4 cursor-pointer"
                  />
                </a>
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

              {/* Meta info */}
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

              {/* Description */}
              {photo.description && (
                <div className="mb-4">
                  <h3 className="font-mainBold mb-2">აღწერა</h3>
                  <p className="text-gray-700">{photo.description}</p>
                </div>
              )}

              {/* Tags */}
              <div>
                <h3 className="font-mainBold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {photo.tags?.map((tag: any) => (
                    <span
                      key={tag.title}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm capitalize cursor-pointer"
                      onClick={() => navigate(`/?q=${tag.title}`)}
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

      {/* Related photos */}
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
