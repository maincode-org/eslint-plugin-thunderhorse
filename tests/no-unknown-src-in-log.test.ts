import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync } from "fs";
import rule from '../src/rules/no-unknown-src-in-log';

const ruleTester = new ESLintUtils.RuleTester({
    parser: '@typescript-eslint/parser',
});

ruleTester.run('no-unknown-src-in-log', rule, {
    valid: [
        { code: readFileSync("tests/target-files/no-unknown-src-in-log/safe-array.js", "utf-8") },
        { code: readFileSync("tests/target-files/no-unknown-src-in-log/safe-obj.js", "utf-8") },
        { code: readFileSync("tests/target-files/no-unknown-src-in-log/safe-one-arg.js", "utf-8") },
        { code: readFileSync("tests/target-files/no-unknown-src-in-log/safe-two-args.js", "utf-8") },
    ],
    invalid: [
        { code: readFileSync("tests/target-files/no-unknown-src-in-log/unsafe-array.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unknown-src-in-log/unsafe-obj.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unknown-src-in-log/unsafe-user-input.js", "utf-8"), errors: [{ messageId: "error" }] },
    ],
});