import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync } from 'fs';
import rule from '../src/rules/no-insecure-url';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-insecure-url', rule, {
  valid: [
    { code: readFileSync('tests/target-files/no-insecure-url/https.js', 'utf-8') },
    { code: readFileSync('tests/target-files/no-insecure-url/ftps.js', 'utf-8') },
    { code: readFileSync('tests/target-files/no-insecure-url/https-template.js', 'utf-8') },
    { code: readFileSync('tests/target-files/no-insecure-url/ftps-template.js', 'utf-8') },
    { code: readFileSync('tests/target-files/no-insecure-url/localhost.js', 'utf-8') },
    { code: readFileSync('tests/target-files/no-insecure-url/localhost-template.js', 'utf-8') },
  ],
  invalid: [
    { code: readFileSync('tests/target-files/no-insecure-url/http.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-insecure-url/ftp.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-insecure-url/telnet.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-insecure-url/ws.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-insecure-url/http-template.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-insecure-url/ftp-template.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-insecure-url/telnet-template.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-insecure-url/ws-template.js', 'utf-8'), errors: [{ messageId: 'error' }] },
  ],
});
