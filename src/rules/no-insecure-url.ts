import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);

const DEFAULT_BLOCKLIST = [/^(ftp|http|telnet|ws):\/\//i];
const DEFAULT_EXCEPTIONS = [/^http:(\/|\\u002f){2}localhost(:|\/|\\u002f)*/i];

export const rule = createRule({
  create(context) {
    const options = context.options[0] || {};
    const blocklist = (options.blocklist || DEFAULT_BLOCKLIST).map((pattern) => new RegExp(pattern, 'i'));
    const exceptions = (options.exceptions || DEFAULT_EXCEPTIONS).map((pattern) => new RegExp(pattern, 'i'));

    const matches = (patterns, value) => patterns.find((re) => re.test(value)) !== undefined;

    return {
      Literal(node) {
        if (typeof node.value !== 'string') return;
        if (matches(blocklist, node.value) && !matches(exceptions, node.value)) {
          context.report({
            node: node,
            messageId: 'error',
          });
        }
      },
      TemplateElement(node) {
        if (typeof node.value.raw === 'string' && typeof node.value.cooked === 'string') {
          const rawStringText = node.value.raw;
          const cookedStringText = node.value.cooked;

          if ((matches(blocklist, rawStringText) && !matches(exceptions, rawStringText)) || (matches(blocklist, cookedStringText) && !matches(exceptions, cookedStringText))) {
            context.report({
              node: node,
              messageId: 'error',
            });
          }
        }
      },
    };
  },
  name: 'no-insecure-url',
  meta: {
    docs: {
      description:
        'Insecure protocols such as HTTP or FTP should be replaced by their encrypted counterparts (HTTPS, FTPS) to avoid sending potentially sensitive data over untrusted networks in plaintext.',
      recommended: 'warn',
    },
    messages: {
      error: 'Found insecure URL',
    },
    type: 'problem',
    schema: [
      {
        type: 'object',
        properties: {
          blocklist: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          exceptions: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [],
});

export default rule;
