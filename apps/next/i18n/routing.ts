import { defineRouting } from "next-intl/routing";

import nextI18nextConfig from "../next-i18next.config";

export const routing = defineRouting(nextI18nextConfig.i18n);
