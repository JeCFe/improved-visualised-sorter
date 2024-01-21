import { Bars, ArrayConfig } from "@/types";
import { randomIntFromInterval } from ".";

export const generateArray = (config: ArrayConfig) => {
  return Array.from({ length: config.length }, () => ({
    number: randomIntFromInterval(config.min, config.max),
    colour: "black",
  })) as Bars[];
};
