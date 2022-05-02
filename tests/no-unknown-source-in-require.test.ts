import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync } from "fs";
import rule from '../src/rules/no-unknown-source-in-require';

const ruleTester = new ESLintUtils.RuleTester({
    parser: '@typescript-eslint/parser',
});

ruleTester.run('no-unknown-source-in-require', rule, {
    valid: [
        { code: readFileSync("tests/target-files/no-unknown-source-in-require/safe-string.js", "utf-8") },
        { code: readFileSync("tests/target-files/no-unknown-source-in-require/safe-variable.js", "utf-8") },
        { code: readFileSync("tests/target-files/no-unknown-source-in-require/safe-array.js", "utf-8") }
    ],
    invalid: [
        { code: readFileSync("tests/target-files/no-unknown-source-in-require/unsafe-user-input.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unknown-source-in-require/unsafe-fetch.js", "utf-8"), errors: [{ messageId: "error" }] },
    ],
});