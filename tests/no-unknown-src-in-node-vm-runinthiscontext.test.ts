import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync } from 'fs';
import rule from '../src/rules/no-unknown-src-in-node-vm-runinthiscontext';

const ruleTester = new ESLintUtils.RuleTester({
    parser: '@typescript-eslint/parser',
});

ruleTester.run('no-unknown-src-in-node-vm-runinthiscontext', rule, {
    valid: [
        { code: readFileSync("tests/target-files/no-unknown-src-in-node-vm-runinthiscontext/safe.js", "utf-8") },
        { code: readFileSync("tests/target-files/no-unknown-src-in-node-vm-runinthiscontext/safe-different-import-identifier.js", "utf-8") },
        { code: readFileSync("tests/target-files/no-unknown-src-in-node-vm-runinthiscontext/safe-script.js", "utf-8") },
    ],
    invalid: [
        { code: readFileSync("tests/target-files/no-unknown-src-in-node-vm-runinthiscontext/unsafe-fetch.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unknown-src-in-node-vm-runinthiscontext/unsafe-user-input.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unknown-src-in-node-vm-runinthiscontext/unsafe-different-import-identifier.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unknown-src-in-node-vm-runinthiscontext/unsafe-script-fetch.js", "utf-8"), errors: [{ messageId: "error" }] },
        { code: readFileSync("tests/target-files/no-unknown-src-in-node-vm-runinthiscontext/unsafe-script-user-input.js", "utf-8"), errors: [{ messageId: "error" }] },
    ],
});