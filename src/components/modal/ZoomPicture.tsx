import React, { useEffect } from "react";
import type { IZoomPicture } from "../../types/zoom-picture";
import { IoClose } from "react-icons/io5";
const ZoomPicture: React.FC<IZoomPicture> = ({
  isZoomed,
  setIsZoomed,
  photo,
}: IZoomPicture) => {
  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isZoomed]);

  return (
    <>
      {isZoomed && photo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={() => setIsZoomed(false)}
        >
          <img
            src={photo.urls.full}
            alt={photo.alt_description || "Zoomed photo"}
            className="max-w-full max-h-full object-contain"
          />
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(false);
            }}
          >
            <IoClose size={54} />
          </button>
        </div>
      )}
    </>
  );
};

export default ZoomPicture;
