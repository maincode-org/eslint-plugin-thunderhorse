# Detect running potentially insecure scripts with node vm (no-unknown-src-in-node-vm-runInThisContext)

## Problem: Running unknown scripts with node vm can result in remote code execution

"runInThisContext" has access to global scope, which means an adversary could potentially run any code with access to a lot of information on the system.

## Solution: Do not run untrusted code.

When using runInThisContext specify script via a hard-coded string.

## More material

Nodejs documentation: https://nodejs.org/api/vm.html#vm-executing-javascript
