import { Bars, Animations } from ".";

export type Algorithms = {
  label: "Insertion" | "Merge" | "Bubble" | "Heap" | "Quick" | "Selection";
  func: (array: Bars[]) => Animations;
};
