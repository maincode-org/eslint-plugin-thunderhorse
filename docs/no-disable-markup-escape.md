# Detect disabling of escapeMarkup on objects (no-disable-markup-escape)

## Problem: Disabling of escapeMarkup can lead to cross-site scripting vulnerabilities.
Detects object.escapeMarkup = false, which can be used with some template engines to disable escaping of HTML entities. This can lead to Cross-Site Scripting (XSS) vulnerabilities.

## Solution: Do not use object.escapeMarkup
Avoid setting object.escapeMarkup to false.

## More material