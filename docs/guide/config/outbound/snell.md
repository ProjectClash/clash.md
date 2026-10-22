---
title: Snell
---

# Snell

Match the server version explicitly. Clash supports Snell v1 through v6;
version 5 runs on the v4 compatibility path. ShadowTLS, Restls, or JLS
wrapping also requires its own password, version, and related parameters.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

```yaml
proxies:
  - name: Node
    type: snell
    server: proxy.example.com
    port: 443
    psk: YOUR_PSK
    version: 4
    udp: true
```

For a Snell v6 server, set `version: 6`. Add `mode` and `user-key` only when
the server uses them:

```yaml
proxies:
  - name: Node v6
    type: snell
    server: proxy.example.com
    port: 443
    psk: YOUR_PSK
    version: 6
    udp: true
```

v6 is a Clash Core addition. Upstream mihomo does not accept `version: 6`, so
keep these nodes in profiles meant for Clash.

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `psk` | Server pre-shared key. v6 needs 12 to 255 bytes. |
| `version` | Match the server version; the first example uses v4. Version 5 uses the v4 compatibility path, not a native v5 client. Version 6 uses the native v6 client. |
| `udp` | UDP needs v3, v4, or v6; v1/v2 do not support it. |
| `reuse` | Optional connection reuse for v4, v5, and v6. |
| `mode` | v6 only; must match the server. `default` (when omitted) encrypts and shapes traffic; `unshaped` encrypts without shaping; `unsafe-raw` does not encrypt, so use it only when another layer already protects the connection. Earlier versions ignore it. |
| `user-key` | v6 only; fill it in when the server assigns you a user key, up to 255 bytes. Earlier versions ignore it. |
| `obfs-opts` | Add only for server-side obfuscation, including the matching mode, host, and other options. v6 has no simple HTTP/TLS obfuscation, because `mode` replaces it; ShadowTLS, Restls, and JLS wrapping still work. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/snell/).
