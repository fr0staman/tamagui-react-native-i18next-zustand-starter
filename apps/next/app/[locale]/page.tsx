import { HomeScreen } from "app/pages/home";
import { Metadata } from "next";

import TranslationsProvider from "../../components/TranslationsProvider";
import initTranslations from "../../i18n";
import nextI18nextConfig from "../../next-i18next.config";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await initTranslations(locale, ["seo"]);

  return {
    title: t("home.title", { router: "App" }),
    description: t("home.description"),
    icons: "/favicon.ico",
  };
}

async function Home({ params }: Props) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, nextI18nextConfig.ns);

  return (
    <TranslationsProvider namespaces={nextI18nextConfig.ns} locale={locale} resources={resources}>
      <HomeScreen />
    </TranslationsProvider>
  );
}

export default Home;
