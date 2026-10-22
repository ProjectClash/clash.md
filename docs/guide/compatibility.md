---
title: Clash compatibility with mihomo, sing-box, Surge, Quantumult X, Shadowrocket, Stash and Loon
description: Recommended migration paths for profile URLs, YAML configurations, and nodes from mihomo, sing-box, Surge, Quantumult X, Shadowrocket, Stash, and Loon.
head:
  - - link
    - rel: canonical
      href: https://clash.md/guide/compatibility
  - - link
    - rel: alternate
      hreflang: zh-CN
      href: https://clash.md/zh/guide/compatibility
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I move sing-box nodes to Clash?","acceptedAnswer":{"@type":"Answer","text":"Prefer a provider profile URL that returns mihomo YAML, or recreate the node in Clash from its protocol parameters."}},{"@type":"Question","name":"How do I move Surge or Quantumult X nodes?","acceptedAnswer":{"@type":"Answer","text":"Use a profile URL that returns mihomo YAML, or add the node from its original server and protocol parameters."}},{"@type":"Question","name":"Can I reuse a Shadowrocket remote profile in Clash?","acceptedAnswer":{"@type":"Answer","text":"Yes when the provider returns mihomo YAML from its HTTPS profile URL. Recreate rules and modules with Clash rules and corresponding features."}},{"@type":"Question","name":"How do I use ss:// links or Base64 node lists?","acceptedAnswer":{"@type":"Answer","text":"Convert them to mihomo YAML or enter their server, port, credentials and protocol parameters in the Clash node editor."}}]}'
---

# Clash compatibility with popular proxy apps

**Short answer:** Clash directly reads mihomo-format YAML configurations and HTTPS profile URLs that return mihomo YAML, including standard Clash / mihomo YAML used by Stash. Servers and nodes from sing-box, Surge, Quantumult X, Shadowrocket, or Loon can be reused through a compatible profile URL or parameter-based node entry.

## Choose the app you use now

| Current app | Recommended configuration path | Node path | Details |
| --- | --- | --- | --- |
| Clash / mihomo | Use standard mihomo YAML directly | Use directly | [mihomo compatibility](/guide/compatibility/mihomo) |
| sing-box | Use a profile URL that returns mihomo YAML, or prepare YAML | Add supported protocol parameters | [sing-box compatibility](/guide/compatibility/sing-box) |
| Surge | Use a profile URL that returns mihomo YAML, or recreate nodes | Shared protocols include Snell | [Surge compatibility](/guide/compatibility/surge) |
| Quantumult X | Use a profile URL that returns mihomo YAML | Parameter-based entry also works | [Quantumult X compatibility](/guide/compatibility/quantumult-x) |
| Shadowrocket | Use a profile URL that returns mihomo YAML | Parameter-based entry also works | [Shadowrocket compatibility](/guide/compatibility/shadowrocket) |
| Stash | Use standard Clash / mihomo YAML directly | Use directly | [Stash compatibility](/guide/compatibility/stash) |
| Loon | Use a profile URL that returns mihomo YAML | Parameter-based entry also works | [Loon compatibility](/guide/compatibility/loon) |

## Three kinds of compatibility

1. **Configuration-file compatibility** — direct reuse of complete configurations.
2. **Remote-profile compatibility** — receiving mihomo YAML from an HTTPS profile URL.
3. **Protocol interoperability** — connecting directly to the same server.

Clash provides broad remote-profile and protocol interoperability.
Product-specific settings can be recreated with mihomo YAML, Clash rules, and
the corresponding features.

## What can Clash import directly?

| Source | Result |
| --- | --- |
| mihomo YAML configuration | Import directly |
| HTTPS profile URL returning mihomo YAML | Add the URL directly; Profile User-Agent is configurable |
| Standalone node links such as `ss://` | Convert to mihomo YAML or recreate the node from its parameters |
| Base64 node list | Convert to mihomo YAML before import |
| QR code containing an HTTPS profile URL | Scan to add a remote configuration |

See the [complete protocol list](/guide/protocols).

## How remote requests identify Clash

When Clash downloads a Profile URL, it sends a `User-Agent` like this by
default:

```http
User-Agent: clash.meta/1.19.33 Clash/v1.0.13.86 Darwin/25.6.0 Mac16,5
```

- `clash.meta/1.19.33`: the built-in core version. It starts the same way as
  mihomo's, so the service returns a mihomo-format configuration.
- `Clash/v1.0.13.86`: the Clash app version and build number.
- `Darwin/25.6.0`: the Darwin kernel version, not a system version such as
  "macOS 26" or "iOS 26".
- `Mac16,5`: the Apple hardware model. On iPhone, iPad, and Apple TV it is an
  identifier such as `iPhone18,2`, `iPad14,5`, or `AppleTV6,2`, never the name
  you gave the device.

Different requests send different values:

- **Downloading a Profile URL**: the format above. If a service only accepts
  certain client names, switch to the FlClash or Clash Verge compatible value
  under **More › Client Settings › Download Identity**.
- **Downloading proxy and rule providers**: a configuration's `global-ua` is
  always used when it sets one. Otherwise, the app's first download uses the
  format above, and later automatic updates by Clash in the background use
  `clash.meta/1.19.33`.
- When a provider sets its own `User-Agent` in `header`, that value wins.

The receiving service can see the app version, Darwin version, and hardware
model. The `User-Agent` contains no account, device name, or advertising
identifier.

## Frequently asked questions

### Can I reuse my Shadowrocket remote profile?

Yes when the provider returns mihomo-compatible YAML from the HTTPS profile
URL. Recreate Shadowrocket rules, modules, and app settings with Clash rules and
the corresponding features. See the dedicated
[Shadowrocket compatibility guide](/guide/compatibility/shadowrocket).

### Can I use the same provider profile URL?

Yes, if the provider can return mihomo-compatible YAML. Clash can change its Profile User-Agent for panels that select an output format by client name.

### Can I keep using the same server?

When the protocol and all required parameters are supported, the same server
works directly.

### Does compatibility mean affiliation?

Brand names identify configuration and protocol compatibility. Clash and Clash Core
are developed and maintained independently.
