---
title: Is Clash compatible with Stash?
description: How to move Stash Clash YAML, remote profiles, nodes, overrides, scripts, and rules to Clash for iOS.
head:
  - - link
    - rel: canonical
      href: https://clash.md/guide/compatibility/stash
  - - link
    - rel: alternate
      hreflang: zh-CN
      href: https://clash.md/zh/guide/compatibility/stash
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Can a Stash configuration be used in Clash?","acceptedAnswer":{"@type":"Answer","text":"Standard Clash or mihomo YAML can be imported directly. Stash override files can be imported directly as modules, including MITM, rewrites, and scripts."}},{"@type":"Question","name":"Can I use a Stash remote profile in Clash?","acceptedAnswer":{"@type":"Answer","text":"Yes when the profile URL returns standard Clash or mihomo YAML. Add the same URL to Clash and switch the Download Identity when necessary."}}]}'
---

# Is Clash compatible with Stash?

**Standard Clash / mihomo YAML and remote profiles can be used directly.**

The Stash documentation says it imports [Stash / Clash formatted configurations](https://stash.wiki/en/get-started), and that [its configuration files use YAML](https://stash.wiki/en/configuration/example-config). A standard Clash or mihomo YAML configuration used in Stash can therefore be imported directly into Clash.

## What moves directly?

- standard Clash / mihomo YAML configurations;
- remote profiles returning Clash / mihomo YAML;
- nodes, proxy providers and rule providers;
- policy groups, health checks and routing rules;
- DNS and other fields supported by both apps.

## Fastest migration path

1. Copy the profile URL used by the active Stash configuration.
2. Add it as a remote configuration in Clash.
3. A local YAML file can also be opened or shared into Clash.
4. Update the profile and check its nodes, groups and rules.
5. When the provider offers multiple formats, switch the Download Identity to FlClash or Clash Verge to get Clash / mihomo output.

## Recreate Stash features in Clash

- import override files directly as modules, as described below;
- set on-demand behavior, sync, remote control and app preferences to match your workflow.

## How do I import Stash overrides?

Override files (`.stoverride`) import directly into Clash
[Modules](/guide/modules): paste the override link under **Modules** in the
profile library. Rules and rule providers, MITM, rewrites, and scripts under
`http`, scheduled scripts, DNS, and hosts take effect, and tiles become panels
in module details. Nodes an override adds under `proxies` are skipped, so put
them in the configuration itself; settings such as `dns.enhanced-mode` that
conflict with Clash's own settings follow Clash.

If Stash builds its configuration from several override files, add each one as
its own module.

## Can I keep using the same server?

The same server can be used directly when both apps use the same standard node configuration.

Return to the [compatibility overview](/guide/compatibility).
