# Detect use of Math.random (no-unsafe-random)

## Problem: Cryptographically insecure

Math.random() is cryptographically insecure.
It can produce predictable values and is therefore not safe to use in a security-sensitive context.

## Solution: Make sure to not rely on Math.random for randomness in cryptographic implementations.

Use crypto.getRandomValues for cryptographic implementations.

## More material

- Mozilla crypto.getRandomValues documentation: https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
- Mozilla Math.Random documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
