import { VariantProps } from "class-variance-authority";
import { barColour } from "@/app/page";

export type Animations = [
  number,
  number,
  VariantProps<typeof barColour>["colour"]
][];
