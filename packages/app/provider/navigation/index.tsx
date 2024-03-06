import { NavigationContainer } from "@react-navigation/native";
import {
  TamaguiNavigationDarkTheme,
  TamaguiNavigationDefaultTheme,
} from "app/theme/nativeNavigationThemes";
import { useMemo } from "react";

type AppNavContainerProps = {
  children: React.ReactNode;
  theme?: string;
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
      theme={theme === "dark" ? TamaguiNavigationDarkTheme : TamaguiNavigationDefaultTheme}
    >
      {children}
    </NavigationContainer>
  );
};
