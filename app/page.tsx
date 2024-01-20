"use client";

import { useEffect, useRef, useState } from "react";
import {
  getInsertionSort,
  getMergeSort,
  getBubbleSort,
  getHeapSort,
} from "../sorting-algorithms";
import { Button } from "@jecfe/react-design-system";
import { cva } from "class-variance-authority";
import { randomIntFromInterval } from "@/helpers";
import { Animations, Bars } from "@/types";
import { getQuickSort } from "@/sorting-algorithms/quick-sort";

const barColour = cva("", {
  variants: {
    colour: {
      true: "bg-yellow-500",
      false: "bg-black",
    },
  },
  defaultVariants: { colour: false },
});

export default function Home() {
  const [barArray, setBarArray] = useState<Bars[]>([]);
  const abortController = useRef(new AbortController());

  const generateRandomArray = (): void => {
    handleAbortClick();
    const newArray: Bars[] = [];
    for (let i = 0; i < 100; i++) {
      newArray.push({ number: randomIntFromInterval(5, 1000), colour: false });
    }
    setBarArray(newArray);
  };

  useEffect(() => {
    generateRandomArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runSortingAlgorithm = (
    sortingFunction: (array: Bars[]) => Animations
  ) => {
    handleAbortClick();
    const { signal } = abortController.current;

    const animations = sortingFunction(
      JSON.parse(JSON.stringify(barArray)) as Bars[]
    );

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

  const runQuickeSort = () => {
    runSortingAlgorithm(getQuickSort);
  };
  const runBubbleSort = () => {
    runSortingAlgorithm(getBubbleSort);
  };

  const runMergeSort = () => {
    runSortingAlgorithm(getMergeSort);
  };

  const runInsertionSort = () => {
    runSortingAlgorithm(getInsertionSort);
  };

  const runHeapSort = () => {
    runSortingAlgorithm(getHeapSort);
  };

  const handleAbortClick = () => {
    abortController.current.abort();
    abortController.current = new AbortController();
  };

  return (
    <div className="flex flex-col items-center space-y-10">
      <div className="flex flex-row items-end w-min h-[600px]">
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

      <div className="flex flex-row space-x-4">
        <Button onClick={runInsertionSort}>Run Insertion Sort</Button>
        <Button onClick={runMergeSort}>Run Merge Sort</Button>
        <Button onClick={runBubbleSort}>Run Bubble Sort</Button>
        <Button onClick={runHeapSort}>Run Heap Sort</Button>
        <Button onClick={runQuickeSort}>Run Quick Sort</Button>
        <Button onClick={generateRandomArray}>Generate New Array</Button>
        <Button onClick={handleAbortClick}>Abort sort</Button>
      </div>
    </div>
  );
}
