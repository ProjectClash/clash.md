---
title: Tailscale
---

# Tailscale

这类出站让 Clash 以一台设备的身份加入你的 Tailnet，不填写普通代理的 `server` 和 `port`。添加后还需满足控制端的设备授权和路由许可。

## 完整示例 {#example}

下面是一份可用的最小配置：一个 Tailscale 节点、一个代理组，再加两条规则，把 Tailnet 的域名和地址交给它。替换 `auth-key` 即可；`ts`、`TAILNET` 可以改名，但引用要同步。

```yaml
proxies:
  - name: ts
    type: tailscale
    hostname: my-iphone
    auth-key: YOUR_TAILSCALE_AUTH_KEY # 不写时用登录链接加入，见下文
    udp: true
    # control-url: https://your-control-server # 使用自建控制服务器时填写

proxy-groups:
  - name: TAILNET
    type: select
    proxies: [ts]

rules:
  - DOMAIN-SUFFIX,ts.net,TAILNET
  - IP-CIDR,100.64.0.0/10,TAILNET,no-resolve
  - MATCH,DIRECT
```

- 两条规则都建议写上。只写 `IP-CIDR` 时，带着域名来的连接（比如 MagicDNS 名字）不会进这个节点。
- `MATCH,DIRECT` 只是示例里的兜底。合并进已有配置时，把前两条规则放在你原有规则的前面。

## 加入 Tailnet {#join}

- `auth-key` 在 Tailscale 后台的 **Settings › Keys** 生成。
- 后台开启了设备审批时，这台设备要先在后台批准，才能收发流量。
- 配置加载后，这个节点不会马上上线：第一条连接走到它，或第一次用它解析域名时，Clash
  才去加入 Tailnet。加入要十来秒，这期间头一两次访问可能超时，重试即可。
- 配好后，先通过它访问一次 Tailnet 里的 100.x 地址，再到后台的设备列表里找它。

### 不填 auth-key {#login-link}

不填 `auth-key` 也能加入。第一次有连接走到这个节点时，日志里会打出一行登录链接：

```text
[Tailscale](ts) To start this tsnet server, restart with TS_AUTHKEY set, or go to: https://login.tailscale.com/a/…
```

使用自建控制服务器时，链接是 `<control-url>/register/…`。在浏览器里打开链接登录，十来秒后
节点会自己连上，不用重启。登录完成前，经它的连接都会超时；登录后身份保存在 `state-dir`
里，之后不再要求登录。

配置里的 `log-level` 要是 `info`，日志里才看得到这行链接；设成 `warning` 或更高时看不到。

## 设备身份保存在哪里 {#state-dir}

这台设备在 Tailnet 里的身份保存在 `state-dir` 指定的文件夹里，重启后沿用同一个身份。
不写时默认是配置目录下的 `tailscale` 文件夹；自己填写时，写相对路径即可，会放在配置目录里。

开启 `ephemeral` 时，这台设备以临时设备加入，离线后由 Tailscale 自动从 Tailnet 移除。

## 用 Tailscale 解析域名 {#dns}

DNS 服务器可以写成 `tailscale://节点名`，或简写为 `ts://节点名`，表示通过这个
Tailscale 节点解析。节点名就是 `proxies` 里的 `name`；只写 `tailscale://` 而不带
节点名，会报错 `missing Tailscale proxy name`。

### 访问 MagicDNS 名字 {#magicdns}

MagicDNS 要用全名 `机器名.<tailnet>.ts.net`，只写机器名的短名解析不了。按 DNS 模式：

- **fake-ip（推荐）**：有上面那条 `DOMAIN-SUFFIX,ts.net` 规则就够了，不用写
  `nameserver-policy`，也不用加进 `fake-ip-filter`；节点会自己用 Tailnet 的 DNS 解析。
- **redir-host**：还要加一条 `nameserver-policy`：

  ```yaml
  dns:
    nameserver-policy:
      "+.ts.net": tailscale://ts
  ```

- **fake-ip 的另一种写法**：把 `+.ts.net` 加进 `fake-ip-filter`，再写上面这条
  `nameserver-policy`，也能用。

不通的写法：fake-ip 下只写 `nameserver-policy`，既没加进 `fake-ip-filter`，也没有
`ts.net` 的域名规则。这时连接会落到兜底规则直连，然后超时。

## 用出口节点访问公网 {#exit-node}

在节点上加 `exit-node`，再用规则把要出公网的流量交给这个节点（比如把 `MATCH` 指向
`TAILNET`），公网流量就会从 Tailnet 里的那台出口设备出去。`exit-node` 写机器名、
Tailnet 地址（100.x）或 MagicDNS 全名都可以：

```yaml
proxies:
  - name: ts
    type: tailscale
    hostname: my-iphone
    auth-key: YOUR_TAILSCALE_AUTH_KEY
    udp: true
    exit-node: 100.64.0.10
```

- 那台设备要在 Tailscale 里开启出口节点，并在后台获批。没开启或没获批时，配置照样能
  加载，日志里只有一条警告 `set exit node failed: … is not advertising an exit node`；
  Tailnet 内照常访问，经它访问公网会超时。
- 出口只在节点启动时设定一次。那台设备后来才开启或才获批时，要重新载入配置或重启 Clash。
- 经出口访问的域名由 Tailnet 的 DNS 解析，不走 Clash 的 DNS 设置。
- 出口节点不会把它自己所在的局域网转发给你，那是子网路由的功能。

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `hostname` | 这台设备在 Tailnet 中显示的名称。 |
| `auth-key` | 加入 Tailnet 用的授权密钥，在 Tailscale 后台的 **Settings › Keys** 生成；不填时用[登录链接](#login-link)加入。 |
| `control-url` | 使用自建控制服务器时填写，普通 Tailscale 可省略。 |
| `udp` | 是否让 UDP 流量也走这个节点。 |
| `accept-routes` | 是否接受 Tailnet 里发布的子网路由。 |
| `exit-node` | 出口节点：机器名、Tailnet 地址或 MagicDNS 全名，见[上文](#exit-node)。 |
| `exit-node-allow-lan-access` | 使用出口节点时，是否仍允许直接访问本地局域网。 |
| `state-dir` | 设备身份的保存目录，不写时为配置目录下的 `tailscale` 文件夹，见[上文](#state-dir)。 |
| `ephemeral` | 以临时设备加入，离线后由 Tailscale 自动移除。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/tailscale/).
