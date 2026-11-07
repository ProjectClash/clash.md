---
title: TUN and network access
description: Using TUN in Clash, routing specific apps, platform differences, and which TUN settings take effect.
---

# TUN and network access

## Do I need a separate TUN mode? {#tun-mode}

**No—just connect Clash.** On iPhone, iPad, Mac, and Apple TV, Clash uses Apple
Network Extension (NE) Packet Tunnel to receive traffic and apply your rules.
Allow the system to add a VPN configuration when you first connect.

`tun.enable: false` does not stop the VPN or switch to proxy ports only.
To stop routing traffic through Clash, disconnect in the app.

## Do I need to configure TUN? {#example}

**Usually, no.** You can omit the entire `tun:` block and let Clash manage the
tunnel.

Starting with Clash for iOS and iPadOS 1.0.14, macOS 1.0.16, and tvOS 1.0.17,
there is one network stack on iPhone, iPad, Mac, and Apple TV, so there is
nothing to choose. Whether `stack` says `gvisor`, `system`, `mixed`, or `mips`,
the configuration connects as usual and runs on that one stack, and the app
notes that the setting has no effect. The same goes for `ip-stack` on
WireGuard, OpenVPN, MASQUE, and ZeroTier nodes; only Tailscale nodes still use
gVisor internally.

To pick the TCP congestion control algorithm, add:

```yaml
tun:
  congestion-controller: bbr
```

Choose `cubic` (the default), `reno`, or `bbr`; `bbr3` runs as `bbr`.

The network stack is separate from Rule, Global, and Direct, which determine
outbound routing. For everyday rule-based use, select Rule.

After changing tunnel settings, disconnect and reconnect, then access the
service you want to use. See [configuration best practices](/guide/config/best-practice)
for a complete starting point.

## Can I proxy only a specific app? {#per-app-proxy}

Use destination domains, IPs, or rule sets to proxy services used by an app
and send other destinations to `DIRECT`. Direct means a direct outbound
connection; traffic and DNS may still pass through Clash.

- **iPhone, iPad, and Apple TV:** use destination domains, IPs, or rule sets. Process-name matching is unavailable. Apps may share destinations, so destination rules are not exact app filters.
- **Mac:** process name, process path, and UID rules are also available where the connection's process can be identified.

Sending traffic to `DIRECT` alone does not make other apps completely bypass
Clash. `tun.enable: false` and TUN filters such as `include-package` cannot
provide that behavior either.

## What differs across platforms? {#platforms}

Most TUN fields work the same way on all three platforms. The main differences are:

| Feature | iOS / iPadOS | tvOS | macOS |
| --- | --- | --- | --- |
| Include All Networks | Available | Not enabled | Available |
| Process name, path, or UID routing | Unsupported | Unsupported | Supported |

macOS process/UID routing uses routing rules; fields such as `tun.include-uid`
have no effect on any of the three platforms.

On all three platforms, if reading packets from the tunnel
fails because the interface is gone, or keeps failing for 5 seconds, Clash Core
stops reading and the app disconnects the VPN with an error, rather than
staying connected without passing traffic.

## How do I set each TUN field? {#fields}

All fields belong under `tun:`. Find the settings you need in the groups below.
Fields marked as having no effect can be omitted. Clash's runtime adjustments
do not change your saved YAML.

::: details Stacks and devices

| Field | How it works |
| --- | --- |
| `enable` | Always enabled while connected. Setting false does not stop the VPN or switch to proxy ports only; disconnect in the app. |
| `stack` | No effect. Starting with Clash for iOS and iPadOS 1.0.14, macOS 1.0.16, and tvOS 1.0.17, there is one network stack: system, gvisor, mixed, or mips all connect as usual and run on it, and the app notes that the setting has no effect. |
| `congestion-controller` | TCP congestion control: cubic (default), reno, or bbr; bbr3 runs as bbr. Any other value stops the tunnel from connecting. |
| `device` | Managed by Clash; names such as utun0 do not select a system interface. |
| `mtu` | Set by Clash at startup; the YAML value does not apply. |
| `file-descriptor` | Managed by Clash; leave it unset. |
| `gso` | No effect; Clash does not enable GSO segmentation offload. |
| `gso-max-size` | No effect; Clash does not enable GSO segmentation offload. |
| `recvmsgx` | Always off; leave it unset. |
| `sendmsgx` | Always off; leave it unset. |

