import { AST_NODE_TYPES, ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import { traceValue } from 'eslint-rule-dev-toolkit';

const createRule = ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);

// Nodejs.org documentation https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback
export const rule = createRule({
  create(context) {
    // List of child-process members
    let members: TSESTree.Identifier[] = [];

    return {
      // Find the child-process member(s) in require.
      VariableDeclarator(node) {
        if (node.init.type !== AST_NODE_TYPES.CallExpression) return;
        if (node.init.callee.type !== AST_NODE_TYPES.Identifier || node.init.callee.name !== 'require') return;
        if (node.init.arguments.length === 0) return;
        if (node.init.arguments[0].type !== AST_NODE_TYPES.Literal) return;
        if (node.init.arguments[0].value !== 'child_process') return;
        if (node.id.type !== AST_NODE_TYPES.ObjectPattern) return;

        members = node.id.properties.map((p) => {
          if (p.type !== AST_NODE_TYPES.Property || p.key.type !== AST_NODE_TYPES.Identifier) return undefined;
          return p.key;
        });

        // Filter out all properties that does not adhere to expected node types.
        members = members.filter((p) => p);
      },
      // Find the child-process member(s) in import
      ImportDeclaration(node) {
        if (node.specifiers.length === 0) return;
        if (node.source.value !== 'child_process') return;

        members = node.specifiers.map((specifier) => specifier.local);
      },
      // Inline child-process import member access - ex.: require('child_process').exec('echo "Hello"');
      MemberExpression(node) {
        if (node.object.type !== AST_NODE_TYPES.CallExpression) return;
        if (node.object.callee.type !== AST_NODE_TYPES.Identifier || node.object.callee.name !== 'require') return;
        if (node.object.arguments.length === 0) return;
        if (node.object.arguments[0].type !== AST_NODE_TYPES.Literal || node.object.arguments[0].value !== 'child_process') return;

        if (node.parent.type !== AST_NODE_TYPES.CallExpression) return;
        if (node.parent.arguments.length === 0) return;

        const { result } = traceValue(node.parent.arguments[0], context, (node) => node.type === AST_NODE_TYPES.Literal);

        if (!result.isVerified) {
          context.report({
            messageId: 'error',
            node: node,
          });
        }
      },
      // Analyze child-processes
      CallExpression(node) {
        if (node.callee.type !== AST_NODE_TYPES.Identifier) return;
        if (!findIdentifierInList(members, node.callee)) return;
        if (node.arguments.length === 0) return;

        const { result } = traceValue(node.arguments[0], context, (node) => node.type === AST_NODE_TYPES.Literal);

        if (!result.isVerified) {
          context.report({
            messageId: 'error',
            node: node,
          });
        }
      },
    };
  },
  name: 'no-unsafe-child-process',
  meta: {
    docs: {
      description: 'Specifying the command of a child-process member with a non-literal type is unsafe.',
      recommended: 'warn',
    },
    messages: {
      error: 'Found non-literal argument provided to member of child-process.',
    },
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});

export default rule;

const findIdentifierInList = (identifierList: TSESTree.Identifier[], identifier: TSESTree.Identifier) => {
  if (identifierList.length === 0 || !identifier) return false;
  return identifierList.map((id) => id.name).includes(identifier.name);
};
