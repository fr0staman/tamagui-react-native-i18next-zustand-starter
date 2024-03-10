import { useAppStore } from "app/store";

export const RehydrateWrapper = ({ children }) => {
  const isAppStateHydrated = useAppStore((state) => state.__hasHydrated);

  if (isAppStateHydrated) {
    return <>{children}</>;
  }
  return null;
};
