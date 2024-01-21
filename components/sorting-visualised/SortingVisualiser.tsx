"use client";
import { useEffect, useRef, useState } from "react";
import { Button, RadioButton } from "@jecfe/react-design-system";
import { Algorithms, Animations, ArrayConfig, Bars } from "@/types";
import { generateArray } from "@/helpers/generate-array";
import {
  getInsertionSort,
  getMergeSort,
  getBubbleSort,
  getHeapSort,
  getQuickSort,
  getSelectionSort,
} from "@/sorting-algorithms";
import { cva } from "class-variance-authority";
import cloneDeep from "lodash/cloneDeep";

const sortingAlgorithms: Algorithms[] = [
  { label: "Insertion", func: getInsertionSort },
  { label: "Merge", func: getMergeSort },
  { label: "Bubble", func: getBubbleSort },
  { label: "Heap", func: getHeapSort },
  { label: "Quick", func: getQuickSort },
  { label: "Selection", func: getSelectionSort },
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

export function SortingVisualised() {
  const [barArray, setBarArray] = useState<Bars[]>([]);
  const [sortingPerformance, setsortingPerformance] = useState<number>();
  const [renderPreformance, setRenderingPreformance] = useState<number>();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithms>(
    sortingAlgorithms[0]
  );
  const [arrayConfig, setArrayConfig] = useState<ArrayConfig>({
    length: 100,
    min: 5,
    max: 1000,
  });
  const abortController = useRef(new AbortController());

  const arrayGeneration = () => generateArray(arrayConfig);

  const sortedReverseArray = () => {
    handleAbortClick();
    setBarArray(
      [...arrayGeneration()].sort((a, b) => a.number - b.number).reverse()
    );
  };

  const sortedArray = () => {
    handleAbortClick();
    setBarArray([...arrayGeneration()].sort((a, b) => a.number - b.number));
  };

  useEffect(() => {
    generateRandomArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateRandomArray = () => {
    handleAbortClick();
    setBarArray(arrayGeneration());
  };

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
    setsortingPerformance(undefined);
    setRenderingPreformance(undefined);
    handleAbortClick();
    const { signal } = abortController.current;
    const mutableArray = cloneDeep(barArray);
    const start = performance.now();
    const animations = sortingFunction(mutableArray);
    const end = performance.now();
    setsortingPerformance(end - start);

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

  const handleAbortClick = () => {
    abortController.current.abort();
    abortController.current = new AbortController();
  };

  return (
    <div className="flex flex-col items-center space-y-10">
      <div className="flex flex-row space-x-12 justify-center">
        <div className="flex flex-row items-center">
          {sortingAlgorithms.map((algorithm) => (
            <RadioButton
              key={algorithm.label}
              name="sorting algorithm"
              value={algorithm.label}
              defaultChecked={selectedAlgorithm === algorithm}
              onClick={() => setSelectedAlgorithm(algorithm)}
              className="px-4"
            >{`${algorithm.label}`}</RadioButton>
          ))}
        </div>

        <Button
          className="flex"
          onClick={() => runSortingAlgorithm(selectedAlgorithm.func)}
        >
          Sort!
        </Button>
      </div>
      <div className="w-max"></div>
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
        <Button onClick={generateRandomArray}>Generate Random Array</Button>
        <Button onClick={sortedArray}>Generate Sorted Array</Button>
        <Button onClick={sortedReverseArray}>
          Generate Sorted Reverse Array
        </Button>
        <Button variant="secondary" onClick={handleAbortClick}>
          Abort sort
        </Button>
      </div>
      <div className="flex flex-row w-full">
        <div className="flex items-start">
          Time taken to compute (ms):{" "}
          {sortingPerformance?.toFixed(3) ?? "awaiting results"}
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
