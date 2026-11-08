import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-12 items-center justify-center gap-2 border px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary: "border-brand bg-brand text-white hover:opacity-90",
        secondary: "border-ink bg-transparent text-ink hover:bg-ink hover:text-white",
        inverse: "border-white bg-white text-ink hover:bg-surface-strong",
        ghost: "border-transparent bg-transparent px-2 text-ink hover:bg-surface",
      },
      size: {
        default: "min-h-12",
        compact: "min-h-10 px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
