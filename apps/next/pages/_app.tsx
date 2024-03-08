import "@tamagui/core/reset.css";
import "@tamagui/font-inter/css/400.css";
import "@tamagui/font-inter/css/700.css";
import "raf/polyfill";

import { NextThemeProvider, useRootTheme } from "@tamagui/next-theme";
import { Provider } from "app/provider";
import type { StoreInterface } from "app/store";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import type { SolitoAppProps } from "solito";

type StoreProps = {
  initialZustandState: StoreInterface;
};

if (process.env.NODE_ENV === "production") {
  require("../public/tamagui.css");
}

function MyApp({ Component, pageProps }: SolitoAppProps<StoreProps>) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider zustandProps={pageProps.initialZustandState}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ThemeProvider({
  children,
  zustandProps,
}: {
  children: React.ReactNode;
  zustandProps: StoreInterface;
}) {
  const [theme, setTheme] = useRootTheme();

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <NextThemeProvider onChangeTheme={setTheme as any}>
      <Provider disableRootThemeClass defaultTheme={theme} zustandProps={zustandProps}>
        {children}
      </Provider>
    </NextThemeProvider>
  );
}

export default appWithTranslation(MyApp);
