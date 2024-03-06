import { useThemeSetting } from "@tamagui/next-theme";
import { useAppStore } from "app/store";

export const useAppTheme = () => {
  const { current, set: setNextTheme } = useThemeSetting();
  const { theme, setTheme } = useAppStore(({ theme, setTheme }) => ({ theme, setTheme }));

  return {
    theme: current || theme,
    setTheme: (newTheme: Parameters<typeof setTheme>[0]) => {
      setNextTheme(newTheme);
      setTheme(newTheme);
    },
  };
};
