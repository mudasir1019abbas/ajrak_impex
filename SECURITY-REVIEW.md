# Security Review Summary

| # | Severity | File | Lines | Vulnerability | Confidence |
|---|----------|------|-------|---------------|------------|
| 1 | 🟡 MEDIUM | [lib/rateLimit.js](lib/rateLimit.js) | 13-15 | Registration/login throttling trusts `X-Forwarded-For` and uses non-shared in-memory counters. | 9/10 |
| 2 | ⚪ LOW | [package-lock.json](package-lock.json) | Dependency tree | Development tooling has 7 moderate transitive findings, currently involving `typescript-eslint` and `minimatch`; no production npm vulnerabilities were found. | 8/10 |
| 3 | ⚪ LOW | Authentication/API surfaces | - | No verified critical/high SQL injection, RCE, unsafe deserialization, SSRF, or XSS finding was identified. | 7/10 |
| 4 | ⚪ LOW | Registration/login/session surfaces | - | Deployment configuration could not verify secret strength or handling of proxy forwarding headers. | 6/10 |
| 5 | ⚪ LOW | Database/API configuration | - | Database credential exposure, authorization configuration, and hosting-level controls could not be verified from source alone. | 6/10 |

## Priority Summary

1. **MEDIUM: Authentication rate limiting**
   - **Risk:** Client-supplied forwarding headers can defeat IP-based throttling, and in-memory counters are not shared across application instances.
   - **Affected routes:** Registration and login endpoints.
   - **Action:** Obtain the real client address only from trusted reverse-proxy configuration, or use a shared store such as Redis/Upstash. Key limits by the normalized address and account identifier, and reject or ignore forwarding headers when the application is directly reachable.
   - **Additional action:** Add account-level limits and temporary lockouts for repeated failed logins.

2. **LOW: Development dependency findings**
   - **Risk:** The `typescript-eslint` and `minimatch` development dependency tree has 7 moderate findings. The underlying `minimatch` issue is a denial-of-service advisory in build/lint tooling, not a verified application runtime exploit.
   - **Action:** Run `npm update typescript-eslint` and `npm audit fix`, then review and test the dependency changes.

3. **LOW: Production dependency audit**
   - **Risk:** No production npm vulnerabilities were found by `npm audit --omit=dev`.
   - **Action:** Re-run a production dependency audit before releases and after dependency updates.

4. **LOW: Deployment secrets and proxy configuration**
   - **Risk:** Source review could not verify deployment configuration for `JWT_SECRET`, database credentials, admin-ID allowlists, or trusted proxy behavior.
   - **Action:** Confirm that secrets are strong and managed outside source control, database credentials are least-privileged, `ADMIN_USER_IDS` is correctly restricted, and forwarding headers are overwritten or trusted only through a verified proxy.

5. **LOW: Hosting and database security controls**
   - **Risk:** Database credential exposure, authorization configuration, and hosting-level controls could not be verified from source alone.
   - **Action:** Review hosting firewall rules, database network access, TLS settings, backups, environment-variable permissions, and API access controls.

## Verification Notes

- SQL operations reviewed use parameterized queries.
- No clear SQL injection, SSRF, unsafe deserialization, remote-code-execution, or reflected/stored XSS sink was verified.
- JWT and admin authorization use server-side secrets and ID allowlists, but deployment configuration remains to be verified.
- No critical or high-severity application vulnerability was verified in this review.
