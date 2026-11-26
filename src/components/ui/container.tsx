import type { HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  width?: "content" | "wide" | "full";
};

const widthClasses = {
  content: "u-container u-container--content",
  wide: "u-container u-container--wide",
  full: "u-container u-container--full",
};

export function Container({
  width = "content",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={[`u-container`, widthClasses[width], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
