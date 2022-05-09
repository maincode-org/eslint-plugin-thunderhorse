import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);

export const rule = createRule({
  create(context) {
    return {
      MemberExpression(node) {
        if (node.object.type !== AST_NODE_TYPES.Identifier || node.object.name !== 'Math') return;
        if (node.property.type !== AST_NODE_TYPES.Identifier || node.property.name !== 'random') return;

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
      description: `
            Math.random() is cryptographically insecure.
            It can produce predictable values and is therefore not safe to use in a security-sensitive context.
            Make sure to not use Math.random in cryptographic implementations.
            `,
      recommended: 'warn',
    },
    messages: {
      error: 'Found use of Math.random()',
    },
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});

export default rule;
