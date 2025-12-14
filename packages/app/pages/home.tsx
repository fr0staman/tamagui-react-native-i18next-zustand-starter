"use client";

import {
  Anchor,
  Button,
  H1,
  isWeb,
  Paragraph,
  Separator,
  Sheet,
  useToastController,
  XStack,
  YStack,
} from "@my/ui";
import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { Trans, useAppTranslation } from "app/i18n";
import { useState } from "react";
import { useLink } from "solito/navigation";

import { SwitchLangButton } from "../features/SwitchLangButton";
import { SwitchRouterButton } from "../features/SwitchRouterButton";
import { SwitchThemeButton } from "../features/SwitchThemeButton";

export function HomeScreen({ pagesMode = false }: { pagesMode?: boolean }) {
  const { t } = useAppTranslation();

  const linkTarget = pagesMode ? "/pages-example-user" : "/user";
  const linkProps = useLink({
    href: `${linkTarget}/nate`,
  });

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" gap="$8" p="$4" bg="$background">
      <XStack
        position="absolute"
        width="100%"
        t="$6"
        gap="$6"
        justifyContent="center"
        flexWrap="wrap"
        $sm={{ position: "relative", t: 0 }}
      >
        {isWeb && <SwitchRouterButton pagesMode={pagesMode} />}
        <SwitchThemeButton />
        <SwitchLangButton />
      </XStack>
      <YStack gap="$4" backgroundColor="$background">
        <H1 textAlign="center" color="$color12">
          {t("welcome")}
        </H1>
        <Paragraph color="$color10" textAlign="center">
          {t("homeDescriptionFirst")}
        </Paragraph>

        <Separator />

        <Paragraph textAlign="center">{t("homeDescriptionSecond")}</Paragraph>

        <Separator />
      </YStack>

      <XStack display="flex" flexDirection="row" gap={"$space.2.5"}>
        <Button {...linkProps}>{t("linkToUser")}</Button>
      </XStack>

      <SheetDemo />
    </YStack>
  );
}

function SheetDemo() {
  const { t } = useAppTranslation();

  const toast = useToastController();

  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(0);

  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        animation="medium"
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        <Sheet.Handle bg="$gray8" />
        <Sheet.Frame alignItems="center" justifyContent="center" gap="$10" bg="$color2">
          <XStack gap="$2">
            <Paragraph textAlign="center">
              <Trans
                i18nKey={"modifiedBy"}
                t={t}
                components={{
                  author: (
                    <Anchor
                      key="author"
                      color="$color12"
                      href="https://github.com/fr0staman"
                      target="_blank"
                    />
                  ),
                  star: (
                    <Anchor
                      key="star"
                      color="$color12"
                      href="https://github.com/fr0staman/tamagui-react-native-i18next-zustand-starter"
                      target="_blank"
                      rel="noreferrer"
                    />
                  ),
                }}
                values={{ authorOfThisExample: "@fr0staman" }}
              />
            </Paragraph>
          </XStack>

          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false);
              toast.show(t("sheetClosed"), {
                message: t("sheetClosedMessage"),
              });
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
