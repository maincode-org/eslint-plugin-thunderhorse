import { AST_NODE_TYPES, ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);

export const rule = createRule({
  create(context) {
    let isCSRFDeclared = false;
    let expressIdentifier: TSESTree.Identifier = undefined;

    return {
      ImportDeclaration(node) {
        if (node.source.type !== AST_NODE_TYPES.Literal) return;
        if (node.source.value !== 'express') return;

        expressIdentifier = node.specifiers[0].local;
      },
      MemberExpression(node) {
        if (node.object.type !== AST_NODE_TYPES.Identifier) return;

        // If you can rename in require - find a way to check that and refactor the code line below
        if (node.object.name !== 'express' && expressIdentifier && node.object.name !== expressIdentifier.name) return;

        if (node.property.type !== AST_NODE_TYPES.Identifier) return;

        if (node.property.name === 'csrf') {
          isCSRFDeclared = true;
        } else if (node.property.name === 'methodOverride' && isCSRFDeclared) {
          context.report({
            messageId: 'error',
            node: node,
          });
        }
      },
    };
  },
  name: 'no-disable-csrf-before-method',
  meta: {
    docs: {
      description: '',
      recommended: 'warn',
    },
    messages: {
      error: '',
    },
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});

export default rule;
