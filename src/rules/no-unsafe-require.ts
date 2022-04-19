import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';
import { traceValue } from "eslint-rule-dev-toolkit";

const createRule = ESLintUtils.RuleCreator(name => `https://example.com/rule/${name}`);

export const rule = createRule({
    create(context) {
        return {
            NewExpression(node) {
                if (node.callee.type === "Identifier" && node.callee.name === "RegExp") {
                    const { result } = traceValue(node.arguments[0], context, (node) => node.type === AST_NODE_TYPES.Literal);

                    if (!result.isVerified) {
                        context.report({
                            messageId: 'error',
                            node: node,
                        });
                    }
                }
            },
        };
    },
    name: 'no-unsafe-require',
    meta: {
        docs: {
            description: 'Using anything but a string in the constructor of a regular expression can result in a DOS attack. Specify expression via strings.',
            recommended: 'warn',
        },
        messages: {
            error: 'Found unsafe argument provided to new RegExp(). Specify expression via string.',
        },
        type: 'problem',
        schema: [],
    },
    defaultOptions: [],
});

export default rule;