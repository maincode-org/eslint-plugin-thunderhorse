import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(name => `https://example.com/rule/${name}`);

// Nodejs.org documentation https://nodejs.org/api/cli.html#node_tls_reject_unauthorizedvalue
export const rule = createRule({
    create(context) {
        return {
            AssignmentExpression(node) {
                if (node.left.type !== AST_NODE_TYPES.MemberExpression) return;
                if (node.left.object.type !== AST_NODE_TYPES.MemberExpression) return;
                if (node.left.object.object.type !== AST_NODE_TYPES.Identifier || node.left.object.object.name !== "process") return;
                if (node.left.object.property.type !== AST_NODE_TYPES.Identifier || node.left.object.property.name !== "env") return;
                if (node.left.property.type !== AST_NODE_TYPES.Identifier || node.left.property.name !== "NODE_TLS_REJECT_UNAUTHORIZED") return;
                if (node.right.type !== AST_NODE_TYPES.Literal || node.right.value !== "0") return;

                context.report({
                    messageId: 'error',
                    node: node,
                });
            },
        };
    },
    name: 'no-disable-ssl',
    meta: {
        docs: {
            description: 'Setting value of NODE_TLS_REJECT_UNAUTHORIZED to 0 is unsafe.',
            recommended: 'warn',
        },
        messages: {
            error: 'Found NODE_TLS_REJECT_UNAUTHORIZED set to 0.',
        },
        type: 'problem',
        schema: [],
    },
    defaultOptions: [],
});

export default rule;