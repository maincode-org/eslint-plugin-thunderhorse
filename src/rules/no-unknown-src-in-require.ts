import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';
import { traceValue } from 'eslint-rule-dev-toolkit';

const createRule = ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);

export const rule = createRule({
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.type === 'Identifier' && node.callee.name === 'require') {
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
  name: 'no-unknown-src-in-require',
  meta: {
    docs: {
      description: 'Using anything but a string as an argument to require() is unsafe. Specify libraries via strings.',
      recommended: 'warn',
    },
    messages: {
      error: 'Found unsafe argument provided to require(). Specify libraries via strings.',
    },
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});

export default rule;
