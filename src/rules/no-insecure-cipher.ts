import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';
import { traceValue } from 'eslint-rule-dev-toolkit';

const createRule = ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);

const insecureCiphers: string[] = [
  'DES',
  'DES-EDE',
  'DES-EDE3',
  'RC2',
  'RC4',
  'BF',
  'AES-128-ECB',
  'AES-192-ECB',
  'AES-256-ECB',
  'BF-ECB',
  'CAMELLIA-128-ECB',
  'CAMELLIA-192-ECB',
  'CAMELLIA-256-ECB',
  'CAST5-ECB',
  'DES-ECB',
  'GOST89-ECB',
  'RC2-ECB',
];

export const rule = createRule({
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.type !== AST_NODE_TYPES.MemberExpression) return;
        if (node.callee.object.type !== AST_NODE_TYPES.Identifier) return;
        if (node.callee.object.name !== 'crypto') return;
        if (node.callee.property.type !== AST_NODE_TYPES.Identifier) return;
        if (node.callee.property.name !== 'createCipheriv') return;

        if (node.arguments.length !== 3 && node.arguments.length !== 4) return;

        const { result } = traceValue(node.arguments[0], context, (node) => node.type === AST_NODE_TYPES.Literal && !insecureCiphers.includes(node.value));

        if (!result.isVerified)
          context.report({
            messageId: 'error',
            node: node,
          });
      },
    };
  },
  name: 'no-insecure-cipher',
  meta: {
    docs: {
      description: 'Using weak ciphers are insecure',
      recommended: 'warn',
    },
    messages: {
      error: 'Found weak and insecure cipher',
    },
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});

export default rule;
