import "@tamagui/core/reset.css";
import "@tamagui/font-inter/css/400.css";
import "@tamagui/font-inter/css/700.css";
import "raf/polyfill";

import { NextThemeProvider, useRootTheme } from "@tamagui/next-theme";
import { Provider } from "app/provider";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import type { SolitoAppProps } from "solito";

if (process.env.NODE_ENV === "production") {
  require("../public/tamagui.css");
}

function MyApp({ Component, pageProps }: SolitoAppProps) {
  return (
    <>
      <Head>
        <title>Tamagui • Pages Router</title>
        <meta
          name="description"
          content="Tamagui, Solito, Zustand, i18next, React Native & Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            // avoid flash of animated things on enter:
            __html: "document.documentElement.classList.add('t_unmounted')",
          }}
        />
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useRootTheme();

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <NextThemeProvider onChangeTheme={setTheme as any}>
      <Provider disableRootThemeClass disableInjectCSS defaultTheme={theme}>
        {children}
      </Provider>
    </NextThemeProvider>
  );
}

export default appWithTranslation(MyApp);
