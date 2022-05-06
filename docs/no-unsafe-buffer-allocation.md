# Detect use of Buffer.allocUnsafe() (no-unsafe-buffer-allocation)

## Problem: Buffer overflow attack
Using Buffer.allocUnsafe() can result in data leakage. Using a Buffer created by Buffer.allocUnsafe() without completely overwriting the memory can allow this old data to be leaked when the Buffer memory is read.

## Solution: Use Buffer.alloc()

## More material
Nodejs documentation: https://nodejs.org/api/buffer.html#bufferfrom-bufferalloc-and-bufferallocunsafe