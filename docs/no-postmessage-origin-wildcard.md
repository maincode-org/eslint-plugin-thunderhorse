# Detect usage of the wildcard character on window.postMessage()'s target origin argument (no-postmessage-origin-wildcard)

## Problem: Setting targetOrigin to "\*" can disclose data.

Failing to provide a specific target discloses the data you send to any interested malicious site.

## Solution: Do not use the wildcard.

Always provide a specific targetOrigin, not "\*".

## More material

Mozilla documentation: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
