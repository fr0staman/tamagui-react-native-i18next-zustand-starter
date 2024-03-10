import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
  Text,
  ToggleGroup,
  useAppTheme,
  useClient,
  useToastController,
  XStack,
  YStack,
} from "@my/ui";
import { ChevronDown, ChevronUp, Moon, Orbit, Sun } from "@tamagui/lucide-icons";
import { Language, languageInfos, Trans, useAppTranslation, useLanguage } from "app/i18n";
import { Theme } from "app/theme/constants";
import { useCallback, useState } from "react";
import { useLink } from "solito/link";

export function HomeScreen() {
  const linkProps = useLink({
    href: "/user/nate",
  });

  const { t } = useAppTranslation();

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" bc="$background">
        <H1 ta="center">{t("welcome")}</H1>
        <Paragraph ta="center">{t("homeDescriptionFirst")}</Paragraph>
        <Paragraph ta="center">{t("homeDescriptionSecond")}</Paragraph>

        <Separator />

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

  const switchMode = useCallback(
    (theme: Theme) => {
      // Feels smoother
      setTimeout(() => setTheme(theme), 0.001);
    },
    [setTheme],
  );

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

  const switchMode = useCallback(
    (lang: Language) => {
      // Feels smoother
      setTimeout(() => setLang(lang), 0.001);
    },
    [setLang],
  );

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
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(0);
  const toast = useToastController();
  const { t } = useAppTranslation();

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
        <Sheet.Frame ai="center" jc="center">
          <Sheet.Handle />
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
