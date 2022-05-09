import { ESLintUtils } from '@typescript-eslint/utils';
import rule from '../src/rules/no-cookies';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-cookies', rule, {
  valid: [],
  invalid: [{ code: 'document.cookie = "username=John Smith; expires=Thu, 18 Dec 2022 12:00:00 UTC; path=/";', errors: [{ messageId: 'error' }] }],
});
