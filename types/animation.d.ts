import { VariantProps } from "class-variance-authority";
import { barColour } from "@/components";

export type Animations = [
  number,
  number,
  VariantProps<typeof barColour>["colour"]
][];
