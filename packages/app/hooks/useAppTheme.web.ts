import { useThemeSetting } from "@tamagui/next-theme";
import { initialState, useAppStore } from "app/store";
import { Theme } from "app/theme/constants";

export const useAppTheme = () => {
  const { current, set: setNextTheme } = useThemeSetting();

  const setStoreTheme = useAppStore((state) => state.setTheme);

  function setTheme(newTheme: Theme) {
    setStoreTheme(newTheme);
    setNextTheme(newTheme);
  }

  return {
    // Next theme is undefined if rendered on server.
    // But, in client, I dont wan't to subscribe store theme update,
    // so I'll just put initial store state theme.
    // And this way we avoid unnecessary rendering on theme change.
    theme: current || initialState.theme,
    setTheme,
    toggle() {
      const themes = Object.values(Theme);
      const next =
        themes[(themes.indexOf((current || initialState.theme) as Theme) + 1) % themes.length];
      setTheme(next);
    },
  };
};
