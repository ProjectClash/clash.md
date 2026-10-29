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
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I move sing-box nodes to Clash?","acceptedAnswer":{"@type":"Answer","text":"Prefer a provider profile URL that returns mihomo YAML, or recreate the node in Clash from its protocol parameters."}},{"@type":"Question","name":"How do I move Surge or Quantumult X nodes?","acceptedAnswer":{"@type":"Answer","text":"Use a profile URL that returns mihomo YAML, or add the node from its original server and protocol parameters."}},{"@type":"Question","name":"Can I reuse a Shadowrocket remote profile in Clash?","acceptedAnswer":{"@type":"Answer","text":"Yes when the provider returns mihomo YAML from its HTTPS profile URL. Shadowrocket modules can be imported into Clash Modules by pasting their links."}},{"@type":"Question","name":"How do I use ss:// links or Base64 node lists?","acceptedAnswer":{"@type":"Answer","text":"Convert them to mihomo YAML or enter their server, port, credentials and protocol parameters in the Clash node editor."}}]}'
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
Modules from popular proxy apps [import directly](#modules); other
product-specific settings can be recreated with mihomo YAML and Clash rules.

## What can Clash import directly?

| Source | Result |
| --- | --- |
| mihomo YAML configuration | Import directly |
| HTTPS profile URL returning mihomo YAML | Add the URL directly; Download Identity is switchable |
| Standalone node links such as `ss://` | Convert to mihomo YAML or recreate the node from its parameters |
| Base64 node list | Convert to mihomo YAML before import |
| QR code containing an HTTPS profile URL | Scan to add a remote configuration |
| Module link from a popular proxy app | Paste into Add Module to import it directly |

See the [complete protocol list](/guide/protocols).

## Modules

Modules from popular proxy apps can be imported into Clash
[Modules](/guide/modules) as they are: paste the module link into **Add
Module**. Clash recognizes the format from the content first and the link's
extension second:

| Format | How it is recognized | What takes effect |
| --- | --- | --- |
| Surge modules (`.sgmodule`), Shadowrocket modules (`.module`) | Any other INI-style module is read this way | Rules, URL / header / body rewrites, local mappings, `[MITM]` hostnames, scripts, `[Host]`, and panels; `[Proxy]` and `[Proxy Group]` are skipped |
| Loon plugins (`.plugin`, `.lpx`) | The extension, or a `[Rewrite]` or `[Argument]` section | `[Argument]` becomes the module's **Settings**; rules, rewrites, scripts, and MITM hostnames; `[General]` accepts only some keys |
| Stash overrides (`.stoverride`) | The extension, or YAML content | Rules and rule providers, MITM / rewrites / scripts under `http`, scheduled scripts, and tiles as panels; `proxies` is skipped |
| Quantumult X resources (`.conf`, `.snippet`) | The extension, or sections such as `rewrite_local`, `filter_local`, or `task_local` | Local sections only: `[rewrite_local]`, `[mitm]`, `[filter_local]`, and `[task_local]`; remote resources named by `rewrite_remote` or `filter_remote` are not fetched |

DNS scripts, rule scripts, and certificate replacements do not take effect in
any format; **Skipped** in module details explains each line.

## How remote requests identify Clash

When Clash downloads a Profile URL, it sends a `User-Agent` like this by
default:

```http
User-Agent: clash.meta/1.19.33 Clash/v1.0.13.152 Darwin/25.0.0 iPhone18,2
```

- `clash.meta/1.19.33`: the built-in core version. It starts the same way as
  mihomo's, so the service returns a mihomo-format configuration.
- `Clash/v1.0.13.152`: the Clash app version and build number.
- `Darwin/25.0.0`: the device's Darwin kernel version, which changes with system
  updates. It is not a system version such as "iOS 26" or "macOS 26".
- `iPhone18,2`: the Apple hardware model. On Mac, iPad, and Apple TV it is an
  identifier such as `Mac16,5`, `iPad14,5`, or `AppleTV6,2`, never the name you
  gave the device.

Every download for a configuration uses one `User-Agent`, chosen in this order:

1. A proxy or rule provider that sets its own `User-Agent` in `header` uses it.
2. Otherwise, the configuration's `global-ua` applies. Write it in the
   configuration file, or fill in **General Configuration › Download
   User-Agent** on the configuration page.
3. Otherwise, the app's Download Identity applies, which is the format above by
   default.

The same value is used when the app downloads and when the core updates proxy
providers, rule providers, and geo data in the background. The Profile URL
itself only looks at the Download User-Agent you set for that configuration in
the app, then falls back to Download Identity; a `global-ua` inside the
downloaded file is not used to fetch the URL itself.

If a service only accepts certain client names, switch to FlClash or Clash
Verge under **More › App Settings › Client Settings › Download Identity ›
Profile URL Compatibility**; on Apple TV, use **More › User-Agent**. Only these
three choices exist, and you cannot type your own. When a Profile URL answers
with a redirect and the current identity is not FlClash, the app retries once as
FlClash.

The receiving service can see the app version, Darwin version, and hardware
model. The `User-Agent` contains no account, device name, or advertising
identifier.

## Frequently asked questions

### Can I reuse my Shadowrocket remote profile?

Yes when the provider returns mihomo-compatible YAML from the HTTPS profile
URL. Shadowrocket modules can be imported directly by pasting their links;
recreate rules and app settings with Clash rules and settings. See the dedicated
[Shadowrocket compatibility guide](/guide/compatibility/shadowrocket).

### Can I use the same provider profile URL?

Yes, if the provider can return mihomo-compatible YAML. Clash can switch its Download Identity to FlClash or Clash Verge for panels that select an output format by client name.

### Can I keep using the same server?

When the protocol and all required parameters are supported, the same server
works directly.

### Does compatibility mean affiliation?

Brand names identify configuration and protocol compatibility. Clash and Clash Core
are developed and maintained independently.
