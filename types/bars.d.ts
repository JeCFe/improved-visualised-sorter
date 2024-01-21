import { VariantProps } from "class-variance-authority";

export type Bars = {
  number: number;
  colour: VariantProps<typeof barColour>["colour"];
};
