import { AppStack } from "app/navigation/native";
import { Provider } from "app/provider";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function HomeLayout() {
  return (
    <SafeAreaProvider>
      <Provider>
        <AppStack />
      </Provider>
    </SafeAreaProvider>
  );
}
