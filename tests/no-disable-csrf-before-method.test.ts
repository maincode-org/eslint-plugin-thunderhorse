import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync } from "fs";
import rule from '../src/rules/no-disable-csrf-before-method';

const ruleTester = new ESLintUtils.RuleTester({
    parser: '@typescript-eslint/parser',
});

ruleTester.run('no-disable-csrf-before-method', rule, {
    valid: [
        { code: readFileSync("tests/target-files/no-disabled-csrf-before-method/safe.js", "utf-8") }
    ],
    invalid: [
        { code: readFileSync("tests/target-files/no-disabled-csrf-before-method/unsafe-fetch.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-disabled-csrf-before-method/unsafe-import-rename.js", "utf-8"), errors: [{ messageId: "error" }] }
    ],
});