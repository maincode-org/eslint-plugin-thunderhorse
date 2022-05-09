# Detect express misconfiguration that allows for cross-site request forgery via methodOverride (no-disable-csrf-before-method)

## Problem: Misconfiguration allows for CSRF attacks

"methodOverride" middleware allows an HTTP request to override the method of the request with the value of the "\_method" post key or with the header "x-http-method-override".
If the methodOverride middleware is declared after the csrf middleware, it is possible to bypass the security control of the csrf middleware by sending a GET request with a POST MethodOverride header or key.

## Solution: Declare csrf after methodOverride

Disable methodOverride or make sure middleware such as csrf takes precedence over it, by declaring it after methodOverride.

## More material

Express documentation: http://expressjs.com/en/resources/middleware/method-override.html
