import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';
import { traceValue } from 'eslint-rule-dev-toolkit';
import safe from 'safe-regex';

const createRule = ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);

// Mozilla documentation https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
export const rule = createRule({
  create(context) {
    return {
      NewExpression(node) {
        if (node.callee.type === 'Identifier' && node.callee.name === 'RegExp') {
          const { result } = traceValue(node.arguments[0], context, (node) => node.type === AST_NODE_TYPES.Literal);

          if (!result.isVerified) {
            context.report({
              messageId: 'nonLiteralError',
              node: node,
            });
          } else if (node.arguments[0].type === AST_NODE_TYPES.Literal && !safe(node.arguments[0].value)) {
            context.report({
              messageId: 'exponentialTimeError',
              node: node,
            });
          }
        }
      },
    };
  },
  name: 'no-unsafe-regex',
  meta: {
    docs: {
      description: 'Using anything but a string in the constructor of a regular expression can result in a DOS attack. Specify expression via strings.',
      recommended: 'warn',
    },
    messages: {
      nonLiteralError: 'Found unsafe argument provided to new RegExp(). Specify expression via string.',
      exponentialTimeError: 'Found exponential time Regex.',
    },
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});

export default rule;
