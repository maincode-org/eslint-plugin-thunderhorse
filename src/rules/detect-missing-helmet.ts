import { AST_NODE_TYPES, ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(name => `https://example.com/rule/${name}`);

export const rule = createRule({
    create(context) {
        /** Set of flags and identifier objects for determining and referencing
         ** the use of the Express library, the Helmet library and the Helmet recommended functions. */
        let isUsingExpress = false;
        let expressIdentifier: TSESTree.Identifier = undefined;

        let isUsingHelmet = false;
        let helmetIdentifier: TSESTree.Identifier = undefined;

        let isUsingHelmetDefaults = false;

        return {
            VariableDeclarator(node) {
                // Proceed only if the variable declaration is a "require" statement
                if (node.init.type !== AST_NODE_TYPES.CallExpression) return;
                if (node.init.callee.type !== AST_NODE_TYPES.Identifier || node.init.callee.name !== "require") return;
                if (node.id.type !== AST_NODE_TYPES.Identifier) return;

                // Checks if the required module (the last argument) is express or helmet
                if (node.init.arguments.length === 0) return;
                const argument = node.init.arguments[0];

                if (!argument) return;
                if (argument.type !== AST_NODE_TYPES.Literal) return;

                // When express, set the name of the express import identifier
                if (argument.value === 'express') {
                    isUsingExpress = true;
                    expressIdentifier = node.id;
                }

                // When helmet, set the name of the helmet import identifier
                if (argument.value === 'helmet') {
                    isUsingHelmet = true;
                    helmetIdentifier = node.id;
                }
            },
            CallExpression(node) {
                // Proceed only for .listen function calls, which launches the express app (always the final line of code)
                if (node.callee.type !== AST_NODE_TYPES.MemberExpression) return;
                if (node.callee.property.type !== AST_NODE_TYPES.Identifier) return;

                const isListenCall = node.callee.property.name === 'listen';

                // When launching Express applications without safe Helmet.js defaults, report a warning
                if (isUsingExpress && isListenCall && (!isUsingHelmet || !isUsingHelmetDefaults)) {

                    // Provide a simple suggestion of configuring Helmet.js defaults
                    let suggestedFix = `${expressIdentifier}.use(${helmetIdentifier}());\n`;

                    // If Helmet.js is not used, suggest both import and correct configurations
                    if (!isUsingHelmet) {
                        suggestedFix = `const helmet = require('helmet'); \n${expressIdentifier}.use(helmet()); \n`;
                    }

                    context.report({
                        node,
                        messageId: "error",
                    });
                }

                // Listen calls were handled above. Validate middleware call to Helmet.js defaults
                if (!isUsingExpress || !isUsingHelmet) return;

                // Check if it is a .use call on the Express application
                if (node.callee.object.type !== AST_NODE_TYPES.Identifier) return;
                const isUseCall = !!node.callee.property && node.callee.property.name === 'use' && node.callee.object.name === expressIdentifier.name;

                // Check that the argument of the .use call, is a middleware function call
                if (node.arguments.length === 0) return;
                const argument = node.arguments[0];
                if (argument.type !== AST_NODE_TYPES.CallExpression) return;

                const isMiddlewareFunction = !!argument && isUseCall;

                // Validates that the middleware is the helmet default call
                if (argument.callee.type !== AST_NODE_TYPES.Identifier) return;

                if (isMiddlewareFunction && argument.callee.name === helmetIdentifier.name && argument.arguments.length === 0) {
                    isUsingHelmetDefaults = true;
                }
            },
        };
    },
    name: 'detect-missing-helmet',
    meta: {
        docs: {
            description: 'Disallow use of ExpressJS applications without the use of Helmet.js defaults, due to the concern that the HTTP headers might be insecurely configured.',
            recommended: 'warn',
        },
        messages: {
            error: `Use the Helmet.js module for enhanced security on HTTP response headers in your Express application.
            Also consider using the expectCt flag: https://helmetjs.github.io/docs/expect-ct/`
        },
        type: 'problem',
        schema: [],
    },
    defaultOptions: [],
});

export default rule;