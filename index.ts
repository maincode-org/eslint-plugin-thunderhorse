import { rule as no_buffer_instantiation } from './src/rules/no-buffer-instantiation';
import { rule as no_cookies } from './src/rules/no-cookies';
import { rule as no_disable_csrf_before_methods } from './src/rules/no-disable-csrf-before-method';
import { rule as no_disable_markup_escape } from './src/rules/no-disable-markup-escape';
import { rule as no_disable_rejectUnauthorized } from './src/rules/no-disable-rejectUnauthorized';
import { rule as no_disable_ssl } from './src/rules/no-disable-ssl';
import { rule as no_insecure_url } from './src/rules/no-insecure-url';
import { rule as no_postmessage_origin_wildcard } from './src/rules/no-postmessage-origin-wildcard';
import { rule as no_unknown_object_injection } from './src/rules/no-unknown-object-injection';
import { rule as no_unknown_src_in_document_domain } from './src/rules/no-unknown-src-in-document-domain';
import { rule as no_unknown_src_in_fs } from './src/rules/no-unknown-src-in-fs';
import { rule as no_unknown_src_in_log } from './src/rules/no-unknown-src-in-log';
import { rule as no_unknown_src_in_node_vm } from './src/rules/no-unknown-src-in-node-vm-runInThisContext';
import { rule as no_unknown_src_in_require } from './src/rules/no-unknown-src-in-require';
import { rule as no_unsafe_buffer_allocation } from './src/rules/no-unsafe-buffer-allocation';
import { rule as no_unsafe_child_process } from './src/rules/no-unsafe-child-process';
import { rule as no_unsafe_random } from './src/rules/no-unsafe-random';
import { rule as no_unsafe_regex } from './src/rules/no-unsafe-regex';
import { rule as no_unsafe_serialize_javascript } from './src/rules/no-unsafe-serialize-javascript';

export const rules = {
  'no-buffer-instantiation': no_buffer_instantiation,
  'no-cookies': no_cookies,
  'no-disable-csrf-before-method': no_disable_csrf_before_methods,
  'no-disable-markup-escape': no_disable_markup_escape,
  'no-disable-rejectUnauthorized': no_disable_rejectUnauthorized,
  'no-disable-ssl': no_disable_ssl,
  'no-insecure-url': no_insecure_url,
  'no-postmessage-origin-wildcard': no_postmessage_origin_wildcard,
  'no-unknown-object-injection': no_unknown_object_injection,
  'no-unknown-src-in-document-domain': no_unknown_src_in_document_domain,
  'no-unknown-src-in-fs': no_unknown_src_in_fs,
  'no-unknown-src-in-log': no_unknown_src_in_log,
  'no-unknown-src-in-node-vm-runInThisContext': no_unknown_src_in_node_vm,
  'no-unknown-src-in-require': no_unknown_src_in_require,
  'no-unsafe-buffer-allocation': no_unsafe_buffer_allocation,
  'no-unsafe-child-process': no_unsafe_child_process,
  'no-unsafe-random': no_unsafe_random,
  'no-unsafe-regex': no_unsafe_regex,
  'no-unsafe-serialize-javascript': no_unsafe_serialize_javascript,
};

export const configs = {
  recommended: {
    plugins: ['itu-security'],
    rules: {
      'itu-security/no-buffer-instantiation': 'error',
      'itu-security/no-cookies': 'error',
      'itu-security/no-disable-csrf-before-method': 'error',
      'itu-security/no-disable-markup-escape': 'error',
      'itu-security/no-disable-rejectUnauthorized': 'error',
      'itu-security/no-disable-ssl': 'error',
      'itu-security/no-insecure-url': 'error',
      'itu-security/no-postmessage-origin-wildcard': 'error',
      'itu-security/no-unknown-object-injection': 'error',
      'itu-security/no-unknown-src-in-document-domain': 'error',
      'itu-security/no-unknown-src-in-fs': 'error',
      'itu-security/no-unknown-src-in-log': 'error',
      'itu-security/no-unknown-src-in-node-vm-runInThisContext': 'error',
      'itu-security/no-unknown-src-in-require': 'error',
      'itu-security/no-unsafe-buffer-allocation': 'error',
      'itu-security/no-unsafe-child-process': 'error',
      'itu-security/no-unsafe-random': 'error',
      'itu-security/no-unsafe-regex': 'error',
      'itu-security/no-unsafe-serialize-javascript': 'error',
    },
  },
};
