import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync } from 'fs';
import rule from '../src/rules/no-postmessage-origin-wildcard';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-postmessage-origin-wildcard', rule, {
  valid: [
    { code: readFileSync('tests/target-files/no-postmessage-origin-wildcard/safe-window.js', 'utf-8') },
    { code: readFileSync('tests/target-files/no-postmessage-origin-wildcard/safe-popup.js', 'utf-8') },
  ],
  invalid: [
    { code: readFileSync('tests/target-files/no-postmessage-origin-wildcard/unsafe-window.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-postmessage-origin-wildcard/unsafe-popup.js', 'utf-8'), errors: [{ messageId: 'error' }] },
  ],
});
