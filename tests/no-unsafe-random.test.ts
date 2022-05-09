import { ESLintUtils } from '@typescript-eslint/utils';
import rule from '../src/rules/no-unsafe-random';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-unsafe-random', rule, {
  valid: [],
  invalid: [{ code: 'Math.random()', errors: [{ messageId: 'error' }] }],
});
