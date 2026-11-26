import type { HTMLAttributes } from "react";

type EyebrowProps = HTMLAttributes<HTMLParagraphElement> & {
  index?: string;
};

export function Eyebrow({ index, className, children, ...props }: EyebrowProps) {
  return (
    <p className={["u-eyebrow", className].filter(Boolean).join(" ")} {...props}>
      {index ? <span className="u-eyebrow__index">{index}</span> : null}
      {children}
    </p>
  );
}
