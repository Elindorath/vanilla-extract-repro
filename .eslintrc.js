'use strict';

/* eslint-disable @typescript-eslint/no-unused-vars -- Available constants to set eslint rule level */
const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';
/* eslint-enable */

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    warnOnUnsupportedTypeScriptVersion: true,
  },
  env: {
    browser: true,
    node: true,
  },
  plugins: [
    '@typescript-eslint',
    'eslint-comments',
    'canonical',
    'import',
    'react',
    'jsx-a11y',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      [require.resolve('@typescript-eslint/parser')]: [
        '.ts',
        '.mts',
        '.cts',
        '.tsx',
        '.d.ts',
      ],
    },
    'import/resolver': {
      [require.resolve('eslint-import-resolver-node')]: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      [require.resolve('eslint-import-resolver-typescript')]: {
        alwaysTryTypes: true,
      },
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'comma-dangle': [ERROR, 'always-multiline'],
    semi: OFF,
    quotes: [ERROR, 'single', { allowTemplateLiterals: true }],
    'no-console': [ERROR],
    'no-restricted-syntax': [
      ERROR,
      {
        selector: 'ImportSpecifier[importKind=type]',
        message: `Type imports should be separated from value imports. Please use the form "import type { Type } from 'module'"`,
      },
    ],

    /* ----- React ----- */
    'react/no-unknown-property': [ERROR, { ignore: ['css'] }],

    /* ----- Typescript ----- */
    '@typescript-eslint/semi': [ERROR, 'always', {
      omitLastInOneLineBlock: false,
    }],
    '@typescript-eslint/member-delimiter-style': [ERROR, {
      multiline: { delimiter: 'semi', requireLast: true },
      singleline: { delimiter: 'semi', requireLast: false },
      multilineDetection: 'brackets',
    }],
    '@typescript-eslint/consistent-type-imports': [
      ERROR,
      {
        prefer: 'type-imports',
      },
    ],
  },
};
