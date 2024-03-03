/**
 * @format
 */
import "react-native-gesture-handler";

import { AppRegistry, LogBox } from "react-native";

import { name as appName } from "./app.json";
import App from "./src/App";

// ISSUE: https://github.com/tamagui/tamagui/issues/1828
LogBox.ignoreLogs([/bad setState/]);

AppRegistry.registerComponent(appName, () => App);
