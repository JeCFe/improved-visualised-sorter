import { Animations, Bars } from "@/types";

export const getInsertionSort = (array: Readonly<Bars[]>) => {
  const animations: Animations = [];

  array.forEach((_, index) => {
    let key = array[index].number;
    let j = index - 1;

    while (j >= 0 && array[j].number > key) {
      animations.push([j + 1, array[j].number, "red"]);
      animations.push([j + 1, array[j].number, "black"]);
      array[j + 1].number = array[j].number;
      j = j - 1;
    }
    animations.push([j + 1, key, "red"]);
    animations.push([j + 1, key, "black"]);
    array[j + 1].number = key;
  });

  return animations;
};
