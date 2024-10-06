import { Button } from "@my/ui";
import { useLink } from "solito/navigation";

import { useAppTranslation } from "../i18n";

export const SwitchRouterButton = ({ pagesMode = false }: { pagesMode?: boolean }) => {
  const { t } = useAppTranslation("common");

  const linkProps = useLink({
    href: pagesMode ? "/" : "/pages-example",
  });

  return (
    <Button {...linkProps}>{t("changeRouter", { router: pagesMode ? "pages" : "app" })}</Button>
  );
};
