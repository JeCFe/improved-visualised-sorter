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
  const abc = mainArray;
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
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    if (auxiliaryArray[i].number <= auxiliaryArray[j].number) {
      animations.push([k, auxiliaryArray[i].number, true]);
      animations.push([k, auxiliaryArray[i].number, false]); // might need removing
      mainArray[k++].number = auxiliaryArray[i++].number;
    } else {
      animations.push([k, auxiliaryArray[j].number, true]);
      animations.push([k, auxiliaryArray[j].number, false]); //might need removing
      mainArray[k++].number = auxiliaryArray[j++].number;
    }
  }
  while (i <= middleIdx) {
    animations.push([k, auxiliaryArray[i].number, true]);
    animations.push([k, auxiliaryArray[i].number, false]); //?
    mainArray[k++].number = auxiliaryArray[i++].number;
  }
  while (j <= endIdx) {
    animations.push([k, auxiliaryArray[j].number, true]);
    animations.push([k, auxiliaryArray[j].number, false]);
    mainArray[k++].number = auxiliaryArray[j++].number;
  }
}
