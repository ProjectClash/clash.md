---
title: TUN 与网络接入
description: 了解 Clash 的 TUN 使用方法、按应用分流、三端差异，以及各项 TUN 配置是否生效。
---

# TUN 与网络接入

## 需要另外开启 TUN 模式吗？ {#tun-mode}

**不需要，连接 Clash 即可。**Clash 在 iPhone、iPad、Mac 和 Apple TV 上使用
Apple Network Extension（NE）的 Packet Tunnel 接入网络，再按你的规则处理流量。
首次连接时，允许系统添加 VPN 配置即可。

`tun.enable: false` 不会关闭 VPN，也不会切换为仅代理端口模式。
需要停止接管网络时，请在 Clash 中断开连接。

## 日常需要配置 TUN 吗？ {#example}

**通常不用。**你可以省略整个 `tun:` 段，让 Clash 管理隧道。

从 iOS 与 iPadOS 1.0.14、macOS 1.0.16、tvOS 1.0.17 起，Clash 在 iPhone、iPad、Mac 和
Apple TV 上只有一种协议栈，不需要选择。配置里的 `stack` 写 `gvisor`、`system`、`mixed`
还是 `mips` 都能照常连接，统一按这一种协议栈运行，App 会提示这一项不生效。WireGuard、
OpenVPN、MASQUE、ZeroTier 节点的 `ip-stack` 也一样；只有 Tailscale 节点内部仍使用 gVisor。

需要指定 TCP 拥塞控制算法时，可以加入：

```yaml
tun:
  congestion-controller: bbr
```

可选 `cubic`（默认）、`reno` 与 `bbr`；写 `bbr3` 时按 `bbr` 运行。

协议栈和 Rule、Global、Direct 是两回事：后者决定流量如何选路。日常按规则使用时，
选择 Rule 即可。

修改隧道设置后，断开并重新连接，再访问目标服务确认效果。
需要完整配置，可参考[配置最佳实践](/zh/guide/config/best-practice)。

## 能否只代理某个应用？ {#per-app-proxy}

可以按目标域名、IP 或规则集，让某个应用使用的服务走代理，其余目标走 `DIRECT`。
注意：`DIRECT` 表示直连出站，流量和 DNS 仍可能经过 Clash。

- **iPhone、iPad 和 Apple TV**：使用目标域名、IP 或规则集分流，不能直接按进程名选择应用。多个应用可能访问相同目标，因此目标规则不等于精确的应用筛选。
- **Mac**：还可以使用进程名、进程路径或 UID 分流规则；具体连接需要能识别到对应进程。

如果希望其他应用完全绕过 Clash，单纯设置 `DIRECT` 不够；`tun.enable: false` 和
`include-package` 等 TUN 筛选字段也不能实现这种效果。

## 三个平台有什么区别？ {#platforms}

大部分 TUN 配置在三端的处理相同，主要区别如下：

| 功能 | iOS / iPadOS | tvOS | macOS |
| --- | --- | --- | --- |
| 包括所有网络 | 可以开启 | 不启用 | 可以开启 |
| 按进程名、路径或 UID 分流 | 不支持 | 不支持 | 支持 |

macOS 的进程/UID 分流使用规则配置；`tun.include-uid` 等字段在三端都不生效。

三个平台都一样：从隧道读包时，如果遇到接口已不存在，或者连续失败 5 秒，Clash Core 会停止读包，App 随即断开 VPN 并报错，不会一直显示已连接却不通。

## TUN 字段怎么填写？ {#fields}

所有字段都放在 `tun:` 下。下面按用途列出，查找你需要的项目即可。
标注“不生效”的字段可以省略；Clash 调整运行设置时，不会改写你保存的原始 YAML。

::: details 协议栈与设备

| 字段 | 使用说明 |
| --- | --- |
| `enable` | 连接时始终开启。写 false 不会关闭 VPN 或切换为仅代理端口模式；请在 App 中断开连接。 |
| `stack` | 不生效。iOS 与 iPadOS 1.0.14、macOS 1.0.16、tvOS 1.0.17 起，Clash 只有一种协议栈：写 system、gvisor、mixed 或 mips 都能照常连接，统一按它运行，App 会提示这一项不生效。 |
| `congestion-controller` | TCP 拥塞控制算法：cubic（默认）、reno、bbr；写 bbr3 时按 bbr 运行。填写其他值时无法连接。 |
| `device` | 由 Clash 管理，填写 utun0 等名称不会指定系统网卡。 |
| `mtu` | 由 Clash 启动时统一设置，YAML 中的值不生效。 |
| `file-descriptor` | 由 Clash 管理，无需填写。 |
| `gso` | 不生效，Clash 不启用 GSO 分段卸载。 |
| `gso-max-size` | 不生效，Clash 不启用 GSO 分段卸载。 |
| `recvmsgx` | 固定关闭，无需填写。 |
| `sendmsgx` | 固定关闭，无需填写。 |

