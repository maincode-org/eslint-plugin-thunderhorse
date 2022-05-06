# Detect unsafe argument type provided to access object properties (no-unknown-object-injection)

## Problem: Accessing object properties via user input can lead to disclosure of data and Remote Code Execution.
Bracket object notation with user input grants access to every property available on the object, including prototypes, which can lead to Remote Code Execution.

## Solution: Avoid using bracket notation or only use hard-coded strings.
Not relying on bracket notation is desirable, but if bracket notation is used, make sure to only use hard-coded strings.

## More material