import Link from "next/link";
import type { ComponentProps } from "react";

type ActionLinkProps = ComponentProps<typeof Link> & {
  tone?: "light" | "dark" | "outline";
};

export function ActionLink({
  tone = "dark",
  className,
  children,
  ...props
}: ActionLinkProps) {
  return (
    <Link
      className={[`u-action-link u-action-link--${tone}`, className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span>{children}</span>
      <span className="u-action-link__arrow" aria-hidden="true">↗</span>
    </Link>
  );
}
