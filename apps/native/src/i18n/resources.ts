// @ts-nocheck
/* ATTENTION!
 * In the Next app, file-based language namespacing is one of the requirements of the next-i18next.
 * And it should be only in next/public directory.
 * But here, Typescript swears at import, and rightly so.
 * But, I don't want to make a constant file copy-pasting, so I'll just ignore this error ¯\_(ツ)_/¯.
 * It should work correctly, so use the correct paths and the correct namespace.
 */

import en_common from "apps/next/public/locales/en/common.json";
import en_seo from "apps/next/public/locales/en/seo.json";
import uk_common from "apps/next/public/locales/uk/common.json";
import uk_seo from "apps/next/public/locales/uk/seo.json";

export const resources = {
  en: { seo: en_seo, common: en_common },
  uk: { seo: uk_seo, common: uk_common },
};
