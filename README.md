<h1>ESLint Plugin Thunderhorse</h1>
This configuration and extended set of ESLint rules aim to provide better security aid and develop experience than current ESLint security packages.

It is maintained by the Applied Security faculty of the IT University in Copenhagen.

The philosophy behind this package is to gather all well-performing rules in a single configuration, and at the same time replace rules which do not perform well with better quality alternatives.

See the **replaces** section at the end for insights on which packages this one aims to replace.

## Getting started

- Requires Node.js >= 14
- Requires ESLint >= 8

```bash
npm i -D eslint-plugin-thunderhorse
```

## Recommended setup

For the default setup, please add the following to your `.eslintrc.json`:

> Note that the extends are our recommendation for a secure default setup. Only `plugin:thunderhorse/recommended` is required to use our package.

```json
{
  "extends": ["eslint:recommended", "plugin:thunderhorse/recommended", "plugin:anti-trojan-source/recommended"],
  "rules": {
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-caller": "error",
    "no-new-func": "error"
  },
  "env": {
    "node": true,
    "browser": true,
    "es6": true
  }
}
```

## Typescript support

For typescript based projects, add the `overrides` property at the end of your `.eslintrc.json`:

```json
{
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "extends": ["plugin:@typescript-eslint/recommended"],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "project": ["./tsconfig.json"]
      }
    }
  ]
}
```

## Rules

## Replaces

This package aims to replace the functionality found in the below packages:
...
