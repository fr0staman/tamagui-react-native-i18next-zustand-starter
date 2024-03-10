import AsyncStorage from "@react-native-async-storage/async-storage";
import { create, useStore as useZustandStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Language } from "../i18n/languages";
import { Theme } from "../theme/constants";

type State = {
  __hasHydrated?: boolean;
  theme: Theme;
  lang: Language;
  userChangedSettings: boolean;
};

type Actions = {
  __setHasHydrated: (__hasHydrated: boolean) => void;
  setTheme: (theme: Theme) => void;
  setLang: (lang: Language) => void;
  reset: () => void;
};

const initialState = {
  theme: Theme.System,
  lang: Language.English,
  userChangedSettings: false,
};

export type StoreType = typeof appState;

export const useAppStore = <T>(selector: (state: State & Actions) => T) => {
  return useZustandStore(appState, selector);
};

export const appState = create<State & Actions>()(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (set, _get) => ({
      ...initialState,
      __setHasHydrated: (__hasHydrated) => set({ __hasHydrated }),
      setTheme: (theme) => set({ theme }),
      setLang: (lang) => set({ lang, userChangedSettings: true }),
      reset: () => set(initialState),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.__setHasHydrated(true);
      },
    },
  ),
);
