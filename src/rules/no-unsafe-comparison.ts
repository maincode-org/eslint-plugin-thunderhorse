import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(name => `https://example.com/rule/${name}`);

const keywords = ['password', 'secret', 'api', 'apiKey', 'token', 'auth', 'pass', 'hash'];

export const rule = createRule({
    create(context) {
        return {
            BinaryExpression(node) {
                if (
                    (node.left.type === AST_NODE_TYPES.Identifier && keywords.includes(node.left.name))
                    ||
                    (node.right.type === AST_NODE_TYPES.Identifier && keywords.includes(node.right.name))
                ) {
                    context.report({
                        messageId: 'error',
                        node: node,
                    });
                }
            },
        };
    },
    name: 'no-unsafe-comparison',
    meta: {
        docs: {
            description: 'Do not make comparisons on passwords, secrets etc.',
            recommended: 'warn',
        },
        messages: {
            error: 'Found unsafe comparison',
        },
        type: 'problem',
        schema: [],
    },
    defaultOptions: [],
});

export default rule;