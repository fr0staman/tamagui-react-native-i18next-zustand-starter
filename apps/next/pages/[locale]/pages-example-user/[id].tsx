import { useAppTranslation } from "app/i18n";
import { UserDetailScreen } from "app/pages/user";
import { NextSeo } from "next-seo";

type PageProps = {
  params: { id: string };
};

export default function Page({ params: { id } }: PageProps) {
  const { t } = useAppTranslation("seo");

  return (
    <>
      <NextSeo title={t("user.title", { id })} description={t("user.description", { id })} />
      <UserDetailScreen />
    </>
  );
}

export { getServerSideProps } from "../../../utils/server";
