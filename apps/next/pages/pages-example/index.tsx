import { HomeScreen } from "app/features/home/screen";
import { useAppTranslation } from "app/i18n";
import { NextSeo } from "next-seo";

export default function Page() {
  const { t } = useAppTranslation("seo");

  return (
    <>
      <NextSeo title={t("home.title")} description={t("home.description")} />
      <HomeScreen pagesMode={true} />
    </>
  );
}

export { getStaticProps } from "../../utils/server";
