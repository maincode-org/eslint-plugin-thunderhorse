import { ESLintUtils } from '@typescript-eslint/utils';
import rule from '../src/rules/no-insecure-url';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-insecure-url', rule, {
  valid: [
    { code: 'const url = "https://example.com"' },
    { code: 'const url = "ftps://example.com"' },
    { code: 'const url = "http://localhost:3000"' },
    { code: 'const url = `https://example.com`' },
    { code: 'const url = `ftps://example.com`' },
    { code: 'const url = `http://localhost:3000`' },
  ],
  invalid: [
    { code: 'const url = "http://www.example.com"', errors: [{ messageId: 'error' }] },
    { code: 'const url = "ftp://www.example.com"', errors: [{ messageId: 'error' }] },
    { code: 'const url = "telnet://www.example.com"', errors: [{ messageId: 'error' }] },
    { code: 'const url = "ws://www.example.com"', errors: [{ messageId: 'error' }] },
    { code: 'const url = `http://www.example.com`', errors: [{ messageId: 'error' }] },
    { code: 'const url = `ftp://www.example.com`', errors: [{ messageId: 'error' }] },
    { code: 'const url = `telnet://www.example.com`', errors: [{ messageId: 'error' }] },
    { code: 'const url = `ws://www.example.com`', errors: [{ messageId: 'error' }] },
  ],
});
