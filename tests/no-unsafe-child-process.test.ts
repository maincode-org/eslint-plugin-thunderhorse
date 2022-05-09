import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync } from 'fs';
import rule from '../src/rules/no-unsafe-child-process';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-unsafe-child-process', rule, {
  valid: [
    { code: readFileSync('tests/target-files/no-unsafe-child-process/safe-exec.js', 'utf-8') },
    { code: readFileSync('tests/target-files/no-unsafe-child-process/safe-inline.js', 'utf-8') },
    { code: readFileSync('tests/target-files/no-unsafe-child-process/safe-import.js', 'utf-8') },
  ],
  invalid: [
    { code: readFileSync('tests/target-files/no-unsafe-child-process/unsafe-exec.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unsafe-child-process/unsafe-inline.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unsafe-child-process/unsafe-import.js', 'utf-8'), errors: [{ messageId: 'error' }] },
  ],
});