:::

::: details 路由与出口

| 字段 | 使用说明 |
| --- | --- |
| `auto-route` | 运行时设为 false，系统路由仍由 Clash 设置；不影响正常接管流量。 |
| `auto-detect-interface` | 运行时设为 false，Clash 自动管理出口网卡。 |
| `strict-route` | 没有为某个地址族指定 route-address 时，影响该地址族的默认路由拆分方式。与「包括所有网络」是不同设置。 |
| `route-address` | 指定进入隧道的目标网段。还需结合客户端路由选项、IPv6 和系统 VPN 设置。 |
| `route-exclude-address` | 指定从隧道路由中排除的目标网段。还需结合客户端路由选项、IPv6 和系统 VPN 设置。 |
| `route-address-set` | 配置可以读取，但不会把规则集转换为系统路由。普通 RULE-SET 分流仍可使用。 |
| `route-exclude-address-set` | 配置可以读取，但不会把规则集转换为系统路由。普通 RULE-SET 分流仍可使用。 |
| `auto-redirect` | Linux 专用设置，在 Clash 的 Apple 版本中不生效。 |
| `iproute2-table-index` | Linux 专用设置，在 Clash 的 Apple 版本中不生效。 |
| `iproute2-rule-index` | Linux 专用设置，在 Clash 的 Apple 版本中不生效。 |
| `auto-redirect-input-mark` | Linux 专用设置，在 Clash 的 Apple 版本中不生效。 |
| `auto-redirect-output-mark` | Linux 专用设置，在 Clash 的 Apple 版本中不生效。 |
| `auto-redirect-iproute2-fallback-rule-index` | Linux 专用设置，在 Clash 的 Apple 版本中不生效。 |

:::

::: details DNS、IPv6 与连接设置

