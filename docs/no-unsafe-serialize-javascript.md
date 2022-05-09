# Detect use of 'unsafe' option in serialize-javascript (no-unsafe-serialize-javascript)

## Problem: Setting unsafe to true can result in Cross-site-scripting attacks (XSS)

Serialize-javascript is a famous npm package that serializes javascript to a superset of JSON that includes regular expressions, dates and functions.
Setting option 'unsafe' to true introduces vulnerabilities such as XSS attacks.

## Solution: Avoid setting unsafe to true

## More material

Medium article on HTML Injection: https://medium.com/@jamischarles/xss-aka-html-injection-attack-explained-538f46475f6c
