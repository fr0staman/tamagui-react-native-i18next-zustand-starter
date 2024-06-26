import { Language } from "app/i18n";
import { GetServerSideProps, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import nextI18nConfig from "../next-i18next.config";

export const getServerSideProps: GetServerSideProps = async ({
  locale = Language.English,
  params,
}) => {
  const supportedLocales = Object.values(Language);
  const chosenLocale = supportedLocales.includes(locale as Language)
    ? locale
    : nextI18nConfig.i18n.defaultLocale;

  return {
    props: {
      ...(await serverSideTranslations(chosenLocale, nextI18nConfig.ns)),
      params,
    },
  };
};

export const getStaticProps: GetStaticProps = async ({ locale = Language.English }) => {
  const supportedLocales = Object.values(Language);

  const chosenLocale = supportedLocales.includes(locale as Language)
    ? locale
    : nextI18nConfig.i18n.defaultLocale;

  return {
    props: {
      ...(await serverSideTranslations(chosenLocale, nextI18nConfig.ns)),
    },
  };
};
