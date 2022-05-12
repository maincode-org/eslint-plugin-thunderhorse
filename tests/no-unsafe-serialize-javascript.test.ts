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
    ...allowAllFilesInDir('tests/target-files/no-buffer-instantiation'),
    ...allowAllFilesInDir('tests/target-files/no-cookies'),
    ...allowAllFilesInDir('tests/target-files/no-disable-csrf-before-method'),
    ...allowAllFilesInDir('tests/target-files/no-disable-markup-escape'),
    ...allowAllFilesInDir('tests/target-files/no-disable-rejectUnauthorized'),
    ...allowAllFilesInDir('tests/target-files/no-disable-ssl'),
    ...allowAllFilesInDir('tests/target-files/no-insecure-url'),
    ...allowAllFilesInDir('tests/target-files/no-postmessage-origin-wildcard'),
    ...allowAllFilesInDir('tests/target-files/no-unknown-object-injection'),
    ...allowAllFilesInDir('tests/target-files/no-unknown-src-in-document-domain'),
    ...allowAllFilesInDir('tests/target-files/no-unknown-src-in-fs/read-file'),
    ...allowAllFilesInDir('tests/target-files/no-unknown-src-in-fs/read-file-sync'),
    ...allowAllFilesInDir('tests/target-files/no-unknown-src-in-log'),
    ...allowAllFilesInDir('tests/target-files/no-unknown-src-in-node-vm-runinthiscontext'),
    ...allowAllFilesInDir('tests/target-files/no-unknown-src-in-require'),
    ...allowAllFilesInDir('tests/target-files/no-unsafe-buffer-allocation'),
    ...allowAllFilesInDir('tests/target-files/no-unsafe-child-process'),
    ...allowAllFilesInDir('tests/target-files/no-unsafe-random'),
    ...allowAllFilesInDir('tests/target-files/no-unsafe-regex'),
  ],
  invalid: [
    { code: readFileSync('tests/target-files/no-unsafe-serialize-javascript/unsafe-inline-options.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unsafe-serialize-javascript/unsafe-identifier-options.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unsafe-serialize-javascript/unsafe-different-import-identifier.js', 'utf-8'), errors: [{ messageId: 'error' }] },
  ],
});
