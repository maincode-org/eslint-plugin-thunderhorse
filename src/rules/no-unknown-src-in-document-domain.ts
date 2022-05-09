import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';
import { traceValue } from 'eslint-rule-dev-toolkit';

const createRule = ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);

// Mozilla documentation https://developer.mozilla.org/en-US/docs/Web/API/Document/domain
export const rule = createRule({
  create(context) {
    return {
      AssignmentExpression(node) {
        if (node.left.type !== AST_NODE_TYPES.MemberExpression) return;
        if (node.left.object.type !== AST_NODE_TYPES.Identifier || node.left.object.name !== 'document') return;
        if (node.left.property.type !== AST_NODE_TYPES.Identifier || node.left.property.name !== 'domain') return;

        const { result } = traceValue(node.right, context, (node) => node.type === AST_NODE_TYPES.Literal);

        if (!result.isVerified) {
          context.report({
            messageId: 'error',
            node: node,
          });
        }
      },
    };
  },
  name: 'no-unknown-src-in-document-domain',
  meta: {
    docs: {
      description: 'Specifying paths in document.domain with non-literal values is potentially unsafe. Specify path via a string.',
      recommended: 'warn',
    },
    messages: {
      error: 'Found unsafe non-literal value in document.domain',
    },
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});

export default rule;
