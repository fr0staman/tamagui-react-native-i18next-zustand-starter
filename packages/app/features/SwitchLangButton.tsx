"use client";

import { Button } from "@my/ui";

import { Language, languageInfos, useAppTranslation, useLanguage } from "../i18n";

export const SwitchLangButton = () => {
  const { t } = useAppTranslation("common");

  const { lang, setLang } = useLanguage();

  const langs = Object.values(Language);
  const next = langs[(langs.indexOf(lang) + 1) % langs.length];

  const info = languageInfos[lang];
  const label = info.flag + " " + info.name;

  return <Button onPress={() => setLang(next)}>{t("changeLanguage", { lang: label })}</Button>;
};
