import { useThemeSetting } from "@tamagui/next-theme";
import { initialState, useAppStore } from "app/store";

export const useAppTheme = () => {
  const { current, set: setNextTheme } = useThemeSetting();

  const setTheme = useAppStore((state) => state.setTheme);

  return {
    // Next theme is undefined if rendered on server.
    // But, in client, I dont wan't to subscribe store theme update,
    // so I'll just put initial store state theme.
    // And this way we avoid unnecessary rendering on theme change.
    theme: current || initialState.theme,
    setTheme: (newTheme: Parameters<typeof setTheme>[0]) => {
      setTheme(newTheme);
      setNextTheme(newTheme);
    },
  };
};
