import { swap } from "@/helpers";
import { Animations, Bars } from "@/types";

export const getBubbleSort = (array: Bars[]) => {
  const animations: Animations = [];
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (array[j].number > array[j + 1].number) {
        animations.push([j, array[j + 1].number, true]);
        animations.push([j, array[j + 1].number, false]);
        animations.push([j + 1, array[j].number, true]);
        animations.push([j + 1, array[j].number, false]);
        swap(j, j + 1, array);
      } else {
        if (j != 0) {
          animations.push([j - 1, array[j - 1].number, true]);
          animations.push([j - 1, array[j - 1].number, false]);
        }
      }
    }
  }
  return animations;
};
