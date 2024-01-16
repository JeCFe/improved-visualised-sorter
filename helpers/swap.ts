import { Bars } from "@/types";

export const swap = (i: number, j: number, array: Bars[]) => {
  let temp = array[j];
  array[j] = array[i];
  array[i] = temp;
};
