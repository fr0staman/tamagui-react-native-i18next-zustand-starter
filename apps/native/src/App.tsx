import { useAppTheme } from "@my/ui";
import { Language, useAppTranslation, useLanguage } from "app/i18n";
import { AppStack } from "app/navigation/native";
import { Provider } from "app/provider";
import { Theme } from "app/theme/constants";
import { useEffect, useMemo } from "react";
import { StatusBar } from "react-native";
import { findBestLanguageTag } from "react-native-localize";

import { initializeTranslation } from "./i18n/initialize";

initializeTranslation();

export default function HomeLayout() {
  const systemMatchedLanguage = useMemo(() => findBestLanguageTag(Object.values(Language)), []);

  return (
    <Provider zustandProps={{ lang: systemMatchedLanguage?.languageTag || Language.English }}>
      <StateUpdater>
        <AppStack />
      </StateUpdater>
    </Provider>
  );
}

function StateUpdater({ children }) {
  const { lang } = useLanguage();
  const { theme } = useAppTheme();
  const { i18n } = useAppTranslation();

  useEffect(() => {
    // Change interface language when user has set it manually.
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [i18n, lang]);

  return (
    <>
      {children}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme === Theme.Dark ? "light-content" : "dark-content"}
      />
    </>
  );
}
