import { Theme } from "@my/ui";
import { useAppTheme } from "app/hooks/useAppTheme";
import { useColorScheme } from "react-native";

import { AppNavContainer } from "../navigation";

export const ThemeListener: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scheme = useColorScheme();
  const { theme } = useAppTheme();

  const resultTheme = theme == "system" ? (scheme as Exclude<typeof theme, "system">) : theme;

  return (
    <Theme name={resultTheme}>
      <AppNavContainer theme={resultTheme}>{children}</AppNavContainer>
    </Theme>
  );
};
