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
    animations.push([i, array[i].number, "red"]);
    for (let j = i + 1; j < array.length; j++) {
      animations.push([minIndex, array[minIndex].number, "red"]);
      animations.push([j, array[j].number, "red"]);
      animations.push([j, array[j].number, "black"]);

      if (array[j].number < array[minIndex].number) {
        if (minIndex !== i) {
          animations.push([minIndex, array[minIndex].number, "black"]);
        }

        minIndex = j;
      }
    }
    animations.push([i, array[i].number, "black"]);

    animations.push([i, array[minIndex].number, "red"]);
    animations.push([i, array[minIndex].number, "black"]);
    animations.push([minIndex, array[i].number, "red"]);
    animations.push([minIndex, array[i].number, "black"]);
    swap(i, minIndex, array);
  }
}
