---
title: clash-cli 命令行工具
description: Clash Mac 版内置 clash-cli。在终端里查看状态、切换节点、查看连接、检查规则走向，还能从 Mac 操控 iPhone、iPad 与 Apple TV 上的 Clash，或交给 AI 助手代劳。
keywords:
  - clash-cli
  - Clash命令行
  - Clash终端
  - Clash外部控制器
  - Clash AI助手
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: 如何在 Mac 终端用 clash-cli 操控 Clash
  description: 打开外部控制器、安装 clash-cli，再粘贴终端命令，就能在终端里查看和操控 Clash。
  inLanguage: zh-CN
  step:
    - "@type": HowToStep
      position: 1
      name: 打开外部控制器
      text: 在 Clash 的“更多 › 客户端设置 › 外部控制器”中选择“本机”。
    - "@type": HowToStep
      position: 2
      name: 安装 clash-cli
      text: 复制同一页“命令行工具”中的安装命令，粘贴到终端运行一次。
    - "@type": HowToStep
      position: 3
      name: 开始使用
      text: 复制“终端命令”，粘贴到终端运行。
---

# clash-cli 命令行工具

不用打开窗口，在终端里就能掌握 Clash：看状态、换节点、查连接，确认一个网址会走
哪条规则。坐在 Mac 前，也能操控家里 iPhone、iPad 和 Apple TV 上的 Clash；还可以把
这些操作交给脚本或 AI 助手。

clash-cli 内置在 Clash Mac 版中，随 App 一起更新，不需要另外下载。

## 三步开始 {#get-started}

1. **打开外部控制器**：在 Clash 中进入 **更多 › 客户端设置 › 外部控制器**，选择
   **本机**。
2. **安装 clash-cli**：在同一页的“命令行工具”中，点“安装命令”右侧的 **复制**，
   粘贴到“终端”运行一次。之后在任何目录都能使用 `clash-cli`，App 更新后也不需要
   重装。
3. **开始使用**：点“终端命令”右侧的 **复制**，粘贴到终端运行。这行命令已经带好
   地址和密钥，会直接显示当前模式、各策略组选中的节点和实时流量；之后在同一个终端
   窗口里，直接输入 `clash-cli` 命令即可。

地址、证书指纹和密钥旁边也都有复制按钮，需要单独使用时直接复制。外部控制器在
Clash 连接后生效，使用时请保持连接。

## 操控 iPhone、iPad、Apple TV 与其他 Mac {#other-devices}

在要被操控的设备上打开外部控制器，选择 **局域网**。iPhone、iPad 与 Mac 在
**更多 › 客户端设置 › 外部控制器**，Apple TV 在 **更多 › 外部控制器**。

- **iPhone、iPad 与 Mac**：点“终端命令”右侧的 **复制**，粘贴到你正在使用的 Mac 的
  终端运行。命令里已经带好地址、密钥和证书指纹。开启“通用剪贴板”时，在 iPhone 或
  iPad 上复制后可以直接在 Mac 上粘贴。
- **Apple TV**：对照电视屏幕上的地址和密钥，在 Mac 的终端输入，例如：

  ```sh
  export CLASH_API=https://192.168.1.20:9443 CLASH_SECRET=<电视上的密钥>
  clash-cli status
  ```

  第一次连接时，终端会显示电视的证书指纹。确认与屏幕上的一致后输入 `y`，之后会
  自动记住。

两台设备需要连在同一个局域网。iPhone 或 iPad 锁屏后可能暂停无线网络，远程操控时
请让设备保持亮屏或接上电源。

## 命令参考 {#commands}

下面是 clash-cli 的全部命令。`<…>` 是必填项，`[…]` 可以省略。在终端里运行
`clash-cli help` 也能随时查看。

### 状态与模式 {#status}

| 命令 | 说明 |
| --- | --- |
| `clash-cli status` | 一屏看全：Clash 版本、出站模式、内存、实时流量、连接数，以及每个策略组当前选中的节点 |
| `clash-cli mode` | 查看当前出站模式 |
| `clash-cli mode rule\|global\|direct` | 切换到规则、全局或直连模式 |
| `clash-cli configs` | 查看正在运行的设置，例如端口、TUN 与 DNS |
| `clash-cli version` | 查看 clash-cli 版本；连上设备时还会显示设备上的 Clash 版本 |

### 策略组与节点 {#proxies}

| 命令 | 说明 |
| --- | --- |
| `clash-cli proxies` | 列出全部策略组和其中的节点 |
| `clash-cli proxies <策略组>` | 只看这个策略组：类型、当前选择和全部成员 |
| `clash-cli proxy get <策略组>` | 这个策略组当前选中的节点，以及可选的成员 |
| `clash-cli proxy set <策略组> <节点>` | 切换节点。可以选组内任意成员，包括其中的策略组或 `DIRECT` |
| `clash-cli group unfix <策略组>` | 取消手动固定的选择，让自动测速组重新自己挑 |

