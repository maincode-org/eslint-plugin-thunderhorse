import { ESLintUtils } from '@typescript-eslint/utils';
import { readFileSync } from "fs";
import rule from '../src/rules/detect-missing-helmet';

const ruleTester = new ESLintUtils.RuleTester({
    parser: '@typescript-eslint/parser',
});

ruleTester.run('detect-missing-helmet', rule, {
    valid: [
        { code: readFileSync("tests/target-files/detect-missing-helmet/valid-helmet-import-and-apply.js", "utf-8") },
        { code: readFileSync("tests/target-files/detect-missing-helmet/valid-helmet-import-and-apply-different-name.js", "utf-8") },
        { code: readFileSync("tests/target-files/detect-missing-helmet/fixed-no-helmet-but-expectCt.js", "utf-8") },
        { code: readFileSync("tests/target-files/detect-missing-helmet/fixed-no-helmet-nor-expectCt.js", "utf-8") },
        { code: readFileSync("tests/target-files/detect-missing-helmet/fixed-only-helmet-no-apply.js", "utf-8") },
    ],
    invalid: [
        { code: readFileSync("tests/target-files/detect-missing-helmet/invalid-no-helmet-but-expectCt.js", "utf-8"), errors: [{messageId: "error"}] },
        { code: readFileSync("tests/target-files/detect-missing-helmet/invalid-no-helmet-nor-expectCt.js", "utf-8"), errors: [{messageId: "error"}] },
    ],
});