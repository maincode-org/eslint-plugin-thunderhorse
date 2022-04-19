import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync } from "fs";
import rule from '../src/rules/no-unsafe-require';

const ruleTester = new ESLintUtils.RuleTester({
    parser: '@typescript-eslint/parser',
});

ruleTester.run('no-unsafe-require', rule, {
    valid: [
        { code: readFileSync("tests/target-files/no-unsafe-require/safe-string.js", "utf-8") },
        { code: readFileSync("tests/target-files/no-unsafe-require/safe-variable.js", "utf-8") },
        { code: readFileSync("tests/target-files/no-unsafe-require/safe-array.js", "utf-8") }
    ],
    invalid: [
        { code: readFileSync("tests/target-files/no-unsafe-require/unsafe-user-input.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unsafe-require/unsafe-fetch.js", "utf-8"), errors: [{ messageId: "error" }] },
    ],
});