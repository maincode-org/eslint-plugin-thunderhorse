import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync } from 'fs';
import rule from '../src/rules/no-cookies';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-cookies', rule, {
  valid: [],
  invalid: [{ code: readFileSync('tests/target-files/no-cookies/unsafe.js', 'utf-8'), errors: [{ messageId: 'error' }] }],
});
