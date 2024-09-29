import { useAppStore } from "app/store";
import { setCookie } from "cookies-next";
import { useRouter } from "next/compat/router";
import { useTranslation } from "next-i18next";

import { Language } from "./languages";

export { Trans } from "next-i18next";

export const useAppTranslation = useTranslation;

type UseLanguageResult = {
  lang: Language;
  setLang: (lang: Language) => void;
};

export function useLanguage(): UseLanguageResult {
  const router = useRouter();

  const setLang = useAppStore((state) => state.setLang);

  return {
    lang: (router?.locale || Language.English) as Language,
    setLang: (locale) => {
      const { pathname, asPath, query } = router!;
      const aYearFromNow = new Date();
      aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
      // Keep user choice for Next by special cookie
      // https://nextjs.org/docs/pages/building-your-application/routing/internationalization#leveraging-the-next_locale-cookie
      setCookie("NEXT_LOCALE", locale, { expires: aYearFromNow });
      setLang(locale);

      router?.push({ pathname, query }, asPath, { locale });
    },
  };
}
