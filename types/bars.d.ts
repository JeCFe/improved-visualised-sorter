import { VariantProps } from "class-variance-authority";
import { barColour } from "@/helpers";
export type Bars = {
  number: number;
  colour: VariantProps<typeof barColour>["colour"];
};
