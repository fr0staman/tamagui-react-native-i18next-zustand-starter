import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";

import { animations } from "./animations";
import { bodyFont, headingFont } from "./fonts";

export const config = createTamagui({
  ...defaultConfig,
  animations,
  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
  settings: {
    ...defaultConfig.settings,
    onlyAllowShorthands: false,
  },
});