| 字段 | 使用说明 |
| --- | --- |
| `dns-hijack` | 由 Clash 统一设置为 0.0.0.0:53，接管进入隧道的 TCP/UDP 53 端口 DNS 请求。不解密 DoH/DoT。 |
| `dns-mode` | 可以写，但 Clash 始终将其置空：在 Apple 设备上，系统 DNS 由 VPN 的网络设置决定。进入隧道的 53 端口 DNS 请求仍由 `dns-hijack` 接管。 |
| `inet6-address` | 设置隧道 IPv6 地址，不写时用默认地址；写成空就不接管 IPv6。iPhone、iPad 与 Mac 按配置运行：`ipv6` 为 true（默认）、这一项没被写空，并且连接时设备有 IPv6，隧道才接管 IPv6，之后跟着当前网络。iPhone 与 iPad 配了 IPv4 回环地址、隧道只走 IPv4 时，隧道不声明 IPv6，这一项也不生效，见[回环地址](#loopback-address)。Apple TV 还受「更多 › IP Stack」里「IPv6」一组影响，见[配置 IPv6 时要区分什么](#配置-ipv6-时要区分什么)。 |
| `udp-timeout` | UDP 会话状态超时，单位为秒；不影响 VPN 可以连接多久。 |
| `endpoint-independent-nat` | 配置可以读取，但更改它不会改变当前 NAT 行为。 |
| `disable-icmp-forwarding` | 固定为 true，ICMP 应答在本地生成。请用实际访问验证代理连接，不要只看 ping。 |
| `icmp-timeout` | ICMP 状态超时，单位为秒；设置它不会开启远端 ICMP 转发。 |
| `loopback-address` | 发往这些地址的连接折回本机，用作环回 VPN，见[回环地址](#loopback-address)。 |

:::

::: details 网卡、用户、应用与端口筛选

| 字段 | 使用说明 |
| --- | --- |
| `include-interface` | 不生效，不能用它筛选来源网卡或指定出口网卡。 |
| `exclude-interface` | 不生效，不能用它筛选来源网卡或指定出口网卡。 |
| `include-uid` | 三端均不生效。macOS 按用户或进程分流请使用分流规则。 |
| `include-uid-range` | 三端均不生效。macOS 按用户或进程分流请使用分流规则。 |
| `exclude-uid` | 三端均不生效。macOS 按用户或进程分流请使用分流规则。 |
| `exclude-uid-range` | 三端均不生效。macOS 按用户或进程分流请使用分流规则。 |
| `include-mac-address` | 不生效，不能按设备 MAC 地址筛选。 |
| `exclude-mac-address` | 不生效，不能按设备 MAC 地址筛选。 |
| `include-android-user` | Android 专用设置，不生效；填写 iOS 应用标识也不能按应用筛选。 |
| `include-package` | Android 专用设置，不生效；填写 iOS 应用标识也不能按应用筛选。 |
| `exclude-package` | Android 专用设置，不生效；填写 iOS 应用标识也不能按应用筛选。 |
| `exclude-src-port` | 不生效，不能按端口排除隧道接管。 |
| `exclude-src-port-range` | 不生效，不能按端口排除隧道接管。 |
| `exclude-dst-port` | 不生效，不能按端口排除隧道接管。 |
| `exclude-dst-port-range` | 不生效，不能按端口排除隧道接管。 |

:::

::: details 旧字段

| 字段 | 使用说明 |
| --- | --- |
| `inet4-route-address` | 仍接受，与 route-address (IPv4) 合并后传给 Apple；新字段不会覆盖旧字段，避免重复填写。 |
| `inet6-route-address` | 仍接受，与 route-address (IPv6) 合并后传给 Apple；新字段不会覆盖旧字段，避免重复填写。 |
| `inet4-route-exclude-address` | 仍接受，与 route-exclude-address (IPv4) 合并后传给 Apple；新字段不会覆盖旧字段，避免重复填写。 |
| `inet6-route-exclude-address` | 仍接受，与 route-exclude-address (IPv6) 合并后传给 Apple；新字段不会覆盖旧字段，避免重复填写。 |

:::

### 配置 IPv6 时要区分什么？

- `ipv6`：Clash 自身是否解析和使用 IPv6 地址，不写时默认是 true。
- `dns.ipv6`：DNS 是否向应用返回 IPv6 地址（AAAA），不写时默认是 false，也就是默认
  不给应用返回 IPv6 地址。`ipv6` 默认开着，不等于应用默认就能用上 IPv6。
- TUN IPv6：隧道是否接管 IPv6 流量。

iPhone、iPad 与 Mac 上已经没有「IP Stack」设置，以前存过的选择也不再生效，配置里的
`ipv6`、`dns.ipv6` 与 `tun.inet6-address` 照写的运行。`ipv6` 为 true（默认）、
`tun.inet6-address` 没被写空（有默认值），并且连接时设备有 IPv6，隧道才接管 IPv6；
之后跟着当前网络，网络没有 IPv6 时暂停接管。连接时没有 IPv6 的，换到有 IPv6 的网络
后要重新连接。iPhone 与 iPad 配了 IPv4 回环地址、隧道只走 IPv4 时，隧道不声明 IPv6，
`tun.inet6-address` 也不生效，见[回环地址](#loopback-address)。

Apple TV 仍有 **更多 › IP Stack** 页，分两组，各自独立，默认都是「跟随配置」。只有
「跟随配置」完全按配置运行；其他选项只在运行时盖过配置，不会改配置文件。连接时改动，
Clash 会重新连接。

| 「IP 查询模式」 | `ipv6` | `dns.ipv6` |
| --- | --- | --- |
| 跟随配置 | 照配置 | 照配置 |
| 仅 IPv4 | 关 | 关 |
| IPv4 与 IPv6、优先 IPv4 | 开 | 照配置 |
| 优先 IPv6、仅 IPv6（谨慎使用） | 开 | 开 |

「IPv6」一组决定隧道是否接管 IPv6：

- 跟随配置：和 iPhone、iPad 与 Mac 一样，按上面的条件；
- 关：隧道不接管 IPv6；
- 自动：配置没写 `tun.inet6-address` 也用默认地址，跟着当前网络；
- 始终：不看网络，一直接管。

## 回环地址（loopback-address） {#loopback-address}

有些工具要通过「环回 VPN」连回本机上运行的服务：发往一个约定地址的连接，经 VPN
折回这台设备。侧载工具、自动化工具和本机上的开发服务常这样用，例如 SideStore、
[Swipt](https://swipt.io/zh-Hans/docs/setup/#环回-vpn) 都把 10.7.0.1 当作设备地址。`tun.loopback-address` 就是做这件事的。Clash 在 mihomo 上游的基础上
多做了几件事，下面分开说明。

### mihomo 上游 {#loopback-upstream}

- 发往这些地址的 TCP 连接，会折回发起它的本机。上游的各个协议栈（gvisor、system、
  mixed、mips）都只处理 TCP，UDP 照常转发。
- 上游不会为它单独加路由，这个地址要落在隧道的路由里。auto-route 的默认路由一般
  已经覆盖它；但写了 `route-address` 把范围收窄、`route-exclude-address` 盖住了它，
  或者本地有更具体的路由（比如局域网正好是 10.7.0.0/24）时，要自己处理。

### Clash（Apple 客户端） {#loopback-clash}

最小配置：

```yaml
tun:
  loopback-address:
    - 10.7.0.1
```

- TCP 和 UDP 都会折回本机。
- Clash 自动把每个 IPv4 回环地址按 /32 主机路由放进隧道，不用另写 `route-address`；
  IPv6 回环地址按 /128 放进去，前提是隧道声明了 IPv6。用作回环时，建议不要手写
  `route-address`。
- 保存后断开再重新连接。

**iPhone 与 iPad：只走 IPv4。**配了 IPv4 回环地址，又没开「HomeKit 兼容」、也没有
同时开 `tun.strict-route` 和「强制路由」时，隧道只走 IPv4（默认路由加回环地址的
/32），不声明 IPv6，`tun.inet6-address` 也不生效；需要连回本机的工具能直接找到设备。代价是这时整台设备的 IPv6 不可用：

- 走 fake-ip 的域名照常，只有 IPv6 的网站也能打开；
- fake-ip-filter 里的域名、redir-host 模式下的真实地址、直接写的 IPv6 地址：只有
  IPv6 的网站打不开，同时有 IPv4 的网站自动改走 IPv4；
- Clash 自己直连或经节点发出的 IPv6 连接不受影响。

开了「HomeKit 兼容」，或者 `strict-route` 和「强制路由」同时开着时，隧道照旧带
IPv6（配置开了 IPv6 时），没有上面那几条 IPv6 代价，但要在工具里手动填设备地址，
例如 10.7.0.1。只开「强制路由」不算。

iPhone 与 iPad 上配了 IPv4 回环地址时，配置里的 `dns.fake-ip-range6` 都不生效。

**iPhone 与 iPad：关掉「包括所有网络」。**它开着时，TCP 连不上本机正在监听的服务；
关掉才通。入口在 **更多 › 连接行为 › VPN**。有的模块会把这个开关盖成
打开，这时那一行会注明是哪个模块盖过了这里，先到[模块](/zh/guide/modules)页停用它。

**Mac 与 Apple TV：**只是多一条主机路由，其他照旧，没有只走 IPv4 的限制。Apple TV
没有「包括所有网络」这个开关。

以上适用于 iOS 与 iPadOS 1.0.14、macOS 1.0.16、tvOS 1.0.17 起的 Clash。

## 其他入站设置

本地代理端口、`allow-lan`、listeners 和外部控制器用于提供本地服务，按需设置即可。
外部控制器也可以直接在 App 的 **更多 › 客户端设置 › 外部控制器** 中开启，配合
[clash-cli](/zh/guide/clash-cli) 在终端里操控 Clash。
Linux 的 `routing-mark`、iptables、TPROXY 路由，以及用 `interface-name` 指定出口，在这里不适用。

其他字段可在[完整配置参考](/zh/guide/config/)中搜索。

## 版本说明 {#scope}

本文适用于 Clash 的 Apple 版本。部分设置随版本更新而变化，请以已安装版本提供的功能为准。

::: details 文档参考版本

更新于 2026-09-14，依据 Clash Core `5bca0bcb73cd6dcb2d276be31f3a149211388c6d`；
2026-10-10 补充 mihomo 1.19.32 的 `mips` 协议栈与 `congestion-controller`；
2026-10-22 补充 mihomo 1.19.33 的 `dns-mode`；2026-10-24 按 SDK v1.19.33-clash.3 更新 `loopback-address`；2026-10-29 按 v1.19.33-clash.4 补充隧道读包失败时的处理；
2026-11-07 按 SDK v1.19.33-clash.5（iOS 与 iPadOS 1.0.14、macOS 1.0.16、tvOS 1.0.17）改为只有一种协议栈，并更新 `loopback-address` 的路由与 iOS 上的 IPv6；
2026-11-08 在 `loopback-address` 一节补充 Swipt，并去掉「包括所有网络」开着时 UDP 的说法。
此参考版本不代表所有 App Store 版本均已包含相同功能。
字段名称可对照 [mihomo TUN 文档](https://wiki.metacubex.one/config/inbound/tun/)。

:::
