# zod-formik-adapter

## Supply Chain Security PoC

**This repository demonstrates a supply chain attack vector via GitHub username recycling.**

### Vulnerability Chain

1. Original maintainer `robert-lichtnow` deleted their GitHub account
2. Username became available for re-registration  
3. This npm account still has **publish access to 37 packages** including:
   - `@naturacosmeticos/natds-icons` (loaded by natura.com.br via jsdelivr CDN)
   - `zod-formik-adapter` (~118k weekly downloads)
4. npm password recovery sends email to personal Gmail (`matheusrobert8@gmail.com`)
5. natura.com.br loads `@naturacosmeticos/natds-icons@latest` **without SRI**

### Impact

- **~120,000 developers/week** use zod-formik-adapter
- **natura.com.br visitors** load natds-icons without integrity checks
- Attacker with npm publish access could inject arbitrary JavaScript
- Checkout data, session tokens, credentials at risk

### Affected

- `natura.com.br` (Natura Cosmeticos S.A.)
- All consumers of `@naturacosmeticos/*` npm packages  
- All consumers of `zod-formik-adapter`

### Disclosure

This is a **responsible disclosure PoC**. No malicious code was published to npm.
The GitHub username was registered to demonstrate the attack vector and prevent actual exploitation.

### Files

- `index.js` — PoC showing what an attacker could inject (console.log only, non-destructive)
- `package.json` — Mirrors the real package structure