:::

::: details Routes and outbound interfaces

| Field | How it works |
| --- | --- |
| `auto-route` | Set to false at runtime; Clash still configures system routes and captures traffic. |
| `auto-detect-interface` | Set to false at runtime; Clash manages the outbound interface automatically. |
| `strict-route` | Affects default-route splitting for an address family without explicit route-address entries. Separate from Include All Networks. |
| `route-address` | Sets destination ranges to include in the tunnel. Client routing options, IPv6, and system VPN settings also apply. |
| `route-exclude-address` | Sets destination ranges to exclude from tunnel routes. Client routing options, IPv6, and system VPN settings also apply. |
| `route-address-set` | Accepted, but rule sets are not converted into system routes. Ordinary RULE-SET routing remains available. |
| `route-exclude-address-set` | Accepted, but rule sets are not converted into system routes. Ordinary RULE-SET routing remains available. |
| `auto-redirect` | Linux-specific; has no effect in Clash on Apple platforms. |
| `iproute2-table-index` | Linux-specific; has no effect in Clash on Apple platforms. |
| `iproute2-rule-index` | Linux-specific; has no effect in Clash on Apple platforms. |
| `auto-redirect-input-mark` | Linux-specific; has no effect in Clash on Apple platforms. |
| `auto-redirect-output-mark` | Linux-specific; has no effect in Clash on Apple platforms. |
| `auto-redirect-iproute2-fallback-rule-index` | Linux-specific; has no effect in Clash on Apple platforms. |

:::

::: details DNS, IPv6, and connection settings

