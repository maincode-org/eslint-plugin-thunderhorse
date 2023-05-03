import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';
import { traceValue } from 'eslint-rule-dev-toolkit';

const createRule = ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);

export const rule = createRule({
  create(context) {
    return {
      BinaryExpression(node) {
        if (node.left.type !== AST_NODE_TYPES.Literal) return;

        // TODO: Improve with regex
        if (!(node.left.value as string).includes('SELECT')) return;
        if (!(node.left.value as string).includes('FROM')) return;

        const { result } = traceValue(node, context, (node) => node.type === AST_NODE_TYPES.Literal);

        if (!result.isVerified) {
          context.report({
            messageId: 'error',
            node: node,
          });
        }
      },
      TemplateLiteral(node) {
        if (!node.quasis[0].value.raw.includes('SELECT')) return;
        if (!node.quasis[0].value.raw.includes('FROM')) return;

        const { result } = traceValue(node, context, (node) => node.type === AST_NODE_TYPES.Literal);

        if (!result.isVerified) {
          context.report({
            messageId: 'error',
            node: node,
          });
        }
      },
    };
  },
  name: 'no-sql-injection',
  meta: {
    docs: {
      description: 'Using user input(s) in SQL statements can result in sql injection attacks',
      recommended: 'warn',
    },
    messages: {
      error: 'Found possible insecure values in sql statement',
    },
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});

export default rule;
