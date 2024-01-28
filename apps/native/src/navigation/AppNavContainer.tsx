import { NavigationContainer } from '@react-navigation/native'
import { useMemo } from 'react'

export function AppNavContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NavigationContainer
      linking={useMemo(
        () => ({
          prefixes: ['/'],
          config: {
            initialRouteName: 'home',
            screens: {
              home: '',
              'user': 'user/:id',
            },
          },
        }),
        []
      )}
    >
      {children}
    </NavigationContainer>
  )
}