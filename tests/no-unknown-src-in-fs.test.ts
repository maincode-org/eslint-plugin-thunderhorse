import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync } from 'fs';
import rule from '../src/rules/no-unknown-src-in-fs';
import { allowAllFilesInDir } from '../src/helpers';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-unknown-src-in-fs', rule, {
  valid: [
    // readFile()
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file/safe-variable.js', 'utf-8') },
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file/safe-member-variable.js', 'utf-8') },
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file/safe-array.js', 'utf-8') },
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file/safe-member-array.js', 'utf-8') },

    // readFileSync()
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file-sync/safe-variable.js', 'utf-8') },
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file-sync/safe-member-variable.js', 'utf-8') },
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file-sync/safe-array.js', 'utf-8') },
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file-sync/safe-member-array.js', 'utf-8') },

    ...allowAllFilesInDir('tests/target-files/detect-missing-helmet'),
    ...allowAllFilesInDir('tests/target-files/no-buffer-instantiation'),
    ...allowAllFilesInDir('tests/target-files/no-cookies'),
    ...allowAllFilesInDir('tests/target-files/no-disable-csrf-before-method'),
    ...allowAllFilesInDir('tests/target-files/no-disable-markup-escape'),
    ...allowAllFilesInDir('tests/target-files/no-disable-rejectUnauthorized'),
    ...allowAllFilesInDir('tests/target-files/no-disable-ssl'),
    ...allowAllFilesInDir('tests/target-files/no-insecure-url'),
    ...allowAllFilesInDir('tests/target-files/no-postmessage-origin-wildcard'),
    ...allowAllFilesInDir('tests/target-files/no-sql-injection'),
    ...allowAllFilesInDir('tests/target-files/no-unknown-object-injection'),
    ...allowAllFilesInDir('tests/target-files/no-unknown-src-in-document-domain'),
    ...allowAllFilesInDir('tests/target-files/no-unknown-src-in-log'),
    ...allowAllFilesInDir('tests/target-files/no-unknown-src-in-node-vm-runinthiscontext'),
    ...allowAllFilesInDir('tests/target-files/no-unknown-src-in-require'),
    ...allowAllFilesInDir('tests/target-files/no-unsafe-buffer-allocation'),
    ...allowAllFilesInDir('tests/target-files/no-unsafe-child-process'),
    ...allowAllFilesInDir('tests/target-files/no-unsafe-random'),
    ...allowAllFilesInDir('tests/target-files/no-unsafe-regex'),
    ...allowAllFilesInDir('tests/target-files/no-unsafe-serialize-javascript'),
  ],
  invalid: [
    // readFile()
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file/unsafe-fetch.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file/unsafe-member-fetch.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file/unsafe-user-input.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file/unsafe-member-user-input.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file/unsafe-array.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file/unsafe-member-array.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file/unsafe-variable.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file/unsafe-member-variable.js', 'utf-8'), errors: [{ messageId: 'error' }] },

    // readFileSync()
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file-sync/unsafe-fetch.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file-sync/unsafe-member-fetch.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file-sync/unsafe-user-input.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file-sync/unsafe-member-user-input.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file-sync/unsafe-array.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file-sync/unsafe-member-array.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file-sync/unsafe-variable.js', 'utf-8'), errors: [{ messageId: 'error' }] },
    { code: readFileSync('tests/target-files/no-unknown-src-in-fs/read-file-sync/unsafe-member-variable.js', 'utf-8'), errors: [{ messageId: 'error' }] },
  ],
});
