import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync } from "fs";
import rule from '../src/rules/no-unsafe-regex';

const ruleTester = new ESLintUtils.RuleTester({
    parser: '@typescript-eslint/parser',
});

ruleTester.run('no-unsafe-regex', rule, {
    valid: [
        { code: readFileSync("tests/target-files/no-unsafe-regex/safe-string.js", "utf-8") },
        { code: readFileSync("tests/target-files/no-unsafe-regex/safe-variable.js", "utf-8") },
        { code: readFileSync("tests/target-files/no-unsafe-regex/safe-array.js", "utf-8") }
    ],
    invalid: [
        { code: readFileSync("tests/target-files/no-unsafe-regex/unsafe-user-input.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unsafe-regex/unsafe-fetch.js", "utf-8"), errors: [{ messageId: "error" }] },
    ],
});