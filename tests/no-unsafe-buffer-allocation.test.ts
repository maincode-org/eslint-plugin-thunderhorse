import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync } from 'fs';
import rule from '../src/rules/no-unsafe-buffer-allocation';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-unsafe-buffer-allocation', rule, {
  valid: [
    { code: readFileSync('tests/target-files/no-unsafe-buffer-allocation/safe-one-param.js', 'utf-8') },
    { code: readFileSync('tests/target-files/no-unsafe-buffer-allocation/safe-two-params.js', 'utf-8') },
    { code: readFileSync('tests/target-files/no-unsafe-buffer-allocation/safe-three-params.js', 'utf-8') },
  ],
  invalid: [{ code: readFileSync('tests/target-files/no-unsafe-buffer-allocation/unsafe.js', 'utf-8'), errors: [{ messageId: 'error' }] }],
});
