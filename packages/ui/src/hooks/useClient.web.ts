import { useEffect, useState } from "react";

// This hook created for preventing hydration errors
export function useClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
