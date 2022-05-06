# Detect use of HTTP cookies (no-cookies)

## Problem: Old storage mechanism with inherent vulnerabilities
HTTP cookies are prone to vulnerabilities both in terms of sending and accessing data.
Without thorough configuration cookie data is vulnerable to man-in-the-middle and cross-site scripting attacks.

## Solution:
Use modern solutions for client data storage such as Web Storage or IndexedDB.

## More material
Mozilla documentation: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies