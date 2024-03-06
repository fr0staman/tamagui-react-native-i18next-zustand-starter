import { initializeStore, Provider, StoreType } from "app/store";
import { type PropsWithChildren, useRef } from "react";

export const StoreProvider = ({ children, ...props }: PropsWithChildren) => {
  const storeRef = useRef<StoreType>();

  if (!storeRef.current) {
    storeRef.current = initializeStore(props);
  }

  return <Provider value={storeRef.current}>{children}</Provider>;
};
