import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync } from 'fs';
import rule from '../src/rules/no-unknown-src-in-node-vm-runInThisContext';
import { allowAllFilesInDir } from '../src/helpers';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-unknown-src-in-node-vm-runInThisContext', rule, {
  valid: [
    { code: readFileSync('tests/target-files/no-unknown-src-in-node-vm-runinthiscontext/safe.js', 'utf-8') },
    { code: readFileSync('tests/target-files/no-unknown-src-in-node-vm-runinthiscontext/safe-different-import-identifier.js', 'utf-8') },
    { code: readFileSync('tests/target-files/no-unknown-src-in-node-vm-runinthiscontext/safe-script.js', 'utf-8') },
    ...allowAllFilesInDir('tests/target-files/detect-missing-helmet'),
    ...allowAllFilesInDir('tests/target-files/no-buffer-instantiation'),
    ...allowAllFilesInDir('tests/target-files/no-cookies'),
    ...allowAllFilesInDir('tests/target-files/no-disable-csrf-before-method'),
    ...allowAllFilesInDir('tests/target-files/no-disable-markup-escape'),
    ...allowAllFilesInDir('tests/target-files/no-disable-rejectUnauthorized'),
    ...allowAllFilesInDir('tests/target-files/no-disable-ssl'),
    ...allowAllFilesInDir('tests/target-files/no-insecure-cipher'),
    ...allowAllFilesInDir('tests/target-files/no-insecure-url'),
    ...allowAllFilesInDir('tests/target-files/no-postmessage-origin-wildcard'),
    ...allowAllFilesInDir('tests/target-files/no-sql-injection'),
    ...allowAllFilesInDir('tests/target-files/no-unknown-object-injection'),
    ...allowAllFilesInDir('tests/target-files/no-unknown-src-in-document-domain'),
    ...allowAllFilesInDir('tests/target-files/no-unknown-src-in-fs/read-file'),
    ...allowAllFilesInDir('tests/target-files/no-unknown-src-in-fs/read-file-sync'),
    ...allowAllFilesInDir('tests/target-files/no-unknown-src-in-log'),
    ...allowAllFilesInDir('tests/target-files/no-unknown-src-in-require'),
    ...allowAllFilesInDir('tests/target-files/no-unsafe-buffer-allocation'),
    ...allowAllFilesInDir('tests/target-files/no-unsafe-child-process'),
    ...allowAllFilesInDir('tests/target-files/no-unsafe-random'),
    ...allowAllFilesInDir('tests/target-files/no-unsafe-regex'),
    ...allowAllFilesInDir('tests/target-files/no-unsafe-serialize-javascript'),
  ],
  invalid: [
    { code: readFileSync('tests/target-files/no-unknown-src-in-node-vm-runinthiscontext/unsafe-fetch.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unknown-src-in-node-vm-runinthiscontext/unsafe-user-input.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unknown-src-in-node-vm-runinthiscontext/unsafe-different-import-identifier.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unknown-src-in-node-vm-runinthiscontext/unsafe-script-fetch.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unknown-src-in-node-vm-runinthiscontext/unsafe-script-user-input.js', 'utf-8'), errors: [{ messageId: 'error' }] },
  ],
});
