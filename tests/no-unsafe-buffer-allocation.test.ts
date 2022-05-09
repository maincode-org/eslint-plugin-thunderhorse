import { ESLintUtils } from '@typescript-eslint/utils';
import rule from '../src/rules/no-unsafe-buffer-allocation';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-unsafe-buffer-allocation', rule, {
  valid: [{ code: 'const buf = Buffer.alloc(5)' }, { code: "const buf = Buffer.alloc(5, 'a')" }, { code: "const buf = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64')" }],
  invalid: [{ code: 'const buf = Buffer.allocUnsafe(10)', errors: [{ messageId: 'error' }] }],
});
