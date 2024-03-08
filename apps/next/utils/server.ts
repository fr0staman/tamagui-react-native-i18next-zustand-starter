import { Language } from "app/i18n";
import { initializeStore } from "app/store";
import { GetServerSideProps, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import nextI18nConfig from "../next-i18next.config";

export const getServerSideProps: GetServerSideProps = async ({
  locale = Language.English,
  params,
}) => {
  const zustandStore = initializeStore();
  const supportedLocales = Object.values(Language);
  const chosenLocale = supportedLocales.includes(locale as Language)
    ? locale
    : nextI18nConfig.i18n.defaultLocale;

  return {
    props: {
      ...(await serverSideTranslations(chosenLocale, nextI18nConfig.ns)),
      initialZustandState: JSON.parse(JSON.stringify(zustandStore.getState())),
      params,
    },
  };
};

export const getStaticProps: GetStaticProps = async ({ locale = Language.English }) => {
  const zustandStore = initializeStore();
  const supportedLocales = Object.values(Language);

  const chosenLocale = supportedLocales.includes(locale as Language)
    ? locale
    : nextI18nConfig.i18n.defaultLocale;

  return {
    props: {
      ...(await serverSideTranslations(chosenLocale, nextI18nConfig.ns)),
      initialZustandState: JSON.parse(JSON.stringify(zustandStore.getState())),
    },
  };
};
