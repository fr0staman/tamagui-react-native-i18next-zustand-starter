import { ToastViewport as ToastViewportOg } from "@my/ui";

import { useSafeArea } from "../safe-area/use-safe-area";

export const ToastViewport = () => {
  const { top, right, left } = useSafeArea();
  return <ToastViewportOg top={top + 5} left={left} right={right} />;
};
