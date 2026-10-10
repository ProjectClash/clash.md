---
title: ZeroTier
---

# ZeroTier

将 `network` 替换为自己的 ZeroTier 网络 ID，并在控制器中批准这个客户端。网络路由决定可访问的目标；加入网络并不自动获得公网出口。身份缓存被清理后可能需要重新授权。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: zerotier
    network: "0123456789abcdef"
    udp: true
```

需要 UDP 时显式保留 `udp: true`；本参考版本省略此项不会默认开启。

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `network` | 16 位十六进制网络 ID；使用引号保留原字符串。 |
| `state-dir` | 可选节点身份存储目录。 |
| `identity-secret` | 可选的完整私有身份内容，不是文件路径。必须包含私钥并通过身份校验；省略时沿用 `state-dir` 管理的身份。不要让两台同时运行的节点共用同一份身份。 |
| `planet` | 使用私有 Planet 时提供 App 可读的文件路径。 |
| `mtu` / `physical-mtu` | 隧道和物理 UDP 负载的 MTU；没有明确需求时保留默认。 |
| `remote-dns-resolve` / `dns` | 需要时使用虚拟网络内可达的 DNS 解析目标。 |
| `ip-stack` | 节点内部使用的协议栈。`mode` 可选 `auto`（默认）、`gvisor` 或 `mips`，`auto` 在 Apple 设备上使用 gVisor；选择 `mips` 时可用 `congestion-controller` 指定 TCP 拥塞控制算法：cubic（默认）、reno、bbr 或 bbr3。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/zerotier/).

`identity-secret` 字段已按
[Clash Core 快照 7ea70d1](https://github.com/ProjectClash/Clash)
核对。
