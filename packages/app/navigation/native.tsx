/* eslint-disable react/prop-types */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "app/features/home/screen";
import { UserDetailScreen } from "app/features/user/detail-screen";

const Stack = createNativeStackNavigator<{
  home: undefined;
  user: {
    id: string;
  };
}>();

export function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="user"
        component={UserDetailScreen}
        options={(props) => ({
          title: props.route.params.id,
        })}
      />
    </Stack.Navigator>
  );
}
