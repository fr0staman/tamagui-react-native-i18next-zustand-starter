import { useAppStore } from "app/store";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import type { Language } from "./languages";

export { Trans } from "next-i18next";

export const useAppTranslation = useTranslation;

type UseLanguageResult = {
  lang: Language;
  setLang: (lang: Language) => void;
};

export function useLanguage(): UseLanguageResult {
  const router = useRouter();

  const { i18n } = useAppTranslation();
  const setLang = useAppStore((state) => state.setLang);

  return {
    lang: i18n.language as Language,
    setLang: (localeCode) => {
      const { pathname, asPath, query } = router;
      const aYearFromNow = new Date();
      aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
      i18n.changeLanguage(localeCode);
      setLang(localeCode);
      // Keep user choice for Next by special cookie
      // https://nextjs.org/docs/pages/building-your-application/routing/internationalization#leveraging-the-next_locale-cookie
      setCookie("NEXT_LOCALE", localeCode, { expires: aYearFromNow });
      router.push({ pathname, query }, asPath, { locale: localeCode });
    },
  };
}
