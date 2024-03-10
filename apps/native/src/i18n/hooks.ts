import { Language } from "app/i18n";
import { appState } from "app/store";
import { useEffect } from "react";
import { findBestLanguageTag } from "react-native-localize";

// i18n from useAppTranslation on change causes re-rendering
// But, I just check if startup user language matches the "preconfigured"
// So, just import system i18n with full understanding of the nuances.
import i18n from "./initialize";

export const usePreferredLanguage = () => {
  const { lang, setLang, userChangedSettings } = appState.getState();

  useEffect(() => {
    let langToChange = lang;
    if (!userChangedSettings) {
      const systemMatchedLanguage =
        findBestLanguageTag(Object.values(Language))?.languageTag || Language.English;

      if (lang !== systemMatchedLanguage) {
        langToChange = systemMatchedLanguage;
        setLang(systemMatchedLanguage);
      }
    }

    // From preconfigured to user language
    if (i18n.language !== langToChange) {
      i18n.changeLanguage(langToChange);
    }

    // EXPLAIN: I need to listen lang only once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
