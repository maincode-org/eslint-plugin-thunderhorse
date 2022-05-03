import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync } from 'fs';
import rule from '../src/rules/no-unknown-src-in-fs';

const ruleTester = new ESLintUtils.RuleTester({
    parser: '@typescript-eslint/parser',
});

ruleTester.run('no-unknown-src-in-fs', rule, {
    valid: [
        // readFile()
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file/safe-variable.js", "utf-8") },
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file/safe-member-variable.js", "utf-8") },
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file/safe-array.js", "utf-8") },
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file/safe-member-array.js", "utf-8") },

        // readFileSync()
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file-sync/safe-variable.js", "utf-8") },
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file-sync/safe-member-variable.js", "utf-8") },
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file-sync/safe-array.js", "utf-8") },
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file-sync/safe-member-array.js", "utf-8") },
    ],
    invalid: [
        // readFile()
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file/unsafe-fetch.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file/unsafe-member-fetch.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file/unsafe-user-input.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file/unsafe-member-user-input.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file/unsafe-array.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file/unsafe-member-array.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file/unsafe-variable.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file/unsafe-member-variable.js", "utf-8"), errors: [{ messageId: "error" }] },

        // readFileSync()
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file-sync/unsafe-fetch.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file-sync/unsafe-member-fetch.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file-sync/unsafe-user-input.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file-sync/unsafe-member-user-input.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file-sync/unsafe-array.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file-sync/unsafe-member-array.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file-sync/unsafe-variable.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unsafe-file-access/read-file-sync/unsafe-member-variable.js", "utf-8"), errors: [{ messageId: "error" }] },
    ],
});