import { VariantProps } from "class-variance-authority";
import { barColour } from "@/helpers";

export type Animations = [
  number,
  number,
  VariantProps<typeof barColour>["colour"]
][];
