import React from "react";
import type {
  PhotoFilters,
  Orientation,
  OrderBy,
  IOrderByOptions,
  FilterModalProps,
  Color,
} from "../../types/filter-types";
import { IoClose } from "react-icons/io5";
import { colorOptions, orientationOptions } from "../../api/filter";

const orderByOptions: IOrderByOptions[] = [
  { label: "რელევანტური", value: "relevant" },
  { label: "უახლესი", value: "latest" },
];

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
}) => {
  const [localFilters, setLocalFilters] = React.useState<PhotoFilters>(filters);

  if (!isOpen) return null;

  const handleOrientationChange = (orientation: Orientation) => {
    setLocalFilters((prev) => ({
      ...prev,
      orientation: prev.orientation === orientation ? undefined : orientation,
    }));
  };

  const handleOrderChange = (orderBy: OrderBy) => {
    setLocalFilters((prev) => ({ ...prev, orderBy }));
  };

  const handleColorChange = (color: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      color: prev.color === color ? undefined : (color as any),
    }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[999] flex items-center justify-center">
      <div className="bg-white relative z-50 rounded-lg p-6 w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-mainBold">ფილტრები</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Orientation Filter */}
        <div className="mb-6">
          <h3 className="font-mainBold mb-3">ორიენტაცია</h3>
          <div className="flex gap-3">
            {orientationOptions.map((orientation: Orientation) => (
              <button
                key={orientation}
                onClick={() => handleOrientationChange(orientation)}
                className={`px-4 py-2 rounded-lg ${
                  localFilters.orientation === orientation
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {orientation === "landscape"
                  ? "ჰორიზონტალური"
                  : orientation === "portrait"
                  ? "ვერტიკალური"
                  : "კვადრატული"}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-mainBold mb-3">დალაგება</h3>
          <div className="flex gap-3">
            {orderByOptions.map(({ label, value }: IOrderByOptions) => (
              <button
                key={value}
                onClick={() => handleOrderChange(value)}
                className={`px-4 py-2 rounded-lg ${
                  localFilters.orderBy === value
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-mainBold mb-3">მსგავსი ფერი</h3>
          <div className="grid grid-cols-4 gap-3">
            {colorOptions.map(
              ({
                value,
                label,
                bg,
              }: {
                value: Color;
                label: string;
                bg: string;
              }) => (
                <button
                  key={value}
                  onClick={() => handleColorChange(value)}
                  className={`cursor-pointer group relative h-12 rounded-lg overflow-hidden  ${bg} ${
                    localFilters.color === value ? "ring-2 ring-blue-500" : ""
                  }`}
                  title={label}
                ></button>
              )
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setLocalFilters({});
              onApplyFilters({});
              onClose();
            }}
            className="flex-1 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-mainBold"
          >
            გასუფთავება
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 font-mainBold"
          >
            გამოყენება
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
