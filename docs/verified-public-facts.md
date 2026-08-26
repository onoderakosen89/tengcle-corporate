# Verified public facts and route treatment

This change deliberately preserves the established React UI. It changes only
copy, typed route data, redirects, and machine-readable metadata that could
otherwise imply an unsupported legal hierarchy or chronology.

## Publication-safe entity facts

| Region | Public minimum | Evidence reviewed | Route treatment |
| --- | --- | --- | --- |
| Japan | `株式会社Tengcle`; incorporated `2021-10-25`; registered office `2-19-20 Takanawa, Minato-ku, Tokyo 108-0074` | Reviewed Japanese registry evidence. The underlying registry locator remains in the internal evidence store; obtain a current certificate before publishing freshness-sensitive fields. | Organization JSON-LD is limited to legal name, founding date, and this registered office. Capital and the Tsukiji location are excluded from machine-readable data. |
| Hong Kong | `Tengcle Limited`; incorporated `2025-04-29`; Business Registration Number `78077104` | [Hong Kong Companies Registry new-incorporation list, 28 April–4 May 2025, p. 327](https://www.cr.gov.hk/docs/wrpt/RNC063_2025.04.28-2025.05.04.pdf#page=327) | The founding article and metadata use the exact date and number. Address and contact channels are excluded from Organization JSON-LD. |
| United States | `Tengcle Development LLC`; formed in New Jersey `2026-01-05`; Entity ID `0451392806` | Reviewed formation packet and operating agreement retained in the internal legal-record store. No private document is copied into this public repository. | The founding article and metadata use the exact date and ID. Address and contact channels are excluded from Organization JSON-LD. |

`Tengcle` is used as the brand name, not as a fourth legal entity. The three
regional companies are described as related companies and as separate legal
entities in their respective jurisdictions. The former `Global Headquarters`,
`Founding Company`, and `US Office` hierarchy labels are not publication-safe.

## Contradicted US chronology

The following routes asserted activity before the US entity was formed. They
are removed from the typed route manifest, generated HTML, sitemap, and
JSON-LD. Cloudflare Pages receives a single permanent redirect from each old
URL to the same-language US About page:

- `/us/{en,ja,zh}/news/property-management-launch-2025/`
- `/us/{en,ja,zh}/news/group-global-network-2024/`

The six rules are in `client/public/_redirects`. No redirect target points to
another redirect.

## Structured-data boundary

Every indexed route keeps one typed `WebPage` node. Regional home and About
routes may also expose the narrow `Organization` facts above. Only the three
verified incorporation articles expose `NewsArticle`:

- `/hk/{language}/news/hk-founding/`
- `/jp/{language}/news/company-incorporation-2021/`
- `/us/{language}/news/us-founding-2026/`

Unverified `Service`, `FAQPage`, `LocalBusiness`, and other news-article graphs
are omitted. Visible legacy service, recruiting, privacy, and contact content
is outside this focused change and remains subject to its own evidence review.
