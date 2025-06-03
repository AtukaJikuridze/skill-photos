import type { Color, Orientation } from "../types/filter-types";

export const colorOptions: { value: Color; label: string; bg: string }[] = [
  {
    value: "black_and_white",
    label: "შავ-თეთრი",
    bg: "bg-gradient-to-r from-black to-white",
  },
  { value: "black", label: "შავი", bg: "bg-black" },
  { value: "white", label: "თეთრი", bg: "bg-white border border-gray-200" },
  { value: "yellow", label: "ყვითელი", bg: "bg-yellow-400" },
  { value: "orange", label: "ნარინჯისფერი", bg: "bg-orange-500" },
  { value: "red", label: "წითელი", bg: "bg-red-500" },
  { value: "purple", label: "იისფერი", bg: "bg-purple-500" },
  { value: "magenta", label: "მაგენტა", bg: "bg-pink-500" },
  { value: "green", label: "მწვანე", bg: "bg-green-500" },
  { value: "teal", label: "ცისფერი", bg: "bg-teal-500" },
  { value: "blue", label: "ლურჯი", bg: "bg-blue-500" },
];
export const orientationOptions: Orientation[] = [
  "landscape",
  "portrait",
  "squarish",
];
