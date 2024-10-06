"use client";

import { Button } from "@my/ui";
import { useLink, usePathname } from "solito/navigation";

import { Language, languageInfos, useAppTranslation } from "../i18n";

const langs = Object.values(Language);

export const SwitchLangButton = () => {
  const { t, i18n } = useAppTranslation("common");

  const pathname = usePathname();

  // We dont use locale from useParams, because in pages server send null params.
  // but i18n have true info about lang from the start
  // It causes mismatch between client and server

  const lang = (i18n.language || Language.English) as Language;

  const nextLang = langs[(langs.indexOf(lang) + 1) % langs.length];

  const linkProps = useLink({
    href: "/" + nextLang + pathname?.slice(3),
  });

  const info = languageInfos[lang];
  const label = info.flag + " " + info.name;

  return <Button {...linkProps}>{t("changeLanguage", { lang: label })}</Button>;
};
