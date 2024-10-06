import { useAppStore } from "app/store";
import { Theme } from "app/theme/constants";

export const useAppTheme = () => {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);

  return {
    theme,
    setTheme,
    toggle() {
      const themes = Object.values(Theme);
      const next = themes[(themes.indexOf(theme) + 1) % themes.length];
      setTheme(next);
    },
  };
};
