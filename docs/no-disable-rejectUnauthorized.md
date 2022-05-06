# Detect disabling of rejectUnauthorized option in TLS Socket (no-disable-rejectUnauthorized)

## Problem:
Communication to unauthorized clients leads to insecure communication.
When rejectUnauthorized is set to true, the TLS server will not reject unauthorized connections.

## Solution:
Avoid setting rejectUnauthorized to true.

## More material
Nodejs documentation: https://nodejs.org/api/tls.html#tlscreateserveroptions-secureconnectionlistener