# Detect instantiation of Buffers with new Buffer() (no-buffer-instantiation)

## Problem: Buffer overflow attack
In versions of Node.js prior to 6.0.0, Buffer instances were created using the Buffer constructor function, which allocates the returned Buffer differently based on what arguments are provided.
Because the behavior of new Buffer() is different depending on the type of the first argument, security and reliability issues can be inadvertently introduced into applications when argument validation or Buffer initialization is not performed. 
Therefore, it was decided to change the Buffer API in the major version of 6.0.0, to instantiate buffers via Buffer.from(), Buffer.alloc(), and Buffer.allocUnsafe(). 

## Solution:
Use Buffer.from() or Buffer.alloc().

## More material
Nodejs documentation: https://nodejs.org/api/buffer.html#bufferfrom-bufferalloc-and-bufferallocunsafe