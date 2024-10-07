# Tamagui + React Native
<div align="center">
  <i>unofficial, made by <a href="https://github.com/fr0staman">@fr0staman</a></i>
</div>

## Why?

For my interest, I wanted to try tamagui. But, I often write native modules and I like to have full control over the application. And I didn’t find any guide on how to integrate Tamagui + React Native app.

So, I decided to just do it, maybe it will help others.

## 🔧 Integration

_with React Native 0.75.3_

### 0. Add tamagui to dependencies

If you have only native app, so just install tamagui:
```bash
yarn add tamagui
```
But, if you have monorepo, I recommend install tamagui only in ui-like package. In example `@my/ui`.

### 1. Change (native) paths to `node_modules`

If you have only react-native app - skip this step.

As tamagui often with monorepo, it provides `node_modules` in root of monorepo, so we need to change paths.

- Edit `metro.config.js` to resolve monorepo root path

### Android specific
- Change paths in `android/app/build.gradle`
- Change paths in `android/settings.gradle`
- Fill variables in `android/build.gradle`

### 2. Setup tamagui compiler

As tamagui provides compiler, we should not miss the opportunity to connect it 😌

```bash
yarn add --dev @tamagui/babel-plugin
```

And make changes in `babel.config.js`.

## Additional

_How to add fonts from `tamagui/font-*`?_

1. Create `react-native.config.js` with assets path of your `tamagui/font-*`
2. Link your assets
```bash
npx react-native-asset
```

