import { FlatCompat } from "@eslint/eslintrc"

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: [
      "next",
      "next/core-web-vitals",
      "next/typescript",
      "plugin:prettier/recommended",
      "plugin:jsx-a11y/recommended",
      "plugin:import/recommended",
    ],
    plugins: ["prettier", "jsx-a11y"],
    rules: {
      "prettier/prettier": [
        "error",
        {
          trailingComma: "all",
          semi: false,
          tabWidth: 2,
          singleQuote: false,
          printWidth: 80,
          endOfLine: "auto",
          arrowParens: "always",
          plugins: ["prettier-plugin-tailwindcss"],
        },
        {
          usePrettierrc: false,
        },
      ],
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal"],
          pathGroups: [
            {
              pattern: "{react,react-dom/**}",
              group: "external",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],
      "import/named": "off",
      "react/react-in-jsx-scope": "off",
      "jsx-a11y/media-has-caption": "off",
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/role-supports-aria-props": "warn",
    },
    ignorePatterns: [
      ".next/*",
      ".source/*",
      "next-env.d.ts",
      "*.css",
      "dist",
      "public/*",
      "*.config.js",
      "*.config.ts",
      "node_modules",
      "coverage",
      ".next",
      "build",
    ],
  }),
]

export default eslintConfig
