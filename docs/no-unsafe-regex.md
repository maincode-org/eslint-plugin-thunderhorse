# Detect if regex is an unknown source or exponential in runtime (no-unsafe-regex)

## Problem: Unsafe regex can result in regular-expression-denial-of-service attack (ReDoS)
If the regex is defined by user input, an adversary could write a regex that takes a long time to run which might result in a denial of service.

## Solution: Avoid defining your regex using a non-literal value
Additionally, try to understand the runtime of your regex to ensure it is not too heavy on performance.

## More material
- safe-regex npm documentation: https://www.npmjs.com/package/safe-regex
- ReDoS wikipedia: https://en.wikipedia.org/wiki/ReDoS