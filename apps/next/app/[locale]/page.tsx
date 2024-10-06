import { HomeScreen } from "app/pages/home";
import TranslationsProvider from "components/TranslationsProvider";

import initTranslations from "../../i18n";
import nextI18nextConfig from "../../next-i18next.config";

async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { resources } = await initTranslations(locale, nextI18nextConfig.ns);

  return (
    <TranslationsProvider namespaces={nextI18nextConfig.ns} locale={locale} resources={resources}>
      <HomeScreen />
    </TranslationsProvider>
  );
}

export default Home;
