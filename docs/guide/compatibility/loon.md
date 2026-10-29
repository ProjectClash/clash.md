---
title: Is Clash compatible with Loon?
description: How to move Loon remote profiles, nodes, plugins, rewrites, and script needs to Clash for iOS.
head:
  - - link
    - rel: canonical
      href: https://clash.md/guide/compatibility/loon
  - - link
    - rel: alternate
      hreflang: zh-CN
      href: https://clash.md/zh/guide/compatibility/loon
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Can I use a Loon remote profile in Clash?","acceptedAnswer":{"@type":"Answer","text":"Yes when the provider returns mihomo YAML from an HTTPS profile URL. Parameters from Loon node text, standalone links or Base64 lists can also be organized as YAML or entered manually."}},{"@type":"Question","name":"Can Loon nodes be used in Clash?","acceptedAnswer":{"@type":"Answer","text":"Shared protocols including Shadowsocks, ShadowsocksR, VMess, VLESS, Trojan, HTTP, SOCKS, WireGuard, Hysteria2 and AnyTLS can be reused with matching parameters."}},{"@type":"Question","name":"How do I move Loon plugins, rewrites and scripts?","acceptedAnswer":{"@type":"Answer","text":"Loon plugins can be imported into Clash Modules by pasting their links, including rules, rewrites, and scripts."}}]}'
---

# Is Clash compatible with Loon?

**Shared node protocols continue to work, and plugins import directly.**

Loon has its own syntax for nodes, rules, policies, rewrites, scripts and plugins. When moving to Clash, continue using provider remote profiles and nodes through compatible formats, and import plugins directly into Clash Modules.

## Which Loon nodes can be reused?

According to the [official Loon node documentation](https://nsloon.app/docs/Node/), protocols shared by both apps include:

- Shadowsocks and ShadowsocksR;
- VMess and VLESS;
- Trojan;
- HTTP / HTTPS and SOCKS5;
- WireGuard;
- Hysteria2;
- AnyTLS.

Match the transport, TLS, Reality, obfuscation, encryption, authentication and UDP options to get the complete protocol experience.

## How do I migrate a Loon remote profile?

1. Try adding the same profile URL to Clash.
2. If the provider selects output by client, switch the Download Identity to FlClash or Clash Verge to get Clash / mihomo output.
3. When the provider offers Loon-specific text, select its mihomo YAML output.
4. Organize standalone link parameters as mihomo YAML, or add them in the node editor.

## What to recreate in Clash

- organize nodes, rules and policy groups as mihomo YAML;
- express Custom by JS connection needs with protocols available in Clash;
- set app preferences, certificates and local data to match your workflow.

## How do I import Loon plugins?

Loon defines a plugin as a collection of rules, rewrites and scripts, and Clash
[Modules](/guide/modules) share that structure: paste a plugin link (`.plugin`
or `.lpx`) under **Modules** in the profile library.

- `[Argument]` becomes **Settings** in module details, where you can change it;
- rules, rewrites, scripts, and MITM hostnames take effect, in both the classic
  and conditional syntax;
- `[General]` accepts only some keys, such as addresses that skip the proxy and
  DNS servers;
- DNS scripts and certificate replacements are skipped, and **Skipped** in
  module details explains why.

## Can I keep using the same server?

The same node can work when both apps support its protocol and every required parameter has an equivalent.

Return to the [compatibility overview](/guide/compatibility), or see [all supported protocols](/guide/protocols).
