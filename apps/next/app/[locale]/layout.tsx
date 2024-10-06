import { Metadata } from "next";
import { notFound } from "next/navigation";

import { NextTamaguiProvider } from "../../components/NextTamaguiProvider";
import i18nConfig from "../../next-i18next.config";

export const metadata: Metadata = {
  title: "Tamagui • App Router",
  description: "Tamagui, Solito, Expo & Next.js",
  icons: "/favicon.ico",
};

export function generateStaticParams() {
  return i18nConfig.i18n.locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!i18nConfig.i18n.locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextTamaguiProvider>{children}</NextTamaguiProvider>
      </body>
    </html>
  );
}
