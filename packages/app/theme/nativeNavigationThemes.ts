import { config } from "@my/config";

// Color scheme from @react-navigation/native 6.1.9 to tamagui 1.90.6
export const TamaguiNavigationDefaultTheme = {
  dark: false,
  colors: {
    primary: config.themes.light.blue9.val,
    background: config.themes.light.background.val,
    card: config.themes.light.backgroundStrong.val,
    text: config.themes.light.color.val,
    border: config.themes.light.borderColor.val,
    notification: config.themes.light.red9.val,
  },
};

export const TamaguiNavigationDarkTheme = {
  dark: true,
  colors: {
    primary: config.themes.dark.blue9.val,
    background: config.themes.dark.background.val,
    card: config.themes.dark.backgroundStrong.val,
    text: config.themes.dark.color.val,
    border: config.themes.dark.borderColor.val,
    notification: config.themes.light.red9.val,
  },
};
