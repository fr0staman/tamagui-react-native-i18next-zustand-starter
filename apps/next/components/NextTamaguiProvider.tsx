"use client";

import "@tamagui/core/reset.css";
import "@tamagui/font-inter/css/400.css";
import "@tamagui/font-inter/css/700.css";
import "@tamagui/polyfill-dev";

import { config } from "@my/ui";
import { NextThemeProvider, useRootTheme } from "@tamagui/next-theme";
import { Provider } from "app/provider";
import { useServerInsertedHTML } from "next/navigation";
import { ReactNode } from "react";
import { StyleSheet } from "react-native";

export const NextTamaguiProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useRootTheme();

  useServerInsertedHTML(() => {
    // @ts-ignore
    const rnwStyle = StyleSheet.getSheet();
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: rnwStyle.textContent }} id={rnwStyle.id} />

        <style
          dangerouslySetInnerHTML={{
            // the first time this runs you'll get the full CSS including all themes
            // after that, it will only return CSS generated since the last call
            __html: config.getNewCSS(),
          }}
        />

        <style
          dangerouslySetInnerHTML={{
            __html: config.getCSS({
              // if you are using "outputCSS" option, you should use this "exclude"
              // if not, then you can leave the option out
              exclude: process.env.NODE_ENV === "development" ? null : "design-system",
            }),
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            // avoid flash of animated things on enter:
            __html: "document.documentElement.classList.add('t_unmounted')",
          }}
        />
        {/* eslint-disable-next-line react/no-unknown-property */}
        <style jsx global key="tamagui-css">{`
          html {
            font-family: "Inter";
          }
        `}</style>
      </>
    );
  });

  return (
    <NextThemeProvider
      skipNextHead
      // change default theme (system) here:
      // defaultTheme="dark"
      onChangeTheme={(next) => {
        setTheme(next as Parameters<typeof setTheme>[0]);
      }}
    >
      <Provider disableRootThemeClass defaultTheme={theme}>
        {children}
      </Provider>
    </NextThemeProvider>
  );
};
