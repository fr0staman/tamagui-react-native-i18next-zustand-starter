import { UserDetailScreen } from "app/pages/user";
import TranslationsProvider from "components/TranslationsProvider";
import { Metadata } from "next";

import initTranslations from "../../../../i18n";
import nextI18nextConfig from "../../../../next-i18next.config";

type Props = {
  params: {
    locale: string;
    id: string;
  };
};

export async function generateMetadata({ params: { locale, id } }: Props): Promise<Metadata> {
  const { t } = await initTranslations(locale, ["seo"]);

  return {
    title: t("user.title", { id }),
    description: t("user.description"),
    icons: "/favicon.ico",
  };
}

async function User({ params: { locale } }: Props) {
  const { resources } = await initTranslations(locale, nextI18nextConfig.ns);

  return (
    <TranslationsProvider namespaces={nextI18nextConfig.ns} locale={locale} resources={resources}>
      <UserDetailScreen />
    </TranslationsProvider>
  );
}

export default User;