节点名要与 App 中显示的完全一致，包括 emoji 和空格；名字里有空格时请加引号，
例如 `clash-cli proxy set PROXY "香港 01"`。

### 测速 {#latency}

| 命令 | 说明 |
| --- | --- |
| `clash-cli test <节点> [测试网址] [超时毫秒]` | 测一个节点的延迟 |
| `clash-cli grouptest <策略组> [测试网址] [超时毫秒]` | 逐个测这个策略组里每个成员的延迟 |
| `clash-cli group test <策略组> [测试网址] [超时毫秒]` | 按策略组自己的方式测速 |
| `clash-cli provider test <节点集>` | 对一个节点集做一次健康检查 |

测试网址默认是 `https://www.gstatic.com/generate_204`，超时默认 5000 毫秒。
`test` 和 `grouptest` 只测速，不改变任何选择；`group test` 会先取消自动测速组
（URLTest、Fallback）的固定选择，只想看延迟时请用 `grouptest`。

### 连接 {#connections}

| 命令 | 说明 |
| --- | --- |
| `clash-cli connections [条数]` | 活跃连接：目标、经过的策略组与节点、命中的规则、上传和下载量。默认显示前 20 条 |
| `clash-cli connections -f` | 持续显示连接变化：`+` 是新连接，`-` 是已关闭的连接 |
| `clash-cli conn close <连接 ID>` | 关闭一条连接，ID 见 `connections` 的输出；找不到这条连接时会提示 |
| `clash-cli conn close all` | 关闭全部连接；正在进行的下载和 SSH 会被打断 |

### 规则 {#rules}

| 命令 | 说明 |
| --- | --- |
| `clash-cli rules [条数]` | 列出规则，默认前 10 条，写 `0` 显示全部 |
| `clash-cli rule match <网址\|域名\|IP> [条件]` | 检查一条连接会命中哪条规则、走哪个策略组和节点，见下一节 |

### 这个网址会走哪条规则？ {#rule-match}

```sh
clash-cli rule match https://example.com
clash-cli rule match 1.1.1.1 port=53 network=udp
clash-cli rule match example.com --resolve
```

clash-cli 会告诉你命中的规则和将要使用的策略组与节点，不会真的建立连接，也不会
改动任何设置。排查“为什么这个网站没走代理”时，先用它看一眼。

可以补充这些条件，让结果更接近真实情况：

| 条件 | 说明 |
| --- | --- |
| `port=端口` | 目标端口；不写时按 443 计算 |
| `network=tcp\|udp` | 连接类型 |
| `src=IP` | 来源地址；不写时按本机计算 |
| `process=名称` | 发起连接的程序名称，只在 Mac 上有效 |
| `--resolve` | 先解析域名，让按 IP 判断的规则也参与匹配；不加时这类规则会标为“未定” |

如果某条规则需要的信息你没有提供，结果会标为“未定”。显示的节点是各策略组当前
的选择，之后可能随测速或手动切换而改变。

### DNS {#dns}

| 命令 | 说明 |
| --- | --- |
| `clash-cli dns query <域名> [记录类型]` | 通过 Clash 的 DNS 查询域名，逐条列出名称、类型、TTL 和结果。记录类型默认 A，也可以写 AAAA、CNAME 等 |
| `clash-cli dns explain <域名> [记录类型]` | 说明这次查询会交给哪组 DNS 服务器、有哪些候选服务器，以及是否命中缓存 |
| `clash-cli flush dns` | 清空 DNS 缓存 |
| `clash-cli flush fakeip` | 清空 Fake IP 记录；之后部分应用可能需要重新连接 |

### 节点集与规则集 {#providers}

| 命令 | 说明 |
| --- | --- |
| `clash-cli provider list` | 列出配置里的节点集和规则集 |
| `clash-cli provider update proxy <名称>` | 重新下载这个节点集 |
| `clash-cli provider update rule <名称>` | 重新下载这个规则集 |

### 流量与日志 {#traffic-logs}

| 命令 | 说明 |
| --- | --- |
| `clash-cli traffic [秒数]` | 实时上传和下载速度，以及累计流量，每秒一行 |
| `clash-cli logs [秒数] [级别]` | 实时日志，级别可选 `debug`、`info`（默认）、`warning`、`error` |

`traffic`、`logs` 和 `connections -f` 会持续输出：写了秒数就显示这么久；不写时
一直显示，按 Ctrl-C 结束；加 `-f` 也是一直显示。

