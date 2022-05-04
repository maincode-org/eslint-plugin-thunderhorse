import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(name => `https://example.com/rule/${name}`);

export const rule = createRule({
    create(context) {
        return {
            MemberExpression(node) {
                if (node.object.type !== AST_NODE_TYPES.Identifier || node.object.name !== "document") return;
                if (node.property.type !== AST_NODE_TYPES.Identifier || node.property.name !== "cookie") return;

                context.report({
                    messageId: 'error',
                    node: node,
                });
            },
        };
    },
    name: 'no-cookies',
    meta: {
        docs: {
            description: 'HTTP cookies are an old client-side storage mechanism with inherent risks and limitations. Use modern alternatives such as web storage.',
            recommended: 'warn',
        },
        messages: {
            error: '',
        },
        type: 'problem',
        schema: [],
    },
    defaultOptions: [],
});

export default rule;