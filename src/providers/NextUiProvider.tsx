"use client"

import { NextUIProvider } from "@nextui-org/system";
import type { INextUiProvider } from "@/types";

export function NextUiProvider({ children }: INextUiProvider) {

  return (
    <NextUIProvider >
      {children}
    </NextUIProvider>
  );
}
