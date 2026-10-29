---
title: Is Clash compatible with Quantumult X?
description: How to move Quantumult X remote profiles, nodes, policies, rewrites, and filtering needs to Clash for iOS.
head:
  - - link
    - rel: canonical
      href: https://clash.md/guide/compatibility/quantumult-x
  - - link
    - rel: alternate
      hreflang: zh-CN
      href: https://clash.md/zh/guide/compatibility/quantumult-x
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I move a Quantumult X configuration to Clash?","acceptedAnswer":{"@type":"Answer","text":"Start with a provider profile URL that returns Clash / mihomo YAML, or organize node parameters as mihomo YAML or add them in the node editor. Rewrite, filter, and task snippets can be imported directly as modules."}},{"@type":"Question","name":"Can I use a Quantumult X remote profile in Clash?","acceptedAnswer":{"@type":"Answer","text":"Yes when the provider returns mihomo YAML from an HTTPS profile URL. Standalone node parameters can also be organized as YAML or entered manually."}}]}'
---

# Is Clash compatible with Quantumult X?

**Common nodes continue to work, while routing policies can be recreated with Clash rules.**

Quantumult X uses its own [configuration and resource syntax](https://github.com/crossutility/Quantumult-X/blob/master/sample.conf). When moving to Clash, keep using nodes through remote profiles, mihomo YAML or the node editor. Local rewrite, filter, and task snippets import directly as modules; recreate policies with Clash rules.

## What can be reused?

- profile URLs that can return mihomo YAML;
- the node parameters contained in `ss://`, `ssr://`, `vmess://`, and similar
  share links, after conversion to mihomo YAML or manual entry;
- servers that can be recreated from their parameters in the Clash node editor.

## How to migrate

1. Select a profile URL that returns Clash / mihomo YAML from the provider.
2. Add that URL to Clash; switch the Download Identity when necessary.
3. Organize parameters from standalone share links or Base64 lists as mihomo YAML, or add them in the node editor.
4. Express the original routing intent using Clash rules.

## How do I import rewrites and tasks?

Resources ending in `.conf` or `.snippet`, or content with `[rewrite_local]`,
`[mitm]`, `[filter_local]`, or `[task_local]` sections, can be pasted directly
into Clash [Modules](/guide/modules):

- redirects, request and response body changes, header changes, and scripts in
  `[rewrite_local]` take effect;
- `[mitm]` hostnames merge into the HTTPS decryption scope;
- `[filter_local]` rules are converted and take effect;
- `[task_local]` entries become scheduled scripts.

Remote resources named by `rewrite_remote` or `filter_remote` are not fetched;
add each resource link as its own module instead. DNS scripts and certificate
replacements are skipped, and **Skipped** in module details explains why.

## What to configure during migration

- organize nodes and policies as mihomo YAML;
- import rewrite, filter, and task snippets as modules, as described below;
- express product-specific resource syntax with Clash rules;
- set app preferences to match your workflow.

The same server can be used directly once its protocol and parameters match.

Return to the [compatibility overview](/guide/compatibility).
