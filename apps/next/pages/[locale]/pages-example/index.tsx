import { useAppTranslation } from "app/i18n";
import { HomeScreen } from "app/pages/home";
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

export { getStaticPaths, getStaticProps } from "../../../utils/server";
