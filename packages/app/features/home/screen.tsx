import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
  ToggleGroup,
  useAppTheme,
  useClient,
  useToastController,
  XStack,
  YStack,
} from "@my/ui";
import { ChevronDown, ChevronUp, Moon, Orbit, Sun } from "@tamagui/lucide-icons";
import { Theme } from "app/theme/constants";
import { useCallback, useState } from "react";
import { useLink } from "solito/link";

export function HomeScreen() {
  const linkProps = useLink({
    href: "/user/nate",
  });

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" bc="$background">
        <H1 ta="center">Welcome to Tamagui.</H1>
        <Paragraph ta="center">
          Here&apos;s a basic starter to show navigating from one screen to another. This screen
          uses the same code on Next.js and React Native.
        </Paragraph>

        <Separator />
        <Paragraph ta="center">
          Modified by{" "}
          <Anchor color="$color12" href="https://github.com/fr0staman" target="_blank">
            @fr0staman
          </Anchor>
          ,{" "}
          <Anchor
            color="$color12"
            href="https://github.com/fr0staman/tamagui-react-native-i18next-zustand-starter"
            target="_blank"
            rel="noreferrer"
          >
            give it a ⭐️
          </Anchor>
        </Paragraph>
      </YStack>

      <XStack display="flex" flexDirection="row" gap={"$space.2.5"}>
        <Button {...linkProps}>Link to user</Button>
        <ChangeThemeGroup />
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
    return null;
  }

  return (
    // CHECK: tamagui type bug
    // @ts-ignore
    <ToggleGroup type="single" disableDeactivation defaultValue={theme} onValueChange={switchMode}>
      <ToggleGroup.Item value={Theme.SYSTEM}>
        <Orbit />
      </ToggleGroup.Item>
      <ToggleGroup.Item value={Theme.LIGHT}>
        <Sun />
      </ToggleGroup.Item>
      <ToggleGroup.Item value={Theme.DARK}>
        <Moon />
      </ToggleGroup.Item>
    </ToggleGroup>
  );
};

function SheetDemo() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(0);
  const toast = useToastController();

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
              toast.show("Sheet closed!", {
                message: "Just showing how toast works...",
              });
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
