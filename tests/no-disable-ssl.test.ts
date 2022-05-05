import { ESLintUtils } from '@typescript-eslint/utils';
import rule from '../src/rules/no-disable-ssl';

const ruleTester = new ESLintUtils.RuleTester({
    parser: '@typescript-eslint/parser',
});

ruleTester.run('no-disable-ssl', rule, {
    valid: [{ code: 'process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1"' }],
    invalid: [{ code: 'process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"', errors: [{ messageId: "error" }] }],
});