import { VariantProps } from "class-variance-authority";
import { barColour } from "@/app/page";
export type Bars = {
  number: number;
  colour: VariantProps<typeof barColour>["colour"];
};
