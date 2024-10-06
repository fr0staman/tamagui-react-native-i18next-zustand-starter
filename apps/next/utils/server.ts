import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import nextI18nConfig from "../next-i18next.config";

type StandardParams = {
  locale: (typeof nextI18nConfig.i18n.locales)[number];
};

export const getServerSideProps: GetServerSideProps<object, StandardParams> = async (context) => {
  const lng = context.params?.locale || nextI18nConfig.i18n.defaultLocale;

  return {
    props: {
      ...(await serverSideTranslations(lng, nextI18nConfig.ns)),
      params: context.params,
    },
  };
};

export const getStaticProps: GetStaticProps<object, StandardParams> = async (context) => {
  const lng = context.params?.locale || nextI18nConfig.i18n.defaultLocale;

  return {
    props: {
      ...(await serverSideTranslations(lng, nextI18nConfig.ns)),
    },
  };
};

export const getStaticPaths: GetStaticPaths<StandardParams> = async () => {
  return {
    paths: [
      {
        params: {
          locale: "en",
        },
      },
      {
        params: {
          locale: "uk",
        },
      },
    ],
    fallback: false,
  };
};
