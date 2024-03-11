import { NavigationContainer } from "@react-navigation/native";
import { Theme } from "app/theme/constants";
import {
  TamaguiNavigationDarkTheme,
  TamaguiNavigationDefaultTheme,
} from "app/theme/nativeNavigationThemes";
import { useMemo } from "react";

type AppNavContainerProps = {
  children: React.ReactNode;
  theme?: Theme;
};

export const AppNavContainer = ({ children, theme }: AppNavContainerProps) => {
  return (
    <NavigationContainer
      linking={useMemo(
        () => ({
          prefixes: ["/"],
          config: {
            initialRouteName: "home",
            screens: {
              home: "",
              user: "user/:id",
            },
          },
        }),
        [],
      )}
      theme={theme === Theme.Dark ? TamaguiNavigationDarkTheme : TamaguiNavigationDefaultTheme}
    >
      {children}
    </NavigationContainer>
  );
};
