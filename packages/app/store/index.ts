import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext } from "react";
import { create, useStore as useZustandStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Language } from "../i18n/languages";
import { Theme } from "../theme/constants";

export interface StoreInterface {
  lastUpdate: number;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  reset: () => void;
}

const getDefaultInitialState = () => ({
  lastUpdate: Date.now(),
  theme: Theme.System,
  lang: Language.English,
});

export type StoreType = ReturnType<typeof initializeStore>;

const zustandContext = createContext<StoreType | null>(null);

export const Provider = zustandContext.Provider;

export const useAppStore = <T>(selector: (state: StoreInterface) => T) => {
  const store = useContext(zustandContext);

  if (!store) {
    throw new Error("Store is missing the provider");
  }

  return useZustandStore(store, selector);
};

export const initializeStore = (preloadedState: Partial<StoreInterface> = {}) => {
  return create(
    persist(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (set, _get) => ({
        ...getDefaultInitialState(),
        ...preloadedState,
        setTheme: (theme) => set({ theme }),
        setLang: (lang) => set({ lang }),
        reset: () => set(getDefaultInitialState()),
      }),
      {
        name: "app-storage",
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
  );
};
