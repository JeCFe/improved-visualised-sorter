import { Bars } from "@/types";
import { getMergeSort } from "./merge-sort";
import { getQuickSort } from "./quick-sort";

describe("Quick Sort", () => {
  it("should sort an array of bars", () => {
    const unsortedArray = [
      { number: 5, colour: false },
      { number: 3, colour: false },
      { number: 8, colour: false },
      { number: 1, colour: false },
    ];

    const mutatableArray = JSON.parse(JSON.stringify(unsortedArray)) as Bars[];

    const sortedArray = [...unsortedArray].sort((a, b) => a.number - b.number);

    const animations = getQuickSort(mutatableArray);

    expect(sortedArray).toEqual(mutatableArray);

    expect(animations.length).toBeGreaterThan(0);
  });
});
