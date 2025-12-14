import { UserDetailScreen } from "app/pages/user";
import { Metadata } from "next";

import TranslationsProvider from "../../../../components/TranslationsProvider";
import initTranslations from "../../../../i18n";
import nextI18nextConfig from "../../../../next-i18next.config";

type Props = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const { t } = await initTranslations(locale, ["seo"]);

  return {
    title: t("user.title", { id }),
    description: t("user.description"),
    icons: "/favicon.ico",
  };
}

async function User({ params }: Props) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, nextI18nextConfig.ns);

  return (
    <TranslationsProvider namespaces={nextI18nextConfig.ns} locale={locale} resources={resources}>
      <UserDetailScreen />
    </TranslationsProvider>
  );
}

export default User;
