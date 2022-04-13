import { AST_NODE_TYPES, ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import { traceValue } from "eslint-rule-dev-toolkit";

// Relevant file system members.
enum EFSMembers {
    READFILE = 'readFile',
    READFILESYNC = 'readFileSync'
}

const createRule = ESLintUtils.RuleCreator(name => `https://example.com/rule/${name}`);

// Nodejs.org documentation https://nodejs.org/api/fs.html#fsreadfilepath-options-callback
export const rule = createRule({
    create(context) {
        return {
            CallExpression(node) {
                // ex. readFile() or fs.readFile()
                if (isCallExpressionMemberFS(node) || isCallExpressionFS(node)) {
                    const { result } = traceValue(node.arguments[0], context, (node) => node.type === AST_NODE_TYPES.Literal);

                    if (!result.isVerified) {
                        context.report({
                            messageId: 'error',
                            node: node,
                        });
                    }
                }
            },
        };
    },
    name: 'no-unsafe-file-access',
    meta: {
        docs: {
            description: 'File access via anything but strings is unsafe. Specify paths via strings.',
            recommended: 'warn',
        },
        messages: {
            error: 'Found unsafe argument provided to fs.read-file. Specify path via string.',
        },
        type: 'problem',
        schema: [],
    },
    defaultOptions: [],
});

export default rule;


const isCallExpressionMemberFS = (node: TSESTree.CallExpression) => {
    if (node.callee.type !== AST_NODE_TYPES.MemberExpression) return false;

    const isMemberObjectFS = (node.callee as TSESTree.MemberExpression).object.type === AST_NODE_TYPES.Identifier
        && ((node.callee as TSESTree.MemberExpression).object as TSESTree.Identifier).name === "fs";

    const isMemberPropertyReadFile = (node.callee as TSESTree.MemberExpression).property.type === AST_NODE_TYPES.Identifier
        && stringInEnum(EFSMembers, ((node.callee as TSESTree.MemberExpression).property as TSESTree.Identifier).name);

    return isMemberObjectFS && isMemberPropertyReadFile;
}

const isCallExpressionFS = (node: TSESTree.CallExpression) => node.callee.type === AST_NODE_TYPES.Identifier && stringInEnum(EFSMembers, node.callee.name);

/**
 * Takes an enum e and a string s and returns whether the string is a value in the enum.
 */
const stringInEnum = (e: { [s: number]: string }, s: string): boolean => (Object.values(e) as string[]).includes(s);