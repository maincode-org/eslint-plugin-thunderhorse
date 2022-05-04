import { AST_NODE_TYPES, ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(name => `https://example.com/rule/${name}`);

// Nodejs.org documentation https://nodejs.org/api/tls.html#class-tlstlssocket.
export const rule = createRule({
    create(context) {
        // List of all identifiers that gets assigned to object with property "rejectUnauthorized: false".
        let tlsOptions: TSESTree.Identifier[] = [];

        return {
            NewExpression(node) {
                if (node.callee.type !== AST_NODE_TYPES.MemberExpression) return;
                if (node.callee.object.type !== AST_NODE_TYPES.Identifier || node.callee.object.name !== "tls") return;

                if (node.arguments[1].type === AST_NODE_TYPES.ObjectExpression) {
                    if (optionsAreUnsafe(node.arguments[1].properties)) {
                        context.report({
                            messageId: 'error',
                            node: node,
                        });
                    }
                } else if (node.arguments[1].type === AST_NODE_TYPES.Identifier &&
                    (tlsOptions.length > 0 && findIdentifierInList(tlsOptions, node.arguments[1]))) {
                    context.report({
                        messageId: 'error',
                        node: node,
                    });
                }
            },
            VariableDeclarator(node) {
                if (node.init.type !== AST_NODE_TYPES.ObjectExpression) return;
                if (optionsAreUnsafe(node.init.properties)) {
                    if (node.id.type !== AST_NODE_TYPES.Identifier) return;
                    tlsOptions = [...tlsOptions, node.id];
                }
            }
        };
    },
    name: 'no-disabled-rejectUnauthorized',
    meta: {
        docs: {
            description: 'Setting rejectUnauthorized to false will not authorize socket messages.',
            recommended: 'warn',
        },
        messages: {
            error: 'Found rejectUnauthorized set to false',
        },
        type: 'problem',
        schema: [],
    },
    defaultOptions: [],
});

export default rule;

const optionsAreUnsafe = (options: TSESTree.ObjectLiteralElement[]): boolean => {
    return !!options.find(property => {
        if (property.type !== AST_NODE_TYPES.Property) return;
        if (property.key.type !== AST_NODE_TYPES.Identifier) return;
        if (property.value.type !== AST_NODE_TYPES.Literal) return;
        return property.key.name === "rejectUnauthorized" && property.value.value === false
    });
}

const findIdentifierInList = (identifierList: TSESTree.Identifier[], identifier: TSESTree.Identifier) => {
    return identifierList.map(id => id.name).includes(identifier.name);
}