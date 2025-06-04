export type Orientation = "landscape" | "portrait" | "squarish";
export type OrderBy = "relevant" | "latest";
export type Color =
  | "black_and_white"
  | "black"
  | "white"
  | "yellow"
  | "orange"
  | "red"
  | "purple"
  | "magenta"
  | "green"
  | "teal"
  | "blue";

export interface PhotoFilters {
  orientation?: Orientation;
  orderBy?: OrderBy;
  color?: Color;
}

export interface IOrderByOptions {
  label: string;
  value: OrderBy;
}

export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: PhotoFilters;
  onApplyFilters: (filters: PhotoFilters) => void;
}
