import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync } from 'fs';
import rule from '../src/rules/no-disable-markup-escape';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-disable-markup-escape', rule, {
  valid: [{ code: readFileSync('tests/target-files/no-disable-markup-escape/safe.js', 'utf-8') }],
  invalid: [{ code: readFileSync('tests/target-files/no-disable-markup-escape/unsafe.js', 'utf-8'), errors: [{ messageId: 'error' }] }],
});
