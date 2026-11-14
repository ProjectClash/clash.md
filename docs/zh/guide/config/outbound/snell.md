---
title: Snell
---

# Snell

版本必须明确匹配服务器。Clash 支持 Snell v1 至 v6，其中 v5 走 v4 兼容方式。使用 ShadowTLS、Restls 或 JLS 时，还要填写该包装协议的密码及版本等信息。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

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

服务器使用 Snell v6 时，填写 `version: 6`。`mode` 和 `user-key` 只在服务端用到时添加：

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

上游 mihomo 从 1.19.34 起也支持 v6 和 `mode`，但没有 `user-key`。服务端要求用户密钥时，这个节点只能在 Clash 里使用。

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `psk` | 服务端预共享密钥。v6 要求 12 到 255 字节。 |
| `version` | 填写服务端版本；第一个示例使用 v4。version: 5 在当前版本走 v4 兼容方式，不代表原生 v5；version: 6 使用原生 v6 客户端。 |
| `udp` | UDP 需要 v3、v4 或 v6；v1/v2 不支持。 |
| `reuse` | v4、v5、v6 可选连接复用。 |
| `mode` | 仅 v6，必须与服务端一致。`default`（不填时）加密并整形流量；`unshaped` 加密但不整形；`unsafe-raw` 不加密，只在外层已有保护时使用。v1 到 v5 的节点写了这一项：SDK v1.19.34-clash.1 起会报错，更早的版本只是忽略；删掉即可。 |
| `user-key` | 仅 v6，服务端为你分配了用户密钥时填写，最长 255 字节。v1 到 v5 的节点会忽略这一项。 |
| `obfs-opts` | 仅在服务端启用混淆时添加，包含 mode 和 host 等对应字段。v6 由 `mode` 取代简单的 HTTP/TLS 混淆，不再支持后者；ShadowTLS、Restls 与 JLS 包装仍可使用。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/snell/).
