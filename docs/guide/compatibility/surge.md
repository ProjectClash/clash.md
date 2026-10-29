---
title: Is Clash compatible with Surge?
description: How to move Surge profiles, Snell, Shadowsocks, Trojan, WireGuard nodes and routing policies to Clash for iOS.
head:
  - - link
    - rel: canonical
      href: https://clash.md/guide/compatibility/surge
  - - link
    - rel: alternate
      hreflang: zh-CN
      href: https://clash.md/zh/guide/compatibility/surge
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I move a Surge profile to Clash?","acceptedAnswer":{"@type":"Answer","text":"Organize nodes and routing policies as mihomo YAML, or add a provider profile URL that returns Clash / mihomo YAML. Surge modules can be imported directly into Clash Modules."}},{"@type":"Question","name":"Does Clash support Surge Snell nodes?","acceptedAnswer":{"@type":"Answer","text":"Yes. Add a Snell node through mihomo YAML, a compatible profile URL, or the node editor."}}]}'
---

# Is Clash compatible with Surge?

**Shared node protocols continue to work, while routing policies can be organized as mihomo YAML.**

[Surge uses its own profile format](https://manual.nssurge.com/overview/quick-start.html), with sections such as `[General]`, `[Proxy]`, `[Proxy Group]` and `[Rule]`. For migration, organize nodes and policy groups as mihomo YAML; Surge modules can be imported directly into Clash Modules.

## Which Surge nodes can be reused?

Clash supports Snell and multiple protocols shared by both products, including:

- HTTP and SOCKS;
- Shadowsocks;
- VMess and Trojan;
- WireGuard;
- Snell.

Snell is normally added through mihomo YAML, a compatible profile URL that
returns mihomo YAML, or the node editor. Other nodes can be recreated from their
server and protocol parameters.

## How to migrate

1. Prefer a provider profile URL that returns mihomo / Clash YAML.
2. If only a Surge profile is available, recreate the required nodes from their parameters.
3. Rewrite Surge policy groups and rules as mihomo YAML.
4. Paste Surge module links into **Add Module** in Clash to import them directly.

## How do Surge modules work in Clash?

Surge modules (`.sgmodule`) import directly into Clash [Modules](/guide/modules):
paste the module link under **Modules** in the profile library. Rules, URL /
header / body rewrites, local mappings, `[MITM]` hostnames, scripts, `[Host]`,
and panels take effect; `[Proxy]` and `[Proxy Group]` are skipped. DNS scripts, rule scripts, and certificate replacements are skipped, and **Skipped** in module details explains why. Parts that need HTTPS decryption take effect once the certificate is installed and trusted.

## What to configure during migration

- organize Surge nodes and policies as mihomo YAML;
- express the original routing logic with Clash rules;
- set app preferences to match your workflow.

The same server can be used directly once its protocol and parameters match.

Return to the [compatibility overview](/guide/compatibility).
