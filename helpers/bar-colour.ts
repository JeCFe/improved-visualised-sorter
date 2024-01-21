import { cva } from "class-variance-authority";

export const barColour = cva("", {
  variants: {
    colour: {
      red: "bg-red-500",
      black: "bg-black",
    },
  },
  defaultVariants: { colour: "black" },
});
