import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync } from 'fs';
import rule from '../src/rules/no-unknown-src-in-document-domain';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-unknown-src-in-document-domain', rule, {
  valid: [{ code: readFileSync('tests/target-files/no-unknown-src-in-document-domain/safe.js', 'utf-8') }],
  invalid: [{ code: readFileSync('tests/target-files/no-unknown-src-in-document-domain/unsafe.js', 'utf-8'), errors: [{ messageId: 'error' }] }],
});
