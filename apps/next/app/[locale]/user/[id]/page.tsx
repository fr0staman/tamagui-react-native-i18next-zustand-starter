import { UserDetailScreen } from "app/pages/user";
import TranslationsProvider from "components/TranslationsProvider";

import initTranslations from "../../../../i18n";
import nextI18nextConfig from "../../../../next-i18next.config";

async function User({ params: { locale } }: { params: { locale: string } }) {
  const { resources } = await initTranslations(locale, nextI18nextConfig.ns);

  return (
    <TranslationsProvider namespaces={nextI18nextConfig.ns} locale={locale} resources={resources}>
      <UserDetailScreen />
    </TranslationsProvider>
  );
}

export default User;
