import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';
import { traceValue } from "eslint-rule-dev-toolkit";

const createRule = ESLintUtils.RuleCreator(name => `https://example.com/rule/${name}`);

export const rule = createRule({
    create(context) {
        return {
            MemberExpression(node) {
                if (node.computed) {
                    const { result } = traceValue(node.property, context, (node) => node.type === AST_NODE_TYPES.Literal);

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
    name: 'no-unknown-object-injection',
    meta: {
        docs: {
            description: 'Using anything but a string to access object or class members are unsafe. Specify members via strings.',
            recommended: 'warn',
        },
        messages: {
            error: 'Found unsafe argument provided to object or class. Specify members via strings.',
        },
        type: 'problem',
        schema: [],
    },
    defaultOptions: [],
});

export default rule;