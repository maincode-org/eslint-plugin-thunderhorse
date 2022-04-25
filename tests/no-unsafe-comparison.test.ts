import { ESLintUtils } from '@typescript-eslint/utils';
import rule from '../src/rules/no-unsafe-comparison';

const ruleTester = new ESLintUtils.RuleTester({
    parser: '@typescript-eslint/parser',
});

ruleTester.run('no-unsafe-comparison', rule, {
    valid: [
        { code: "const a = name === 'James'" },
        { code: "const a = age === 12" },
        { code: "const a = berry === 'Strawberry'" }
    ],
    invalid: [
        { code: "const a = password === 'myPassword'", errors: [{ messageId: "error" }] },
        { code: "const a = secret === 'mySecret'", errors: [{ messageId: "error" }] },
        { code: "const a = hash === 'efb31dfb23zhu'", errors: [{ messageId: "error" }] },
    ],
});