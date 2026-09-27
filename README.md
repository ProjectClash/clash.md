# Clash

The public documentation and legal-policy site for Clash, built with
[VitePress](https://vitepress.dev/).

Current site: <https://clash.md/>

## Local development

Requires Node.js 20 or newer.

```sh
npm install
npm run docs:dev
```

Build and preview the production site:

```sh
npm run docs:build
npm run docs:preview
```

## Deployment

VitePress source lives on `main`. The production site at `https://clash.md` is
hosted by the Cloudflare Pages project `clash-md`. Publish a production build:

```sh
npm run docs:build
npx wrangler pages deploy docs/.vitepress/dist --project-name clash-md --branch main
```

The GitHub Pages workflow remains available, but a push to GitHub does not
update the Cloudflare deployment. Legacy `/hako` and `/zh/hako` links redirect
to `/core` and `/zh/core` through `docs/public/_redirects`.

## Content

- `docs/guide/` — product documentation
- `docs/privacy.md` — canonical Privacy Policy
- `docs/terms.md` — canonical supplementary Terms of Use

## Product screenshots

Run `node scripts/refresh-store-screenshots.mjs` on macOS to rebuild the
September 16, 2026 iPhone, iPad, and Mac screenshots, device frames, and homepage
compositions. This requires Swift/AppKit and `cwebp`. Set
`HAKO_RELEASE_CANDIDATES` to the directory containing `store-shots-ios-20260916`,
`store-shots-ipad-20260916`, and `store-shots-macos-20260916`; the default is
`/Users/ejan/SGP/Hako/ReleaseCandidates`. Set `HAKO_STORE_ASSETS` to the Apple
bezel and original tvOS screenshot archive when it differs from
`/Users/ejan/SGP/Hako-App-Store-Assets`.

English pages use `en-US` screenshots and Chinese pages use `zh-Hans`.
The iPhone, iPad, and Mac galleries show Home, Profiles, Proxies, Rules, and Utilities.
The tvOS gallery omits the legacy About capture, which contains retired branding.
WebP outputs are generated at display-appropriate sizes; the original captures
remain in the release archive.

## Source repositories

- [Clash client](https://github.com/ProjectClash/Clash-Client)
- [Clash Core](https://github.com/ProjectClash/Clash)

## License

The website source code is available under the [MIT License](LICENSE).
`docs/privacy.md` and `docs/terms.md` are legal notices and are not licensed as
software under the MIT License.

## Configuration reference maintenance

`npm run docs:config-sync` rebuilds the field index from the reviewed inputs in
`docs/.vitepress/data/config-field-audit.json` and `tun-reference.json`. Update
those inputs after checking a fixed core revision; do not infer behavior from
a separate SDK lock or from field names alone. Source audit revision, SDK lock
revision, and shipped-build verification are recorded separately. Container
entries do not enumerate every nested protocol parameter.

The navigation follows the 13 main sections of the mihomo reference. Protocol
recipes live in `docs/guide/config/outbound/` and `docs/zh/guide/config/outbound/`;
keep the two languages and their sidebar entries in sync. Examples must include
required fields, distinguish complete profiles from node-level fragments, and
use illustrative credentials only. Check examples against the pinned parser and
its constructors, not just upstream documentation or option-struct names.
The September 2026 expansion compares Meta-Docs revision
`e52690240f2e4a70de75002c6cf87e2e7921d29c` with the source audit revision above.
YAML or constructor validation does not establish server or device connectivity.

The September 24 protocol update checks the outbound type list and EasyTier
against public Hako SDK `v1.19.31-hako.1`, revision
`7ea70d15bf8b67257928efe45c12f16d4ffc9f61`. It is separate from the 185-entry
field audit above. Keep the EasyTier platform restriction, DNS notes, protocol
count, sidebar links, and both language versions in sync; the mobile SDK accepts
EasyTier only as a REJECT placeholder.

Public documentation calls this historical build “snapshot 7ea70d1” under the
Clash Core brand. The original tag above is retained as an audit record, not
renamed or presented as a release in the new repository. Preserve the pinned
audit revisions when changing product names. The new source repositories are
`ProjectClash/Clash-Client` and `ProjectClash/Clash`.
