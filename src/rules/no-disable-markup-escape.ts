import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);

export const rule = createRule({
  create(context) {
    return {
      AssignmentExpression(node) {
        if (node.left.type !== AST_NODE_TYPES.MemberExpression) return;
        if (node.left.property.type !== AST_NODE_TYPES.Identifier) return;
        if (node.left.property.name !== 'escapeMarkup') return;
        if (node.right.type === AST_NODE_TYPES.Literal && node.right.value === false) {
          context.report({
            messageId: 'error',
            node: node,
          });
        }
      },
    };
  },
  name: 'no-disable-markup-escape',
  meta: {
    docs: {
      description: 'Setting escapeMarkup to false is unsafe.',
      recommended: 'warn',
    },
    messages: {
      error: 'Found assignment of object.escapeMarkup to false.',
    },
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});

export default rule;
