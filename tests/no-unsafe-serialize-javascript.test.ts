import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync, readdirSync } from 'fs';
import rule from '../src/rules/no-unsafe-serialize-javascript';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

const allowAllFilesInDir = (path: string) => {
  const files = readdirSync(path);
  return files.map((name) => ({ code: readFileSync(`${path}/${name}`, 'utf-8') }));
};

ruleTester.run('no-unsafe-serialize-javascript', rule, {
  valid: [
    { code: readFileSync('tests/target-files/no-unsafe-serialize-javascript/safe-inline-options.js', 'utf-8') },
    { code: readFileSync('tests/target-files/no-unsafe-serialize-javascript/safe-identifier-options.js', 'utf-8') },
    { code: readFileSync('tests/target-files/no-unsafe-serialize-javascript/safe-different-import-identifier.js', 'utf-8') },
    { code: readFileSync('tests/target-files/no-unsafe-serialize-javascript/safe-no-options.js', 'utf-8') },
    ...allowAllFilesInDir('tests/target-files/detect-missing-helmet'),
  ],
  invalid: [
    { code: readFileSync('tests/target-files/no-unsafe-serialize-javascript/unsafe-inline-options.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unsafe-serialize-javascript/unsafe-identifier-options.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unsafe-serialize-javascript/unsafe-different-import-identifier.js', 'utf-8'), errors: [{ messageId: 'error' }] },
  ],
});
