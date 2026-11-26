import type { HTMLAttributes, ReactNode } from "react";
import { Eyebrow } from "./eyebrow";

type SectionHeadingProps = HTMLAttributes<HTMLDivElement> & {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={[`u-section-heading u-section-heading--${align}`, className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="u-heading-2">{title}</h2>
      {description ? <div className="u-section-heading__description">{description}</div> : null}
    </div>
  );
}
