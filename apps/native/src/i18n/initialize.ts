import { Language } from "app/i18n";
import i18n, { TFunction } from "i18next";
import { initReactI18next } from "react-i18next";

import { resources } from "./resources";

export type AppTFunction = TFunction<"translation">;

export const defaultNS = "common";

export function initializeTranslation(): void {
  i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: "v3",
      defaultNS,
      resources,
      lng: Language.English,
      fallbackLng: Language.English,
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    })
    .catch(() => undefined);
}

export default i18n;
