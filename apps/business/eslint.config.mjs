import baseConfig from '@starter/config/eslint/base';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';

const compat = new FlatCompat({
  baseDirectory: path.dirname(new URL(import.meta.url).pathname),
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['.next/', 'node_modules/'],
  },
];
