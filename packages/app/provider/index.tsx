import {
  config,
  CustomToast,
  isWeb,
  TamaguiProvider,
  TamaguiProviderProps,
  ToastProvider,
} from "@my/ui";

import { ThemeListener } from "./listener/theme";
import { SafeArea } from "./safe-area";
import { ToastViewport } from "./toast";

type InnerProviderProps = Omit<TamaguiProviderProps, "config">;

export const Provider = ({ children, ...rest }: InnerProviderProps) => {
  return (
    <TamaguiProvider config={config} {...rest}>
      <SafeArea>
        <ThemeListener>
          <ToastProvider
            swipeDirection="horizontal"
            duration={6000}
            native={isWeb ? [] : ["mobile"]}
          >
            {children}

            <CustomToast />
            <ToastViewport />
          </ToastProvider>
        </ThemeListener>
      </SafeArea>
    </TamaguiProvider>
  );
};
