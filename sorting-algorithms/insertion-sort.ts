import { Animations, Bars } from "@/types";

export const getInsertionSort = (array: Readonly<Bars[]>) => {
  const animations: Animations = [];

  array.forEach((_, index) => {
    let key = array[index].number;
    let j = index - 1;

    while (j >= 0 && array[j].number > key) {
      animations.push([j + 1, array[j].number, true]);
      animations.push([j + 1, array[j].number, false]);
      array[j + 1].number = array[j].number;
      j = j - 1;
    }
    animations.push([j + 1, key, true]);
    animations.push([j + 1, key, false]);
    array[j + 1].number = key;
  });

  return animations;
};
