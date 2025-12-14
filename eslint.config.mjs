import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import reactNative from "@react-native/eslint-plugin";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
import _import from "eslint-plugin-import";
import react from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    ignores: ["apps/next/.next", "apps/next/.tamagui", "**/dist/**", ".yarn"],
  },
  {
    extends: fixupConfigRules(
      compat.extends(
        "eslint:recommended",
        "plugin:prettier/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react-native/all",
        "plugin:@typescript-eslint/recommended",
      ),
    ),

    plugins: {
      react: fixupPluginRules(react),
      "@react-native": reactNative,
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      "simple-import-sort": simpleImportSort,
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        // ...reactNative.environments["react-native"]["react-native"],
        ...globals.jest,
      },

      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },

        requireConfigFile: false,
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-namespace": "off",
      "react-native/no-raw-text": "off",
      "react-native/no-inline-styles": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      camelcase: "error",
      "spaced-comment": "error",
      quotes: ["error", "double"],
      "no-duplicate-imports": "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      semi: "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "no-undef": "off",

      "no-unused-vars": [
        "off",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
]);
