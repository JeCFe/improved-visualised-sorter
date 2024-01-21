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
import { cva } from "class-variance-authority";
import { barColour, randomIntFromInterval } from "@/helpers";
import { Animations, Bars } from "@/types";

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

  const runSortingAlgorithm = (
    sortingFunction: (array: Bars[]) => Animations
  ) => {
    handleAbortClick();
    const { signal } = abortController.current;

    const start = performance.now();
    const animations = sortingFunction(
      JSON.parse(JSON.stringify(barArray)) as Bars[]
    );
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
    };
    processAnimation(0);
  };

  const runQuickSort = () => runSortingAlgorithm(getQuickSort);
  const runBubbleSort = () => runSortingAlgorithm(getBubbleSort);
  const runMergeSort = () => runSortingAlgorithm(getMergeSort);
  const runInsertionSort = () => runSortingAlgorithm(getInsertionSort);
  const runHeapSort = () => runSortingAlgorithm(getHeapSort);
  const runSelectionSort = () => runSortingAlgorithm(getSelectionSort);

  const handleAbortClick = () => {
    setSortingPreformance(undefined);
    setRenderingPreformance(undefined);
    abortController.current.abort();
    abortController.current = new AbortController();
  };

  return (
    <div className="flex flex-col items-center space-y-10">
      <div className="flex flex-row space-x-4 pt-10">
        <Button onClick={runInsertionSort}>Run Insertion Sort</Button>
        <Button onClick={runMergeSort}>Run Merge Sort</Button>
        <Button onClick={runBubbleSort}>Run Bubble Sort</Button>
        <Button onClick={runHeapSort}>Run Heap Sort</Button>
        <Button onClick={runQuickSort}>Run Quick Sort</Button>
        <Button onClick={runSelectionSort}>Run Selection Sort</Button>
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
