"use client";

import { useEffect, useRef, useState } from "react";
import {
  getInsertionSort,
  getMergeSort,
  getBubbleSort,
  getHeapSort,
  getQuickSort,
  getSelectionSort,
} from "../sorting-algorithms";
import { Button } from "@jecfe/react-design-system";
import { randomIntFromInterval } from "@/helpers";
import { Animations, Bars } from "@/types";
import { cva } from "class-variance-authority";

const sortingAlgorithms = [
  { label: "Insertion Sort", func: getInsertionSort },
  { label: "Merge Sort", func: getMergeSort },
  { label: "Bubble Sort", func: getBubbleSort },
  { label: "Heap Sort", func: getHeapSort },
  { label: "Quick Sort", func: getQuickSort },
  { label: "Selection Sort", func: getSelectionSort },
];

export const barColour = cva("", {
  variants: {
    colour: {
      red: "bg-red-500",
      black: "bg-black",
      green: "bg-green-500",
    },
  },
  defaultVariants: { colour: "black" },
});

export default function Home() {
  const [barArray, setBarArray] = useState<Bars[]>([]);
  const [sortingPreformance, setSortingPreformance] = useState<number>();
  const [renderPreformance, setRenderingPreformance] = useState<number>();
  const abortController = useRef(new AbortController());

  const generateRandomArray = (): void => {
    handleAbortClick();

    setBarArray(
      Array.from({ length: 100 }, () => ({
        number: randomIntFromInterval(5, 1000),
        colour: "black",
      }))
    );
  };

  useEffect(() => {
    generateRandomArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateSort = (array: Bars[]) => {
    handleAbortClick();
    const { signal } = abortController.current;

    const animations: Animations = [];
    for (let i = 0; i < array.length - 1; i++) {
      animations.push([i + 1, array[i + 1].number, "red"]);
      if (array[i].number > array[i].number) {
        break;
      }
      animations.push([i, array[i].number, "green"]);
    }
    const processAnimation = (index: number) => {
      if (index < animations.length && !signal.aborted) {
        const [barIdx, newHeight, isComparison] = animations[index];
        setTimeout(() => {
          setBarArray((prevArray) => {
            const newArray = [...prevArray];
            newArray[barIdx] = { number: newHeight, colour: isComparison };
            return newArray;
          });
          processAnimation((index += 1));
        }, 10);
      }
    };
    processAnimation(0);
  };

  const runSortingAlgorithm = (
    sortingFunction: (array: Bars[]) => Animations
  ) => {
    handleAbortClick();
    const { signal } = abortController.current;
    const mutableArray = JSON.parse(JSON.stringify(barArray)) as Bars[];
    const start = performance.now();
    const animations = sortingFunction(mutableArray);
    const end = performance.now();
    setSortingPreformance(end - start);

    const renderStart = performance.now();
    const processAnimation = (index: number) => {
      if (index < animations.length && !signal.aborted) {
        const [barIdx, newHeight, isComparison] = animations[index];
        setTimeout(() => {
          setBarArray((prevArray) => {
            const newArray = [...prevArray];
            newArray[barIdx] = { number: newHeight, colour: isComparison };
            return newArray;
          });
          processAnimation((index += 1));
        }, 10);
      }
      const renderEnd = performance.now();
      setRenderingPreformance((renderEnd - renderStart) / 1000);

      if (index === animations.length) {
        validateSort(mutableArray);
      }
    };
    processAnimation(0);
  };

  const handleSortClick =
    (sortingFunction: (array: Bars[]) => Animations) => () =>
      runSortingAlgorithm(sortingFunction);

  const handleAbortClick = () => {
    setSortingPreformance(undefined);
    setRenderingPreformance(undefined);
    abortController.current.abort();
    abortController.current = new AbortController();
  };

  return (
    <div className="flex flex-col items-center space-y-10">
      <div className="flex flex-row space-x-4 pt-10">
        {sortingAlgorithms.map((algorithm) => (
          <Button
            key={algorithm.label}
            onClick={handleSortClick(algorithm.func)}
          >{`${algorithm.label}`}</Button>
        ))}
      </div>
      <div className="flex flex-row items-end w-min h-[600px] ">
        {barArray.map((bar, i) => (
          <div
            key={i}
            className={barColour({
              colour: bar.colour,
              className: "w-2 inline-block my-0 mx-[2px]",
            })}
            style={{ height: `${bar.number * 0.6}px` }}
          />
        ))}
      </div>

      <div className="flex flex-row space-x-5">
        <Button onClick={generateRandomArray}>Generate New Array</Button>
        <Button variant="secondary" onClick={handleAbortClick}>
          Abort sort
        </Button>
      </div>
      <div className="flex flex-row w-full">
        <div className="flex items-start">
          Time taken to compute (ms):{" "}
          {sortingPreformance?.toFixed(3) ?? "awaiting results"}
        </div>
        <div className="grow" />
        <div className="flex items-end">
          Time taken to render (s):{" "}
          {renderPreformance?.toFixed(3) ?? "awaiting results"}
        </div>
      </div>
    </div>
  );
}
