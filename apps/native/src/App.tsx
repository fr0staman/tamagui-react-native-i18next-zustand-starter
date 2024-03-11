import { useAppTheme } from "@my/ui";
import { AppStack } from "app/navigation/native";
import { Provider } from "app/provider";
import { Theme } from "app/theme/constants";
import { StatusBar } from "react-native";

import { Bootstrap } from "./Bootstrap";
import { RehydrateWrapper } from "./RehydrateWrapper";

export default function HomeLayout() {
  return (
    <Provider>
      <RehydrateWrapper>
        <Bootstrap>
          <StateUpdater />
          <AppStack />
        </Bootstrap>
      </RehydrateWrapper>
    </Provider>
  );
}

function StateUpdater() {
  const { theme } = useAppTheme();

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme === Theme.Dark ? "light-content" : "dark-content"}
      />
    </>
  );
}
