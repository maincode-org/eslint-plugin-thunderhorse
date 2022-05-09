import { ESLintUtils } from '@typescript-eslint/utils';
import rule from '../src/rules/no-buffer-instantiation';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-buffer-instantiation', rule, {
  valid: [],
  invalid: [{ code: 'const a = new Buffer(10)', errors: [{ messageId: 'error' }] }],
});
