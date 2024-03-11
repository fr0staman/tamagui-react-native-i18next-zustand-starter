import { config, CustomToast, TamaguiProvider, TamaguiProviderProps, ToastProvider } from "@my/ui";

import { ThemeListener } from "./listener/theme";
import { SafeArea } from "./safe-area";
import { ToastViewport } from "./toast";

type InnerProviderProps = Omit<TamaguiProviderProps, "config">;

export const Provider = ({ children, ...rest }: InnerProviderProps) => {
  return (
    <TamaguiProvider config={config} disableInjectCSS {...rest}>
      <SafeArea>
        <ThemeListener>
          <ToastProvider
            swipeDirection="horizontal"
            duration={6000}
            native={
              [
                /* uncomment the next line to do native toasts on mobile. NOTE: it'll require you making a dev build and won't work with Expo Go */
                // 'mobile'
              ]
            }
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
