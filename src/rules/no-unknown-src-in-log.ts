import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';
import { traceValue } from "eslint-rule-dev-toolkit";

const createRule = ESLintUtils.RuleCreator(name => `https://example.com/rule/${name}`);

// Nodejs.org documentation https://nodejs.org/api/fs.html#filehandlereadfileoptions
export const rule = createRule({
    create(context) {
        return {
            CallExpression(node) {
                if (node.callee.type !== AST_NODE_TYPES.MemberExpression) return;
                if (node.callee.object.type !== AST_NODE_TYPES.Identifier || node.callee.object.name !== "console") return;
                if (node.callee.property.type !== AST_NODE_TYPES.Identifier || node.callee.property.name !== "log") return;

                const results = node.arguments.map(arg => traceValue(arg, context, (node) => node.type === AST_NODE_TYPES.Literal));

                if (results.find( ({ result }) => !result.isVerified)) {
                    context.report({
                        messageId: 'error',
                        node: node,
                    });
                }
            },
        };
    },
    name: 'no-unknown-src-in-log',
    meta: {
        docs: {
            description: 'Writing unvalidated user input to log files can allow an attacker to forge log entries or inject malicious content into the logs.',
            recommended: 'warn',
        },
        messages: {
            error: 'Found unknown source in console.log()',
        },
        type: 'problem',
        schema: [],
    },
    defaultOptions: [],
});

export default rule;