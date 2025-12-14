import { NavigationContainer } from "@react-navigation/native";
import { Theme } from "app/theme/constants";
import {
  TamaguiNavigationDarkTheme,
  TamaguiNavigationDefaultTheme,
} from "app/theme/nativeNavigationThemes";

type AppNavContainerProps = {
  children: React.ReactNode;
  theme?: Theme;
};

const linking = {
  prefixes: ["/"],
  config: {
    initialRouteName: "home",
    screens: {
      home: "",
      user: "user/:id",
    },
  },
} as const;

export const AppNavContainer = ({ children, theme }: AppNavContainerProps) => {
  return (
    <NavigationContainer
      // @ts-expect-error const typing without readonly
      linking={linking}
      theme={theme === Theme.Dark ? TamaguiNavigationDarkTheme : TamaguiNavigationDefaultTheme}
    >
      {children}
    </NavigationContainer>
  );
};
