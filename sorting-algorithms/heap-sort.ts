import { swap } from "@/helpers";
import { Animations, Bars } from "@/types";

export function getHeapSort(array: Bars[]) {
  const animations: Animations = [];
  let arrayLength = array.length;

  for (let i = Math.floor(arrayLength / 2); i >= 0; i--) {
    heap(array, i, arrayLength, animations);
  }

  for (let i = arrayLength - 1; i > 0; i--) {
    heapSwap(array, 0, i, animations);
    arrayLength--;
    heap(array, 0, arrayLength, animations);
  }

  return animations;
}

function heap(
  array: Bars[],
  currentIndex: number,
  arrayLength: number,
  animations: Animations
) {
  let leftChildIndex = 2 * currentIndex + 1;
  let rightChildIndex = 2 * currentIndex + 2;
  let maxIndex = currentIndex;

  if (
    leftChildIndex < arrayLength &&
    array[leftChildIndex].number > array[maxIndex].number
  ) {
    animations.push([leftChildIndex, array[maxIndex].number, true]);
    animations.push([leftChildIndex, array[maxIndex].number, false]);
    animations.push([currentIndex, array[currentIndex].number, true]);
    animations.push([currentIndex, array[currentIndex].number, false]);
    maxIndex = leftChildIndex;
  }

  if (
    rightChildIndex < arrayLength &&
    array[rightChildIndex].number > array[maxIndex].number
  ) {
    animations.push([rightChildIndex, array[maxIndex].number, true]);
    animations.push([rightChildIndex, array[maxIndex].number, false]);
    animations.push([currentIndex, array[currentIndex].number, true]);
    animations.push([currentIndex, array[currentIndex].number, false]);
    maxIndex = rightChildIndex;
  }

  if (maxIndex !== currentIndex) {
    heapSwap(array, currentIndex, maxIndex, animations);
    heap(array, maxIndex, arrayLength, animations);
  }
}

function heapSwap(
  array: Bars[],
  firstIdx: number,
  lastIdx: number,
  animations: Animations
) {
  animations.push([firstIdx, array[lastIdx].number, true]);
  animations.push([firstIdx, array[lastIdx].number, false]);

  animations.push([lastIdx, array[firstIdx].number, true]);
  animations.push([lastIdx, array[firstIdx].number, false]);

  swap(firstIdx, lastIdx, array);
}
