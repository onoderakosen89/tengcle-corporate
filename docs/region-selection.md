# Regional selection

On the first Global visit in a browser session, the client requests the same-origin
`/api/region` Pages Function. It reads only Cloudflare's existing `request.cf.country`
metadata and returns a regional home path: HK/SG to `/hk/en`, JP to `/jp/ja`, US/CA
to `/us/en`, and unknown/other countries to Global. It does not call an external
location service, return IP/country/coordinates, set cookies, store location, or
request browser location permission. The response is private, non-cacheable and
noindex. The static HTML, sitemap and existing CSP remain unchanged.

Manual page/region/language selection takes priority: leaving Global cancels the
pending lookup, and late responses cannot replace a chosen page. A regional visit
or `?view=global` suppresses automatic selection for that session. On timeout,
HTTP/network/JSON failure, or an unknown route, the Global language links remain
usable. The client accepts only the three regional home paths and uses an
in-memory guard if session storage is blocked.

The local Express E2E harness calls the same handler without Cloudflare metadata,
so its default is Global. Unit tests exercise country metadata; browser tests
mock the same-origin result and cover automatic selection, failure modes, and
manual selection during a delayed response. Preview and production checks must
also verify the real `/api/region` response and CSP, with no external location
requests. Production uses the existing `tengcle-corporate` Pages Git deployment;
the endpoint extends the already deployed Pages Functions beside 404 middleware.
