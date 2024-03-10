import { usePreferredLanguage } from "./i18n/hooks";
import { initializeTranslation } from "./i18n/initialize";

initializeTranslation();

export const Bootstrap = ({ children }) => {
  usePreferredLanguage();

  return <>{children}</>;
};
