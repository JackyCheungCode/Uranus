import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-12 w-full border border-line-strong bg-white px-4 py-3 text-sm font-light text-ink outline-none placeholder:text-muted focus:border-brand focus:ring-1 focus:ring-brand disabled:cursor-not-allowed disabled:bg-surface",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
