import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Provider } from 'app/provider'
import { useColorScheme } from 'react-native'
import { AppStack } from './navigation/AppStack';
import { AppNavContainer } from "./navigation/AppNavContainer";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function HomeLayout() {
  const scheme = useColorScheme()

  return (
    <SafeAreaProvider>  
      <Provider>
        <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AppNavContainer>
            <AppStack />
          </AppNavContainer>
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  )
}
