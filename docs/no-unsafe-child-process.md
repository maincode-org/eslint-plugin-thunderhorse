# Detect possible unknown source as command in child processes (no-unsafe-child-process)

## Problem: Unknown source in command can result in remote command injection.

Although the child processes, for example the exec method, executes OS commands in a nonblocking manner, perfectly aligning with Node's async programming paradigm, its flexibility to pass the command as a string often invites injection flaws.
This is particularly the case when a user input is used to construct the command.

## Solution: Specify hard-coded strings as the command.

Additional solutions include input validation and a white list approach.

## More material:

Nodejs documentation: https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback
