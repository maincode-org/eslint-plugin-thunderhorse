import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync } from 'fs';
import rule from '../src/rules/no-unsafe-random';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-unsafe-random', rule, {
  valid: [],
  invalid: [{ code: readFileSync('tests/target-files/no-unsafe-random/unsafe.js', 'utf-8'), errors: [{ messageId: 'error' }] }],
});
