# Detect disabling of certificate validation for TLS connections (no-disable-ssl)

## Problem: Disabling SSL leads to insecure communication.

If value equals '0', certificate validation is disabled for TLS connections. This makes TLS, and HTTPS by extension, insecure. The use of this environment variable is strongly discouraged.

## Solution: Do not use NODE_TLS_REJECT_UNAUTHORIZED

Avoid setting NODE_TLS_REJECT_UNAUTHORIZED to '0'.

## More material

https://nodejs.org/api/cli.html#node_tls_reject_unauthorizedvalue
