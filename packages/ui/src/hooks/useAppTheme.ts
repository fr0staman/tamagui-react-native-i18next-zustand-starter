import { useAppStore } from "app/store";

export const useAppTheme = () => {
  return useAppStore(({ theme, setTheme }) => ({ theme, setTheme }));
};
