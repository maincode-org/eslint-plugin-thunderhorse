import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(name => `https://example.com/rule/${name}`);

export const rule = createRule({
    create(context) {
        return {
            NewExpression(node) {
                if (node.callee.type === "Identifier" && node.callee.name === 'Buffer') {
                    context.report({
                        messageId: 'error',
                        node: node,
                    });
                }
            },
        };
    },
    name: 'no-buffer-instantiation',
    meta: {
        docs: {
            description: 'Instantiation of Buffers are deprecated. Use Buffer.alloc().',
            recommended: 'warn',
        },
        messages: {
            error: 'Found new Buffer(). Use Buffer.alloc()',
        },
        type: 'problem',
        schema: [],
    },
    defaultOptions: [],
});

export default rule;