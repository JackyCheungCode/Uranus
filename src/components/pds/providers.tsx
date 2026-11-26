"use client";

import { PorscheDesignSystemProvider } from "@porsche-design-system/components-react/ssr";
import type { PropsWithChildren } from "react";

export function PdsProviders({ children }: PropsWithChildren) {
  return <PorscheDesignSystemProvider cdn="auto">{children}</PorscheDesignSystemProvider>;
}
