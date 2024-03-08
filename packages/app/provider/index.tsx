import {
  config,
  CustomToast,
  TamaguiProvider,
  TamaguiProviderProps,
  ToastProvider,
  useAppTheme,
} from "@my/ui";
import { useColorScheme } from "react-native";

import type { StoreInterface } from "../store";
import { AppNavContainer } from "./navigation";
import { SafeArea } from "./safe-area";
import { StoreProvider } from "./store";
import { ToastViewport } from "./toast";

type ProviderProps = Omit<TamaguiProviderProps, "config"> & {
  zustandProps?: Partial<StoreInterface>;
};

export function Provider({ children, zustandProps, ...rest }: ProviderProps) {
  return (
    <StoreProvider {...zustandProps}>
      <InnerProvider {...rest}>{children}</InnerProvider>
    </StoreProvider>
  );
}

type InnerProviderProps = Omit<TamaguiProviderProps, "config">;

function InnerProvider({ children, ...rest }: InnerProviderProps) {
  const scheme = useColorScheme();
  const { theme } = useAppTheme();
  const resultTheme = theme == "system" ? (scheme as typeof theme) : theme;

  return (
    <TamaguiProvider config={config} defaultTheme={resultTheme} disableInjectCSS {...rest}>
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
          <AppNavContainer theme={resultTheme}>{children}</AppNavContainer>

          <CustomToast />
          <ToastViewport />
        </ToastProvider>
      </SafeArea>
    </TamaguiProvider>
  );
}
