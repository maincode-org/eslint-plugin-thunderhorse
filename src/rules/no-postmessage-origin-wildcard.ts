import { AST_NODE_TYPES, ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(name => `https://example.com/rule/${name}`);

// Mozilla documentation https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
export const rule = createRule({
    create(context) {
        let windowIdentifier: TSESTree.Identifier = undefined;

        return {
            MemberExpression(node) {
                if (node.property.type !== AST_NODE_TYPES.Identifier || node.property.name !== "postMessage") return;
                if (node.parent.type !== AST_NODE_TYPES.CallExpression) return;
                if (node.parent.arguments[1].type !== AST_NODE_TYPES.Literal || node.parent.arguments[1].value !== '*') return;

                if (node.object.type !== AST_NODE_TYPES.Identifier) return;

                if (node.object.name === "window" || windowIdentifier && node.object.name === windowIdentifier.name) {
                    context.report({
                        messageId: 'error',
                        node: node,
                    });
                }
            },
            VariableDeclarator(node) {
                if (node.init.type !== AST_NODE_TYPES.CallExpression) return;
                if (node.init.callee.type !== AST_NODE_TYPES.MemberExpression) return;
                if (node.init.callee.object.type !== AST_NODE_TYPES.Identifier) return;
                if (node.init.callee.object.name === "window") {
                    if (node.id.type !== AST_NODE_TYPES.Identifier) return;
                    windowIdentifier = node.id;
                }
            }
        };
    },
    name: 'no-postmessage-origin-wildcard',
    meta: {
        docs: {
            description: 'Always provide specific target origin, not * when sending data to other windows using postMessage to avoid data leakage outside of trust boundary.',
            recommended: 'warn',
        },
        messages: {
            error: 'Found target origin on postMessage set to "*"',
        },
        type: 'problem',
        schema: [],
    },
    defaultOptions: [],
});

export default rule;