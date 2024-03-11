import { useAppStore } from "app/store";

export const useAppTheme = () => {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);

  return { theme, setTheme };
};
