import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync } from "fs";
import rule from '../src/rules/no-unknown-object-injection';

const ruleTester = new ESLintUtils.RuleTester({
    parser: '@typescript-eslint/parser',
});

ruleTester.run('no-unknown-object-injection', rule, {
    valid: [
        { code: readFileSync("tests/target-files/no-unknown-object-injection/safe-string.js", "utf-8") },
        { code: readFileSync("tests/target-files/no-unknown-object-injection/safe-variable.js", "utf-8") },
        { code: readFileSync("tests/target-files/no-unknown-object-injection/safe-array.js", "utf-8") }
    ],
    invalid: [
        { code: readFileSync("tests/target-files/no-unknown-object-injection/unsafe-user-input.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unknown-object-injection/unsafe-fetch.js", "utf-8"), errors: [{ messageId: "error" }] },
    ],
});