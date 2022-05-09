import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);

// Nodejs.org documentation https://nodejs.org/api/buffer.html#static-method-bufferallocsize-fill-encoding
export const rule = createRule({
  create(context) {
    return {
      MemberExpression(node) {
        const isObjectBuffer = node.object.type === AST_NODE_TYPES.Identifier && node.object.name === 'Buffer';
        const isMemberUnsafeAlloc = node.property.type === AST_NODE_TYPES.Identifier && node.property.name === 'allocUnsafe';
        if (isObjectBuffer && isMemberUnsafeAlloc) {
          context.report({
            messageId: 'error',
            node: node,
          });
        }
      },
    };
  },
  name: 'no-unsafe-buffer-allocation',
  meta: {
    docs: {
      description: 'Use of allocUnsafe() is unsafe. Use Buffer.alloc().',
      recommended: 'warn',
    },
    messages: {
      error: 'Found use of allocUnsafe. Use Buffer.alloc()',
    },
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});

export default rule;
