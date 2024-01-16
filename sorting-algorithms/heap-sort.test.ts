import { Bars } from "@/types";
import { getHeapSort } from "./heap-sort";

describe("Heap Sort", () => {
  it("should sort an array of bars", () => {
    const unsortedArray = [
      { number: 5, colour: false },
      { number: 3, colour: false },
      { number: 8, colour: false },
      { number: 1, colour: false },
    ];

    const mutatableArray = JSON.parse(JSON.stringify(unsortedArray)) as Bars[];

    const sortedArray = [...unsortedArray].sort((a, b) => a.number - b.number);

    const animations = getHeapSort(mutatableArray);

    expect(sortedArray).toEqual(mutatableArray);

    expect(animations.length).toBeGreaterThan(0);
  });
});
