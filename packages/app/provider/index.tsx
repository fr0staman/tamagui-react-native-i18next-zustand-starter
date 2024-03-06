import { config,CustomToast, TamaguiProvider, TamaguiProviderProps, ToastProvider } from "@my/ui";
import { useColorScheme } from "react-native";

import { ToastViewport } from "./toast";


export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, "config">) {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? "dark" : "light";

  return (
    <TamaguiProvider config={config} defaultTheme={theme} disableInjectCSS {...rest}>
      <SafeArea>
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
          <AppNavContainer theme={theme}>{children}</AppNavContainer>

          <CustomToast />
          <ToastViewport />
        </ToastProvider>
      </SafeArea>
    </TamaguiProvider>
  );
}
