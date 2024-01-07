"use client";
import { useEffect, useRef, useState } from "react";
import { getInsertionSort } from "../sorting-algorithms";
import { Button } from "@jecfe/react-design-system";
import { cva } from "class-variance-authority";
import { randomIntFromInterval } from "@/helpers";

export type Bars = {
  number: number;
  colour: boolean;
};

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

  const runInsertionSort = (): void => {
    handleAbortClick();
    const { signal } = abortController.current;
    const animations = getInsertionSort(barArray);

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

  const handleAbortClick = () => {
    abortController.current.abort();
    abortController.current = new AbortController();
  };

  return (
    <div className="flex flex-col items-center space-y-10">
      <div className="flex flex-row items-end w-min">
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
        <Button onClick={generateRandomArray}>Generate New Array</Button>
        <Button onClick={handleAbortClick}>Abort sort</Button>
      </div>
    </div>
  );
}
