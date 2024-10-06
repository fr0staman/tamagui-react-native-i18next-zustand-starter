/* eslint-disable react/prop-types */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "app/pages/home";
import { UserDetailScreen } from "app/pages/user";

import { useAppTranslation } from "../i18n";

const Stack = createNativeStackNavigator<{
  home: undefined;
  user: {
    id: string;
  };
}>();

export function AppStack() {
  const { t } = useAppTranslation("seo");

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="user"
        component={UserDetailScreen}
        options={(props) => ({
          title: t("user.title", { id: props.route.params.id }),
        })}
      />
    </Stack.Navigator>
  );
}