### 记住的设备 {#devices}

| 命令 | 说明 |
| --- | --- |
| `clash-cli forget <地址:端口>` | 忘记这台设备的证书指纹，也可以直接写设备的 `https://` 地址。下次连接时会重新请你确认。这条命令不会连接任何设备 |

### 不在 clash-cli 里做的事 {#not-provided}

切换、更新和检查配置请在 Clash App 里完成。`clash-cli reload` 和
`clash-cli check` 会提示你到 App 中操作。

### 通用选项 {#options}

每个选项都可以写在命令前，也可以用环境变量设置一次，之后不用重复输入。

| 选项 | 环境变量 | 说明 |
| --- | --- | --- |
| `-u`, `--url <地址>` | `CLASH_API` | 要连接的设备，默认 `http://127.0.0.1:9090`（这台 Mac）。其他设备填外部控制器页显示的地址 |
| `--secret <密钥>` | `CLASH_SECRET` | 外部控制器页上的密钥 |
| `--secret-stdin` | — | 从标准输入读取密钥，避免密钥留在终端历史里 |
| `--fingerprint <指纹>` | `CLASH_FINGERPRINT` | 其他设备的证书指纹；用它连上一次后就会记住，之后不用再带。不写时，第一次连接会请你确认并记住 |
| `--json` | — | 以 JSON 输出结果，方便脚本读取 |
| `--timeout <时长>` | `CLASH_TIMEOUT` | 每次请求的超时，默认 8 秒，可写 `8`、`8s` 或 `500ms` |
| `-h`, `--help` | — | 显示帮助 |

## 交给 AI 助手与脚本 {#ai}

运行 `clash-cli skill`，可以得到一份现成的技能说明，交给你的 AI 助手安装后，就能用
自然语言让它查看状态、切换节点或排查规则：

```sh
clash-cli skill > SKILL.md
```

在 iPhone 和 iPad 上，选择“本机”后，同一台设备上的 AI 助手也可以通过外部控制器
操控 Clash。

写脚本时，在命令后加 `--json`。每条命令都会输出一行 JSON，成功时 `ok` 为 `true`
并带上 `data`，失败时为 `false` 并带上 `error`；持续输出的命令每行一条。脚本也可以
根据退出码判断结果：

| 退出码 | 含义 |
| --- | --- |
| 0 | 成功 |
| 1 | Clash 返回了错误 |
| 2 | 命令或参数写法有误 |
| 3 | 连不上设备 |
| 4 | 密钥不对，或已经换了新密钥 |
| 5 | 连到的不是 Clash，或这条命令不在 clash-cli 中提供 |
| 6 | 证书指纹不一致，或还没有确认 |

在脚本中运行 `traffic`、`logs` 这类持续输出的命令时，不写秒数会默认读 3 秒后结束。
在脚本中连接其他设备时，clash-cli 不会弹出确认。请使用外部控制器页复制的终端
命令（已带指纹），或先在终端里手动连接一次。

## 安全 {#security}

- **拿到密钥的人可以完全控制 Clash**，包括局域网共享和出站模式。请像对待密码一样
  保管它。
- 怀疑密钥外泄时，在外部控制器页点 **生成新密钥**，旧密钥立即失效；正在用旧密钥持续输出的
  命令也会停下，并提示密钥已更换。生成新密钥不会改变证书指纹。
- 怀疑证书外泄时，在局域网档的“证书指纹”一行点 **生成新证书**。之后各台 Mac 上的
  clash-cli 会提示指纹已变化，并且不会发送密钥。
- 选择“局域网”时，连接全程加密，并且只接受同一局域网内的设备。
- 连接其他设备前，clash-cli 会先核对证书指纹，确认无误才发送密钥。指纹发生变化时，
  它会停下来提醒你。这时在设备的外部控制器页重新复制“终端命令”（已带新指纹）运行一次，
  或执行 `clash-cli forget <地址:端口>` 后重新连接并确认新指纹。
- 不再需要时，把外部控制器改回 **使用配置**。

## 常见问题 {#faq}

### 提示连接失败？

确认 Clash 已经连接，外部控制器选的是“本机”或“局域网”。操控其他设备时，再确认
Mac 与设备在同一个局域网，地址和端口与设备页面一致。

### 提示密钥不对？

可能复制有误，或者已经生成过新密钥。回到外部控制器页重新复制即可。

### 提示连到的不是 Clash？

这个地址和端口上运行的是其他程序。检查地址与端口，或在外部控制器页换一个端口。

### 外部控制器页显示“这个版本没有附带 clash-cli”？

请把 Clash Mac 版更新到最新版本。
