import { Bars } from "@/app/page";

export function getMergeSortAnimations(
  array: Bars[]
): [number, number, boolean][] {
  const animations: [number, number, boolean][] = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = JSON.parse(JSON.stringify(array)) as Bars[];
  const mainArray = JSON.parse(JSON.stringify(array)) as Bars[];
  mergeSortHelper(mainArray, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray: Bars[],
  startIdx: number,
  endIdx: number,
  auxiliaryArray: Bars[],
  animations: [number, number, boolean][]
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray: Bars[],
  startIdx: number,
  middleIdx: number,
  endIdx: number,
  auxiliaryArray: Bars[],
  animations: [number, number, boolean][]
) {
  let right = startIdx;
  let left = startIdx;
  let middle = middleIdx + 1;
  while (left <= middleIdx && middle <= endIdx) {
    if (auxiliaryArray[left].number <= auxiliaryArray[middle].number) {
      animations.push([right, auxiliaryArray[left].number, true]);
      animations.push([right, auxiliaryArray[left].number, false]); // might need removing
      mainArray[right++].number = auxiliaryArray[left++].number;
    } else {
      animations.push([right, auxiliaryArray[middle].number, true]);
      animations.push([right, auxiliaryArray[middle].number, false]); //might need removing
      mainArray[right++].number = auxiliaryArray[middle++].number;
    }
  }
  while (left <= middleIdx) {
    animations.push([right, auxiliaryArray[left].number, true]);
    animations.push([right, auxiliaryArray[left].number, false]); //?
    mainArray[right++].number = auxiliaryArray[left++].number;
  }
  while (middle <= endIdx) {
    animations.push([right, auxiliaryArray[middle].number, true]);
    animations.push([right, auxiliaryArray[middle].number, false]);
    mainArray[right++].number = auxiliaryArray[middle++].number;
  }
}
