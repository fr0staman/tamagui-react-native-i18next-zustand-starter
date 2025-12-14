import { Metadata } from "next";
import { notFound } from "next/navigation";

import { NextTamaguiProvider } from "../../components/NextTamaguiProvider";
import i18nConfig from "../../next-i18next.config";

export const metadata: Metadata = {
  title: "Tamagui • App Router",
  description: "Tamagui, Solito, Zustand, i18next, React Native & Next.js",
  icons: "/favicon.ico",
};

export function generateStaticParams() {
  return i18nConfig.i18n.locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!i18nConfig.i18n.locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale} className="t_unmounted t_light" suppressHydrationWarning>
      <body>
        <NextTamaguiProvider>{children}</NextTamaguiProvider>
      </body>
    </html>
  );
}
