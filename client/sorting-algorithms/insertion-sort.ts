import { Bars } from "@/app/page";

// sortingAlgorithms.ts
export function getInsertionSort(
  array: Readonly<Bars[]>
): [number, number, boolean][] {
  const animations: [number, number, boolean][] = [];
  const copiedArray = JSON.parse(JSON.stringify(array)) as Bars[];
  return insertionSortHelper(copiedArray, animations);
}

function insertionSortHelper(
  array: Readonly<Bars[]>,
  animations: [number, number, boolean][]
): [number, number, boolean][] {
  for (let i = 1; i < array.length; i++) {
    let key = array[i].number;
    let j = i - 1;

    while (j >= 0 && array[j].number > key) {
      animations.push([j + 1, array[j].number, true]);
      animations.push([j + 1, array[j].number, false]);
      array[j + 1].number = array[j].number;
      j = j - 1;
    }
    animations.push([j + 1, key, true]);
    animations.push([j + 1, key, false]);
    array[j + 1].number = key;
  }

  return animations;
}
