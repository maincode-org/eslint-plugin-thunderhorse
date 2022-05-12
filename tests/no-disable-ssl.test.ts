import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync } from 'fs';
import rule from '../src/rules/no-disable-ssl';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-disable-ssl', rule, {
  valid: [{ code: readFileSync('tests/target-files/no-disable-ssl/safe.js', 'utf-8') }],
  invalid: [{ code: readFileSync('tests/target-files/no-disable-ssl/unsafe.js', 'utf-8'), errors: [{ messageId: 'error' }] }],
});
