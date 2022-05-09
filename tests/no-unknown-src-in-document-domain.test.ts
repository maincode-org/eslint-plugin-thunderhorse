import { ESLintUtils } from '@typescript-eslint/utils';
import rule from '../src/rules/no-unknown-src-in-document-domain';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-unknown-src-in-document-domain', rule, {
  valid: [{ code: 'document.domain = "example.com";' }],
  invalid: [{ code: 'document.domain = fetch("https://evilcorp.com/hacky-hacky");', errors: [{ messageId: 'error' }] }],
});
