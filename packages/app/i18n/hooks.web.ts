import { useAppStore } from "app/store";
import { useTranslation } from "next-i18next";

import { Language } from "./languages";

export { Trans } from "next-i18next";

export const useAppTranslation = useTranslation;

type UseLanguageResult = {
  lang: Language;
  setLang: (lang: Language) => void;
};

// Too complicated to implement, since the code for Pages and App router is different.
// Take a closer look at the code for the "SwitchLangButton.web.tsx" button.
export function useLanguage(): UseLanguageResult {
  const i18n = useAppTranslation("common");

  const setLang = useAppStore((state) => state.setLang);

  return {
    lang: i18n.i18n.language as Language,
    setLang,
  };
}
