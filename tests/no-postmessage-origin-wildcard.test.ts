import { ESLintUtils } from '@typescript-eslint/utils';
import rule from '../src/rules/no-postmessage-origin-wildcard';

const ruleTester = new ESLintUtils.RuleTester({
    parser: '@typescript-eslint/parser',
});

ruleTester.run('no-postmessage-origin-wildcard', rule, {
    valid: [
        { code: 'window.postMessage("Hello there!", "https://example.com")' },
        { code: 'const popup = window.open(""); popup.postMessage("Hello there!", "https://example.com")' },
    ],
    invalid: [
        { code: 'window.postMessage("Hello there!", "*")', errors: [{ messageId: "error" }] },
        { code: 'const popup = window.open(""); popup.postMessage("Hello there!", "*")', errors: [{ messageId: "error" }] },
    ],
});