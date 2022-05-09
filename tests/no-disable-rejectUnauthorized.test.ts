import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync } from 'fs';
import rule from '../src/rules/no-disable-rejectUnauthorized';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-disable-rejectUnauthorized', rule, {
  valid: [
    { code: readFileSync('tests/target-files/no-disabled-rejectUnauthorized/safe-inline-options.js', 'utf-8') },
    { code: readFileSync('tests/target-files/no-disabled-rejectUnauthorized/safe-identifier-options.js', 'utf-8') },
    { code: readFileSync('tests/target-files/no-disabled-rejectUnauthorized/safe-no-options.js', 'utf-8') },
  ],
  invalid: [
    { code: readFileSync('tests/target-files/no-disabled-rejectUnauthorized/unsafe-inline-options.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-disabled-rejectUnauthorized/unsafe-identifier-options.js', 'utf-8'), errors: [{ messageId: 'error' }] },
  ],
});
