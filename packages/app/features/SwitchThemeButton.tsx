"use client";

import { useAppTheme, useClient } from "@my/ui";
import { useAppTranslation } from "app/i18n";
import { Theme } from "app/theme/constants";
import { Button } from "tamagui";

export const SwitchThemeButton = () => {
  const { t } = useAppTranslation("common");

  const { theme, toggle } = useAppTheme();

  const isClient = useClient();

  return (
    <Button onPress={toggle}>{t("changeTheme", { theme: isClient ? theme : Theme.System })}</Button>
  );
};
