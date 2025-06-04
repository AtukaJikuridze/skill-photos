import React from "react";

interface ImageLoaderProps {
  type?: "main" | "suggestion";
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ type = "main" }) => {
  if (type === "main") {
    return (
      <div className="animate-pulse">
        <div className="bg-gray-200 h-[500px] w-full rounded-t-lg"></div>
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="rounded-full bg-gray-200 h-12 w-12"></div>
            <div className="ml-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-200 rounded-full w-16"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pulse  mb-4">
      <div
        style={{ height: `${Math.floor(300 + Math.random() * 300)}px` }}
        className={`bg-gray-200 w-full rounded-lg`}
      ></div>
    </div>
  );
};

export default ImageLoader;