| Field | How it works |
| --- | --- |
| `dns-hijack` | Managed by Clash as 0.0.0.0:53 for TCP/UDP port-53 DNS requests entering the tunnel. Does not decrypt DoH/DoT. |
| `dns-mode` | Accepted, but Clash always leaves it unset: on Apple devices the VPN's network settings decide the system DNS. Port-53 DNS entering the tunnel is still handled through `dns-hijack`. |
| `inet6-address` | Sets tunnel IPv6 addresses; a default address is used when omitted, and an empty value means no IPv6 capture. iPhone, iPad, and Mac follow the configuration: the tunnel captures IPv6 only when `ipv6` is true (the default), this field is not empty, and the device has IPv6 when Clash connects; after that it follows the current network. On iPhone and iPad with an IPv4 loopback address, when the tunnel carries IPv4 only, it declares no IPv6 and this field has no effect; see [Loopback addresses](#loopback-address). On Apple TV, the IPv6 group under More › IP Stack also applies; see [Which IPv6 settings are separate?](#which-ipv6-settings-are-separate) |
| `udp-timeout` | UDP session-state timeout in seconds; does not limit how long the VPN can stay connected. |
| `endpoint-independent-nat` | Accepted, but changing it does not change current NAT behavior. |
| `disable-icmp-forwarding` | Always true, with local ICMP replies. Verify the proxy by accessing a destination, rather than relying on ping alone. |
| `icmp-timeout` | ICMP state timeout in seconds; does not enable remote ICMP forwarding. |
| `loopback-address` | Connections to these addresses loop back to this device, as a loopback VPN; see [Loopback addresses](#loopback-address). |

:::

::: details Interface, user, app, and port filters

| Field | How it works |
| --- | --- |
| `include-interface` | No effect; cannot filter source interfaces or select an outbound interface. |
| `exclude-interface` | No effect; cannot filter source interfaces or select an outbound interface. |
| `include-uid` | No effect on any platform. Use routing rules for user/process routing on macOS. |
| `include-uid-range` | No effect on any platform. Use routing rules for user/process routing on macOS. |
| `exclude-uid` | No effect on any platform. Use routing rules for user/process routing on macOS. |
| `exclude-uid-range` | No effect on any platform. Use routing rules for user/process routing on macOS. |
| `include-mac-address` | No effect; cannot filter by device MAC address. |
| `exclude-mac-address` | No effect; cannot filter by device MAC address. |
| `include-android-user` | Android-specific; no effect. iOS app identifiers cannot enable per-app filtering here. |
| `include-package` | Android-specific; no effect. iOS app identifiers cannot enable per-app filtering here. |
| `exclude-package` | Android-specific; no effect. iOS app identifiers cannot enable per-app filtering here. |
| `exclude-src-port` | No effect; cannot exclude ports from tunnel capture. |
| `exclude-src-port-range` | No effect; cannot exclude ports from tunnel capture. |
| `exclude-dst-port` | No effect; cannot exclude ports from tunnel capture. |
| `exclude-dst-port-range` | No effect; cannot exclude ports from tunnel capture. |

:::

::: details Legacy fields

| Field | How it works |
| --- | --- |
| `inet4-route-address` | Still accepted and merged with route-address (IPv4) before passing to Apple. New fields do not replace legacy values; avoid duplicates. |
| `inet6-route-address` | Still accepted and merged with route-address (IPv6) before passing to Apple. New fields do not replace legacy values; avoid duplicates. |
| `inet4-route-exclude-address` | Still accepted and merged with route-exclude-address (IPv4) before passing to Apple. New fields do not replace legacy values; avoid duplicates. |
| `inet6-route-exclude-address` | Still accepted and merged with route-exclude-address (IPv6) before passing to Apple. New fields do not replace legacy values; avoid duplicates. |

:::

### Which IPv6 settings are separate?

- `ipv6`: whether Clash itself resolves and uses IPv6 addresses; `true` when
  omitted.
- `dns.ipv6`: whether DNS returns IPv6 addresses (AAAA) to apps; `false` when
  omitted, so by default apps get no IPv6 addresses. `ipv6` being on by default
  does not mean apps get IPv6 by default.
- TUN IPv6: whether the tunnel captures IPv6 traffic.

iPhone, iPad, and Mac no longer have IP Stack settings, and choices saved
earlier no longer apply: the configuration's `ipv6`, `dns.ipv6`, and
`tun.inet6-address` run as written. The tunnel captures IPv6 only when `ipv6`
is true (the default), `tun.inet6-address` is not empty (it has a default), and
the device has IPv6 when Clash connects. After that it follows the current
network and pauses IPv6 capture while the network has no IPv6. If the device
had no IPv6 when Clash connected, reconnect after moving to a network with
IPv6. On iPhone and iPad with an IPv4 loopback address, when the tunnel carries
IPv4 only, it declares no IPv6 and `tun.inet6-address` has no effect; see
[Loopback addresses](#loopback-address).

Apple TV still has its **More › IP Stack** page, with two independent groups,
both set to Follow Configuration by default. Only Follow Configuration runs the
configuration exactly as written; the other choices override it at run time
and do not change the configuration file. Changing them while connected
reconnects Clash.

| IP Query Mode | `ipv6` | `dns.ipv6` |
| --- | --- | --- |
| Follow Configuration | As configured | As configured |
| IPv4 Only | Off | Off |
| IPv4 & IPv6, Prefer IPv4 | On | As configured |
| Prefer IPv6, IPv6 Only (Use with Caution) | On | On |

The **IPv6** group decides whether the tunnel captures IPv6:

- Follow Configuration: as on iPhone, iPad, and Mac, under the conditions above;
- Off: the tunnel does not capture IPv6;
- Automatic: uses a default address even when the configuration has no
  `tun.inet6-address`, and follows the current network;
- Always: captures IPv6 all the time, whatever the network.

## Loopback addresses (loopback-address) {#loopback-address}

Some tools reach services running on the device through a "loopback VPN":
connections to an agreed address go into the VPN and come back to the same
device. Sideloading tools and local development services use it this way;
SideStore, for example, treats 10.7.0.1 as the device's address.
`tun.loopback-address` does this. Clash does more than upstream mihomo here, so
the two are described separately below.

### Upstream mihomo {#loopback-upstream}

- TCP connections to these addresses loop back to the device that opened them.
  Every upstream stack (gvisor, system, mixed, mips) handles TCP only; UDP is
  forwarded as usual.
- Upstream adds no route of its own, so the address has to fall inside the
  tunnel's routes. The auto-route default route usually covers it. You need to
  handle it yourself when `route-address` narrows the range,
  `route-exclude-address` covers the address, or a more specific local route
  exists (for example, a local network that happens to be 10.7.0.0/24).

### Clash (Apple clients) {#loopback-clash}

Minimal configuration:

```yaml
tun:
  loopback-address:
    - 10.7.0.1
```

- TCP and UDP both loop back to this device.
- Clash adds each IPv4 loopback address to the tunnel as a /32 host route, so
  no `route-address` entry is needed. IPv6 loopback addresses go in as /128
  routes when the tunnel declares IPv6. For loopback use, don't write
  `route-address` yourself.
- Save, then disconnect and reconnect.

**iPhone and iPad: IPv4 only.** With an IPv4 loopback address, and with neither
**HomeKit Compatibility** on nor `tun.strict-route` and **Enforce Routes** both
on, the tunnel carries IPv4 only (the default route plus the loopback address's
/32) and declares no IPv6, so `tun.inet6-address` has no effect; tools that
connect back to the device find it by themselves. The cost
is that IPv6 is unavailable on the whole device:

- domains that go through fake-ip work as usual, IPv6-only sites included;
- for domains in fake-ip-filter, real addresses in redir-host mode, and IPv6
  address literals, IPv6-only sites do not open, and dual-stack sites fall back
  to IPv4;
- Clash's own IPv6 connections, direct or through a node, are not affected.

With **HomeKit Compatibility** on, or with `strict-route` and **Enforce Routes**
both on, the tunnel carries IPv6 as before (when the configuration turns IPv6
on), without the IPv6 costs above, but you enter the device address, such as
10.7.0.1, in the tool yourself. **Enforce Routes** alone does not count.

On iPhone and iPad, `dns.fake-ip-range6` in the configuration has no effect
whenever an IPv4 loopback address is set.

**iPhone and iPad: turn off Include All Networks.** While it is on, TCP
connections to services listening on this device fail, while UDP works; turn
it off to connect. Find it in **More › Connection Behavior › VPN**. Some
modules turn this switch on over your setting; the row then names the module
that runs over it, so turn that module off on the [Modules](/guide/modules)
page first.

**Mac and Apple TV:** the only addition is a host route; everything else is
unchanged, and there is no IPv4-only limit. Apple TV has no Include All
Networks switch.

This applies to Clash for iOS and iPadOS 1.0.14, macOS 1.0.16, and tvOS 1.0.17
and later.

## Other inbound settings

Local proxy ports, `allow-lan`, listeners, and external controllers provide local
services; configure them when needed. You can also turn on the external controller
in the app under **More › Client Settings › External Controller** and control
Clash from Terminal with [clash-cli](/guide/clash-cli). Linux `routing-mark`, iptables, TPROXY
routing, and selecting an outbound interface with `interface-name` do not apply here.

Search other fields in the [complete configuration reference](/guide/config/).

## Version notes {#scope}

This guide covers Clash on Apple platforms. Some settings change between
versions; use the features available in your installed version.

::: details Documentation reference version

Updated 2026-09-14, based on Clash Core `5bca0bcb73cd6dcb2d276be31f3a149211388c6d`;
the `mips` stack and `congestion-controller` from mihomo 1.19.32 were added on 2026-10-10,
and `dns-mode` from mihomo 1.19.33 on 2026-10-22. `loopback-address` was updated
for SDK v1.19.33-clash.3 on 2026-10-24, and tunnel read-failure handling for
v1.19.33-clash.4 on 2026-10-29. On 2026-11-07, the guide moved to the single
network stack of SDK v1.19.33-clash.5 (Clash for iOS and iPadOS 1.0.14, macOS
1.0.16, and tvOS 1.0.17), and updated `loopback-address` routing and IPv6 on iOS.
Not every App Store version necessarily includes the same features. For field
names, see the
[mihomo TUN documentation](https://wiki.metacubex.one/config/inbound/tun/).

:::
