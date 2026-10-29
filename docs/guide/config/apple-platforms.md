---
title: iOS, macOS, and tvOS configuration differences
description: Compare process routing, storage, TUN, provider, and advanced Clash Core configuration support on iPhone, iPad, Mac, and Apple TV.
---

# Three platforms, three system boundaries

All three use the same Clash Core data plane, but Apple exposes different network
metadata, storage, and interaction surfaces on each platform. A shared core
does not make every operating-system capability identical.

| Capability | iOS / iPadOS | macOS | tvOS |
| --- | --- | --- | --- |
| Core mihomo YAML semantics | Supported | Supported | Supported |
| Packet Tunnel | Supported | Supported | Supported |
| [EasyTier](./outbound/easytier) | REJECT placeholder; connections refused | Implementation included; IPv4 overlay | REJECT placeholder; connections refused |
| `tun.stack` | gVisor / System / Mixed / mips | gVisor / System / Mixed / mips | gVisor / System / Mixed / mips |
| Process name, path, and UID routing | No reliable process identification | Supported where connection information is available | No reliable process identification |
| App signing or team-ID rules | Unsupported | Unsupported | Unsupported |
| Add configuration | Profile URL, QR code, configuration file, or the Create Profile flow | Profile URL, pasted configuration text, QR code (including from an image), configuration file, or the Add Profile flow | Profile URL, or restore configurations an iPhone, iPad, or Mac syncs through iCloud |
| Modules and HTTPS decryption | Supported | Supported from 1.0.15 | Unsupported; modules turned on elsewhere do not apply on Apple TV |
| Remote Profile | Supported | Supported | Supported |
| HTTP providers | Clash Core-managed | Clash Core-managed | Clash Core-managed |
| Policy selection and Fake IP state | Saved subject to settings and storage | Saved subject to settings and storage | Caches may be lost |
| Linux iptables / mark / TPROXY | Not applicable | Not applicable | Not applicable |

Active Include All Networks on iOS/macOS changes System/Mixed to gVisor; tvOS keeps that option off.
TUN UID, package, and source-interface filters do not operate on any of the three platforms. macOS process/UID rules use a separate mechanism.
See [NE/TUN platform differences and source version scope](/guide/config/inbound#platforms).

On iOS/tvOS, process patterns may match empty identities; UID rules have separate removal handling. See [process routing](/guide/config/rules).

## System versions

- iOS and iPadOS 15 or later
- macOS 13 or later
- tvOS 17 or later

Use the platform and status filters in the [complete field table](/guide/config/)
when you need one exact field.
