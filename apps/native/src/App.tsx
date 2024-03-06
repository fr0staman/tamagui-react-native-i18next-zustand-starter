import { AppStack } from "app/navigation/native";
import { Provider } from "app/provider";

export default function HomeLayout() {
  return (
    <Provider>
      <AppStack />
    </Provider>
  );
}
