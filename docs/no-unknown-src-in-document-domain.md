# Detect unknown source provided to document.domain (no-unknown-src-in-document-domain)

## Problem: Deprecated as it undermines same origin policy

The document.domain setter is deprecated. It undermines the security protections provided by the same origin policy, and complicates the origin model in browsers, leading to interoperability problems and security bugs.
Attempting to set document.domain is dangerous. It opens up full access to a page's DOM from all subdomains, which is likely not what is intended.

## Solution: Do not use document.domain

## More material

- Document.domain documentation: https://developer.mozilla.org/en-US/docs/Web/API/Document/domain
- Same origin policy documentation: https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
