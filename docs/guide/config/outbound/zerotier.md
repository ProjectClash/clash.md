---
title: ZeroTier
---

# ZeroTier

Replace network with your ZeroTier network ID and authorize the client in its controller. Network routes determine reachable destinations; joining alone does not provide an internet exit. Cleared identity storage may require reauthorization.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

```yaml
proxies:
  - name: Node
    type: zerotier
    network: "0123456789abcdef"
    udp: true
```

Keep `udp: true` explicitly when UDP is needed; omission does not enable it in this reference version.

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `network` | 16-digit hexadecimal network ID; quote it to preserve the string. |
| `state-dir` | Optional node-identity storage directory. |
| `identity-secret` | Optional complete private identity content, not a file path. It must include private keys and pass identity validation. Omit it to keep using the identity managed in `state-dir`; do not reuse one identity on two concurrently running nodes. |
| `planet` | App-readable private Planet file path, if required. |
| `mtu` / `physical-mtu` | Tunnel and physical UDP payload MTUs; normally leave defaults. |
| `remote-dns-resolve` / `dns` | Use DNS reachable through the virtual network when remote resolution is needed. |
| `ip-stack` | The network stack used inside this node. `mode` is `auto` (default), `gvisor`, or `mips`; `auto` uses gVisor on Apple devices. With `mips`, `congestion-controller` picks TCP congestion control: cubic (default), reno, bbr, or bbr3. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/zerotier/).

The `identity-secret` field was checked against
[Clash Core snapshot 7ea70d1](https://github.com/ProjectClash/Clash).
