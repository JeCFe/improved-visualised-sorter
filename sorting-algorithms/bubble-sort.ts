import { swap } from "@/helpers";
import { Animations, Bars } from "@/types";

export const getBubbleSort = (array: Bars[]) => {
  const animations: Animations = [];
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j].number > array[j + 1].number) {
        animations.push([j, array[j + 1].number, "red"]);
        animations.push([j, array[j + 1].number, "black"]);
        animations.push([j + 1, array[j].number, "red"]);
        animations.push([j + 1, array[j].number, "black"]);
        swap(j, j + 1, array);
      } else {
        if (j != 0) {
          animations.push([j - 1, array[j - 1].number, "red"]);
          animations.push([j - 1, array[j - 1].number, "black"]);
        }
      }
    }
  }
  return animations;
};
