import { swap } from "@/helpers";
import { Animations, Bars } from "@/types";

export function getSelectionSort(array: Bars[]) {
  const animations: Animations = [];
  selectionSwap(array, animations);
  return animations;
}

function selectionSwap(array: Bars[], animations: Animations) {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    animations.push([i, array[i].number, true]);
    for (let j = i + 1; j < array.length; j++) {
      animations.push([minIndex, array[minIndex].number, true]);
      animations.push([j, array[j].number, true]);
      animations.push([j, array[j].number, false]);

      if (array[j].number < array[minIndex].number && minIndex !== 1) {
        animations.push([minIndex, array[minIndex].number, false]);
        minIndex = j;
      }
    }
    animations.push([i, array[i].number, false]);

    animations.push([i, array[minIndex].number, true]);
    animations.push([i, array[minIndex].number, false]);
    animations.push([minIndex, array[i].number, true]);
    animations.push([minIndex, array[i].number, false]);
    swap(i, minIndex, array);
  }
}
