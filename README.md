<h1 align="center">ESLint Plugin ITU Security</h1>
This configuration and extended set of ESLint rules aim to provide better security aid and develop experience than current ESLint security packages.

It is maintained by the Applied Security faculty of the IT University in Copenhagen.

The philosophy behind this package is to gather all well-performing rules in a single configuration, and at the same time replace rules which do not perform well with better quality alternatives.

See the **replaces** section at the end for insights on which packages this one aims to replace.

## Getting started
- Requires Node.js >= 14
- Requires ESLint >= 8

```bash
npm i -D eslint-plugin-itu-security
```

## Recommended setup

For the default setup, please add the following to your `.eslintrc`:

TODO: move the extends extras to our shareable config
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:itu-security/recommended",
    "plugin:anti-trojan-source/recommended"
  ],
  "rules": {
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-caller": "error",
    "no-new-func": "error"
  },
  // Please include the environments that you use when using this plugin.
  // Doing so will enhance the results.
  "env": { 
    "node": true,
    "browser": true,
    "es6": true
  },
  // Optional overrides, for projects which includes typescript:
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "extends": ["plugin:@typescript-eslint/recommended"],
      // Please include the "project" configuration when using typescript.
      // See more at https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser#parseroptionsproject
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "project": ["./tsconfig.json"]
      }
    }
  ]
}
```
## Optional setup

## Rules

## Replaces
This package aims to replace the functionality found in the below packages:
...