# Tamagui + Next + Solito + i18next + Zustand Monorepo
<div align="center">
  <i>unofficial, made by <a href="https://github.com/fr0staman">@fr0staman</a></i>
</div>

## 🔦 About

This monorepo is a starter, example for an React Native CLI + Next.js + Tamagui + Solito + i18next + Zustand app.

This is a fork from <a href="https://github.com/tamagui/starter-free">official tamagui template</a>.

I did this to suit my needs, but I see a lot of difficulties for installation, so I decided to share, maybe it will help someone.

## 📦 Included packages

- [Tamagui](https://tamagui.dev) 🪄
- [solito](https://solito.dev) for cross-platform navigation
- React Native CLI
- Next.js
- React-navigation
- Zustand
- i18next

## 🗂 Folder layout

The main apps are:

- `native` (mobile)
- `next` (web)

- `packages` shared packages across apps
  - `ui` includes your custom UI kit that will be optimized by Tamagui
  - `app` you'll be importing most files from `app/`
    - `features` (don't use a `screens` folder. organize by feature.)
    - `provider` (all the providers that wrap the app, and some no-ops for Web.)

You can add other folders inside of `packages/` if you know what you're doing and have a good reason to.

> [!TIP]
> Switching from `app` to `pages` router:
>
> - remove `app` folder from `apps/next`
> - move `index.tsx` from `pages-example` to `pages` folder
> - rename `pages-example-user` to `user` and be sure to update `linkTarget` in `screen.tsx` to `user` as well
> - delete `SwitchRouterButton.tsx` component and remove it from `screen.tsx` and `packages/ui/src/index.tsx`
> - search for `pagesMode` keyword and remove it

## 🏁 Start the app

- Install dependencies: `yarn`

- Next.js local dev: `yarn web`

To run with optimizer on in dev mode (just for testing, it's faster to leave it off): `yarn web:extract`. To build for production `yarn web:prod`.

To see debug output to verify the compiler, add `// debug` as a comment to the top of any file.

- RN local dev: `yarn native`

## UI Kit

Note we're following the [design systems guide](https://tamagui.dev/docs/guides/design-systems) and creating our own package for components.

See `packages/ui` named `@my/ui` for how this works.

## 🆕 Add new dependencies

### Pure JS dependencies

If you're installing a JavaScript-only dependency that will be used across platforms, install it in `packages/app`:

```sh
cd packages/app
yarn add date-fns
cd ../..
yarn
```

### Native dependencies

If you're installing a library with any native code, you must install it in `native`:

```sh
cd apps/native
yarn add react-native-reanimated
cd ..
yarn
```

## Update new dependencies

### Pure JS dependencies

```sh
yarn upgrade-interactive
```

You can also install the native library inside of `packages/app` if you want to get autoimport for that package inside of the `app` folder. However, you need to be careful and install the _exact_ same version in both packages. If the versions mismatch at all, you'll potentially get terrible bugs. This is a classic monorepo issue. I use `lerna-update-wizard` to help with this (you don't need to use Lerna to use that lib).

You may potentially want to have the native module transpiled for the next app. If you get error messages with `Cannot use import statement outside a module`, you may need to use `transpilePackages` in your `next.config.js` and add the module to the array there.

### Deploying to Vercel

- Root: `apps/next`
- Install command to be `yarn set version stable && yarn install`
- Build command: leave default setting
- Output dir: leave default setting
