import { VariantProps } from "class-variance-authority";
import { barColour } from "@/components";
export type Bars = {
  number: number;
  colour: VariantProps<typeof barColour>["colour"];
};
