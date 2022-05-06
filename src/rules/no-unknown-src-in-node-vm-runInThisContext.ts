import { AST_NODE_TYPES, ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import { traceValue } from "eslint-rule-dev-toolkit";

const createRule = ESLintUtils.RuleCreator(name => `https://example.com/rule/${name}`);

// Nodejs.org documentation https://nodejs.org/api/vm.html#vm-executing-javascript
export const rule = createRule({
    create(context) {
        let vmIdentifier: TSESTree.Identifier = undefined;
        let unsafeScriptIdentifier: TSESTree.Identifier = undefined;

        return {
            CallExpression(node) {
                if (node.callee.type !== AST_NODE_TYPES.MemberExpression) return;
                if (node.callee.object.type !== AST_NODE_TYPES.Identifier) return;

                if (unsafeScriptIdentifier) { // script.runInThisContext();
                    if (node.callee.object.name !== unsafeScriptIdentifier.name) return;
                    if (node.callee.property.type !== AST_NODE_TYPES.Identifier || node.callee.property.name !== "runInThisContext") return;
                    context.report({
                        messageId: 'error',
                        node: node,
                    });
                } else { // vm.runInThisContext('');
                    if (!vmIdentifier || node.callee.object.name !== vmIdentifier.name) return;
                    if (node.callee.property.type !== AST_NODE_TYPES.Identifier || node.callee.property.name !== "runInThisContext") return;

                    if (node.arguments.length === 0) return;

                    const { result } = traceValue(node.arguments[0], context, (node) => node.type === AST_NODE_TYPES.Literal);

                    if (!result.isVerified) {
                        context.report({
                            messageId: 'error',
                            node: node,
                        });
                    }
                }
            },
            VariableDeclarator(node) {
                if (node.init.type !== AST_NODE_TYPES.CallExpression) return;
                if (node.init.callee.type !== AST_NODE_TYPES.Identifier) return;
                if (node.init.callee.name !== "require") return;
                if (node.init.arguments.length == 0 || node.init.arguments[0].type !== AST_NODE_TYPES.Literal) return;
                if (node.init.arguments[0].value !== "node:vm" && node.init.arguments[0].value !== "vm") return;

                if (node.id.type !== AST_NODE_TYPES.Identifier) return;
                vmIdentifier = node.id;
            },
            // const script = new vm.Script('globalVar += 1');
            NewExpression(node) {
                if (node.callee.type !== AST_NODE_TYPES.MemberExpression) return;
                if (node.callee.object.type !== AST_NODE_TYPES.Identifier) return;
                if (!vmIdentifier || node.callee.object.name !== vmIdentifier.name) return;
                if (node.callee.property.type !== AST_NODE_TYPES.Identifier || node.callee.property.name !== "Script") return;
                if (node.arguments.length === 0) return;

                const { result } = traceValue(node.arguments[0], context, (node) => node.type === AST_NODE_TYPES.Literal);

                if (!result.isVerified) {
                    if (node.parent.type !== AST_NODE_TYPES.VariableDeclarator || node.parent.id.type !== AST_NODE_TYPES.Identifier) return;
                    unsafeScriptIdentifier = node.parent.id;
                }
            }
        };
    },
    name: 'no-unknown-src-in-node-vm-runInThisContext',
    meta: {
        docs: {
            description: 'Specifying a non-literal value as the script to execute in runInThisContext is unsafe.',
            recommended: 'warn',
        },
        messages: {
            error: 'Found non-literal argument passed to runInThisContext.',
        },
        type: 'problem',
        schema: [],
    },
    defaultOptions: [],
});

export default rule;