import {
  config,
  CustomToast,
  TamaguiProvider,
  TamaguiProviderProps,
  ToastProvider,
  useAppTheme,
} from "@my/ui";
import { useColorScheme } from "react-native";

import { AppNavContainer } from "./navigation";
import { SafeArea } from "./safe-area";
import { ToastViewport } from "./toast";

type InnerProviderProps = Omit<TamaguiProviderProps, "config">;

export const Provider = ({ children, ...rest }: InnerProviderProps) => {
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
};
