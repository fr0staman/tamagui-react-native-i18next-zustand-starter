import { Button, Paragraph, YStack } from "@my/ui";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { useAppTranslation } from "app/i18n";
import { createParam } from "solito";
import { useLink } from "solito/link";

const { useParam } = createParam<{ id: string }>();

export function UserDetailScreen() {
  const [id] = useParam("id");
  const link = useLink({
    href: "/",
  });

  const { t } = useAppTranslation();

  return (
    <YStack f={1} jc="center" ai="center" space>
      <Paragraph ta="center" fow="700">
        {t("userId", { id })}
      </Paragraph>
      <Button {...link} icon={ChevronLeft}>
        {t("goHome")}
      </Button>
    </YStack>
  );
}
