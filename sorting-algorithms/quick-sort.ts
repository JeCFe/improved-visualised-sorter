import { swap } from "@/helpers";
import { Animations, Bars } from "@/types";

export const getQuickSort = (array: Bars[]) => {
  const animations: Animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  const x = array.map((x) => x.number);
  console.log("array", x);
  return animations;
};

function quickSortHelper(
  array: Bars[],
  startIndex: number,
  endIndex: number,
  animations: Animations
) {
  if (startIndex >= endIndex) return;

  const pivot = startIndex;
  let leftIndex = startIndex + 1;
  let rightIndex = endIndex;

  while (rightIndex >= leftIndex) {
    if (
      array[leftIndex].number > array[pivot].number &&
      array[rightIndex].number < array[pivot].number
    ) {
      animations.push([leftIndex, array[rightIndex].number, true]);
      animations.push([leftIndex, array[rightIndex].number, false]);
      animations.push([rightIndex, array[leftIndex].number, true]);
      animations.push([rightIndex, array[leftIndex].number, false]);
      swap(leftIndex, rightIndex, array);
    }

    if (array[leftIndex].number <= array[pivot].number) leftIndex++;
    if (array[rightIndex].number >= array[pivot].number) rightIndex--;
  }
  animations.push([rightIndex, array[pivot].number, true]);
  animations.push([pivot, array[rightIndex].number, true]);

  animations.push([rightIndex, array[pivot].number, false]);
  animations.push([pivot, array[rightIndex].number, false]);

  swap(pivot, rightIndex, array);

  const leftSubArrayIsSmaller =
    rightIndex - 1 - startIndex < endIndex - (rightIndex + 1);

  if (leftSubArrayIsSmaller) {
    quickSortHelper(array, startIndex, rightIndex - 1, animations);
    quickSortHelper(array, rightIndex + 1, endIndex, animations);
  } else {
    quickSortHelper(array, rightIndex + 1, endIndex, animations);
    quickSortHelper(array, startIndex, rightIndex - 1, animations);
  }
}