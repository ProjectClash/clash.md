---
title: Is Clash compatible with Shadowrocket?
description: How to move Shadowrocket remote profiles, QR codes, node parameters, rules, and module needs to Clash for iOS.
head:
  - - link
    - rel: canonical
      href: https://clash.md/guide/compatibility/shadowrocket
  - - link
    - rel: alternate
      hreflang: zh-CN
      href: https://clash.md/zh/guide/compatibility/shadowrocket
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Can I use a Shadowrocket remote profile in Clash?","acceptedAnswer":{"@type":"Answer","text":"Yes when the provider returns mihomo YAML from an HTTPS profile URL. Switch the Download Identity when necessary."}},{"@type":"Question","name":"How do I use ss:// and other Shadowrocket node parameters in Clash?","acceptedAnswer":{"@type":"Answer","text":"Organize standalone link or Base64 list parameters as mihomo YAML, or enter them in the node editor. A QR code can add an HTTPS profile URL."}},{"@type":"Question","name":"How do I move Shadowrocket rules and modules?","acceptedAnswer":{"@type":"Answer","text":"Modules can be imported into Clash Modules by pasting their links; recreate rules with mihomo configuration and Clash rules."}}]}'
---

# Is Clash compatible with Shadowrocket?

**Remote profiles, common nodes, and modules all continue to work.**

If you already use a provider profile URL in Shadowrocket and the provider
returns mihomo YAML from an HTTPS URL, you can usually add the same profile
URL to Clash. The same server can be used when its protocol and parameters match.

## How do I import a Shadowrocket remote profile?

1. Copy the active profile URL from Shadowrocket.
2. Add it as a remote configuration in Clash.
3. Update the profile and check its nodes and policy groups.
4. When the provider offers multiple formats, switch the Download Identity to FlClash or Clash Verge to get Clash / mihomo output.
5. Test latency, choose a node and connect.

## How to use share links and QR codes

QR codes offer a quick way to add an HTTPS profile URL that returns mihomo
YAML. For `ss://`, `ssr://`, `vmess://`, `vless://`, `trojan://`,
`hysteria2://`, `tuic://`, `anytls://` and Base64 node lists, organize the
server, port, credentials, TLS and transport parameters as mihomo YAML, or add
them in the node editor.

## How do I import Shadowrocket modules?

Shadowrocket modules (`.module` or `.sgmodule`) import directly into Clash
[Modules](/guide/modules): paste the module link under **Modules** in the
profile library. Rules, URL / header / body rewrites, local mappings, `[MITM]`
hostnames, scripts, and panels take effect; lines that add nodes or policy
groups are skipped. DNS scripts, rule scripts, and certificate replacements are skipped, and **Skipped** in module details explains why. Parts that need HTTPS decryption take effect once the certificate is installed and trusted.

## What to recreate in Clash

- express the original routing logic with Clash rules;
- set node groups and scenarios to match your workflow;
- use Clash profile management and backup options for your setup.

This keeps your existing nodes useful while giving the configuration a clear structure that matches Clash.

## Use standalone node parameters

Inspect or export the node parameters in Shadowrocket, then recreate the node in
Clash from its server, port, authentication, TLS, and transport parameters, or
organize them as mihomo YAML.

## Can I keep using the same server?

The same server can work when Clash supports the protocol and the protocol version, transport, TLS, authentication and other parameters match.

Return to the [compatibility overview](/guide/compatibility), or see [all supported protocols](/guide/protocols).
