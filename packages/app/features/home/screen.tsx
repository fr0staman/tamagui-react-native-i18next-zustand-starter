import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
  SwitchRouterButton,
  SwitchThemeButton,
  Text,
  ToggleGroup,
  useAppTheme,
  useClient,
  useToastController,
  XStack,
  YStack,
} from "@my/ui";
import { ChevronDown, ChevronUp, Moon, Orbit, Sun } from "@tamagui/lucide-icons";
import { languageInfos, Trans, useAppTranslation, useLanguage } from "app/i18n";
import { Theme } from "app/theme/constants";
import { useState } from "react";
import { Platform } from "react-native";
import { useLink } from "solito/navigation";

export function HomeScreen({ pagesMode = false }: { pagesMode?: boolean }) {
  const { t } = useAppTranslation();

  const linkTarget = pagesMode ? "/pages-example-user" : "/user";
  const linkProps = useLink({
    href: `${linkTarget}/nate`,
  });

  return (
    <YStack f={1} jc="center" ai="center" gap="$8" p="$4" bg="$background">
      <XStack
        pos="absolute"
        w="100%"
        t="$6"
        gap="$6"
        jc="center"
        fw="wrap"
        $sm={{ pos: "relative", t: 0 }}
      >
        {Platform.OS === "web" && (
          <>
            <SwitchRouterButton pagesMode={pagesMode} />
            <SwitchThemeButton />
          </>
        )}
      </XStack>
      <YStack gap="$4" bc="$background">
        <H1 ta="center" col="$color12">
          {t("welcome")}
        </H1>
        <Paragraph col="$color10" ta="center">
          {t("homeDescriptionFirst")}
        </Paragraph>

        <Separator />

        <Paragraph ta="center">{t("homeDescriptionSecond")}</Paragraph>

        <Separator />
      </YStack>

      <XStack display="flex" flexDirection="row" gap={"$space.2.5"}>
        <Button {...linkProps}>{t("linkToUser")}</Button>
        <ChangeThemeGroup />
        <ChangeLangGroup />
      </XStack>

      <SheetDemo />
    </YStack>
  );
}

const ChangeThemeGroup = () => {
  const isClient = useClient();
  const { theme, setTheme } = useAppTheme();

  // Feels smoother
  const switchMode = (theme: Theme) => setTimeout(() => setTheme(theme), 0.001);

  if (!isClient) {
    // Partial prerendering or fake state component?
    return null;
  }

  return (
    // CHECK: tamagui type bug
    // @ts-ignore
    <ToggleGroup type="single" disableDeactivation defaultValue={theme} onValueChange={switchMode}>
      <ToggleGroup.Item value={Theme.System}>
        <Orbit />
      </ToggleGroup.Item>
      <ToggleGroup.Item value={Theme.Light}>
        <Sun />
      </ToggleGroup.Item>
      <ToggleGroup.Item value={Theme.Dark}>
        <Moon />
      </ToggleGroup.Item>
    </ToggleGroup>
  );
};

const ChangeLangGroup = () => {
  const { lang, setLang } = useLanguage();

  // Feels smoother
  const switchMode = (lang) => setTimeout(() => setLang(lang), 0.001);

  return (
    // CHECK: tamagui type bug
    // @ts-ignore
    <ToggleGroup type="single" disableDeactivation defaultValue={lang} onValueChange={switchMode}>
      {Object.entries(languageInfos).map(([code, info]) => {
        return (
          <ToggleGroup.Item key={code} value={code}>
            <Text>{info.flag}</Text>
          </ToggleGroup.Item>
        );
      })}
    </ToggleGroup>
  );
};

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
        <Sheet.Frame ai="center" jc="center" gap="$10" bg="$color2">
          <XStack gap="$2">
            <Paragraph ta="center">
              <Trans
                i18nKey={"modifiedBy"}
                t={t}
                components={{
                  author: (
                    <Anchor color="$color12" href="https://github.com/fr0staman" target="_blank" />
                  ),
                  star: (
                    <Anchor
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
