import { AST_NODE_TYPES, ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);

export const rule = createRule({
  create(context) {
    let serializeIdentifier: TSESTree.Identifier = undefined;
    let optionsIdentifiers: TSESTree.Identifier[] = [];

    return {
      CallExpression(node) {
        if (node.callee.type !== AST_NODE_TYPES.Identifier || node.callee.name !== serializeIdentifier.name) return;

        if (node.arguments.length > 1 && node.arguments[1].type === AST_NODE_TYPES.ObjectExpression) {
          if (optionsAreUnsafe(node.arguments[1].properties)) {
            context.report({
              messageId: 'error',
              node: node,
            });
          }
        } else if (
          node.arguments.length > 1 &&
          node.arguments[1].type === AST_NODE_TYPES.Identifier &&
          optionsIdentifiers.length > 0 &&
          findIdentifierInList(optionsIdentifiers, node.arguments[1])
        ) {
          context.report({
            messageId: 'error',
            node: node,
          });
        }
      },
      VariableDeclarator(node) {
        if (node.init.type !== AST_NODE_TYPES.ObjectExpression && node.init.type !== AST_NODE_TYPES.CallExpression) return;

        if (node.init.type === AST_NODE_TYPES.ObjectExpression) {
          if (optionsAreUnsafe(node.init.properties)) {
            if (node.id.type !== AST_NODE_TYPES.Identifier) return;
            optionsIdentifiers = [...optionsIdentifiers, node.id];
          }
        } else {
          if (node.init.callee.type !== AST_NODE_TYPES.Identifier || node.init.callee.name !== 'require') return;
          if (node.init.arguments[0].type !== AST_NODE_TYPES.Literal || node.init.arguments[0].value !== 'serialize-javascript') return;
          if (node.id.type !== AST_NODE_TYPES.Identifier) return;
          serializeIdentifier = node.id;
        }
      },
    };
  },
  name: 'no-unsafe-serialize-javascript',
  meta: {
    docs: {
      description: 'Serializing Javascript with the option unsafe set to true is unsafe. Set option unsafe to false.',
      recommended: 'warn',
    },
    messages: {
      error: 'Found unsafe set to true when serializing.',
    },
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});

export default rule;

const optionsAreUnsafe = (options: TSESTree.ObjectLiteralElement[]): boolean => {
  return !!options.find((property) => {
    if (property.type !== AST_NODE_TYPES.Property) return;
    if (property.key.type !== AST_NODE_TYPES.Identifier) return;
    if (property.value.type !== AST_NODE_TYPES.Literal) return;
    return property.key.name === 'unsafe' && property.value.value === true;
  });
};

const findIdentifierInList = (identifierList: TSESTree.Identifier[], identifier: TSESTree.Identifier) => {
  return identifierList.map((id) => id.name).includes(identifier.name);
};
