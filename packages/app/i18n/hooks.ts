import { useAppStore } from "app/store";
import { useTranslation } from "react-i18next";

import type { Language } from "./languages";

export { Trans } from "react-i18next";

export const useAppTranslation = useTranslation;

type UseLanguageResult = {
  lang: Language;
  setLang: (lang: Language) => void;
};

export function useLanguage(): UseLanguageResult {
  const { i18n } = useAppTranslation();

  const lang = useAppStore((state) => state.lang);
  const setLang = useAppStore((state) => state.setLang);

  return {
    lang,
    setLang: (localeCode) => {
      i18n.changeLanguage(localeCode);
      setLang(localeCode);
    },
  };
}
