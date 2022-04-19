import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync } from "fs";
import rule from '../src/rules/no-unsafe-object-access';

const ruleTester = new ESLintUtils.RuleTester({
    parser: '@typescript-eslint/parser',
});

ruleTester.run('no-unsafe-object-access', rule, {
    valid: [
        { code: readFileSync("tests/target-files/no-unsafe-object-access/safe-string.js", "utf-8") },
        { code: readFileSync("tests/target-files/no-unsafe-object-access/safe-variable.js", "utf-8") },
        { code: readFileSync("tests/target-files/no-unsafe-object-access/safe-array.js", "utf-8") }
    ],
    invalid: [
        { code: readFileSync("tests/target-files/no-unsafe-object-access/unsafe-user-input.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unsafe-object-access/unsafe-fetch.js", "utf-8"), errors: [{ messageId: "error" }] },
    ],
});