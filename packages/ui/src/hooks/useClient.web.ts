"use client";

import { useState } from "react";
import { useIsomorphicLayoutEffect } from "tamagui";

// This hook created for preventing hydration errors
export function useClient() {
  const [isClient, setIsClient] = useState(false);

  // Prevent layout shift on App Router
  useIsomorphicLayoutEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
