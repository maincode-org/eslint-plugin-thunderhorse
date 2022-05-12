import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync } from 'fs';
import rule from '../src/rules/no-buffer-instantiation';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-buffer-instantiation', rule, {
  valid: [],
  invalid: [{ code: readFileSync('tests/target-files/no-buffer-instantiation/unsafe.js', 'utf-8'), errors: [{ messageId: 'error' }] }],
});
