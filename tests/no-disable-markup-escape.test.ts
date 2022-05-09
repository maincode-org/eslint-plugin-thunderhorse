import { ESLintUtils } from '@typescript-eslint/utils';
import rule from '../src/rules/no-disable-markup-escape';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-disable-markup-escape', rule, {
  valid: [{ code: 'const a = {}; a.escapeMarkup = true;' }],
  invalid: [{ code: 'const a = {}; a.escapeMarkup = false;', errors: [{ messageId: 'error' }] }],
});
