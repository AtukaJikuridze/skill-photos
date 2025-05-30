import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

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

const ImagePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: photo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["photo", id],
    queryFn: () => fetchPhotoDetails(id!),
    enabled: !!id,
  });

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError) return <div className="p-4">Error loading photo details</div>;
  if (!photo) return null;

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleBack}
        className="inline-block mb-6 text-blue-600 hover:text-blue-800"
      >
        ← Back to Gallery
      </button>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
              <h2 className="text-xl font-bold">{photo.user.name}</h2>
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
              <h3 className="font-semibold">Location</h3>
              <p>{photo.location?.name || "Not specified"}</p>
            </div>
            <div>
              <h3 className="font-semibold">Date</h3>
              <p>{new Date(photo.created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="font-semibold">Downloads</h3>
              <p>{photo.downloads?.toLocaleString() || "N/A"}</p>
            </div>
            <div>
              <h3 className="font-semibold">Likes</h3>
              <p>{photo.likes?.toLocaleString() || "0"}</p>
            </div>
          </div>

          {photo.description && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{photo.description}</p>
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-2">Tags</h3>
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
      </div>
    </div>
  );
};

export default ImagePage;
