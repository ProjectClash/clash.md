---
title: Apple TV 使用指南
description: 在 Apple TV 上添加和切换 Clash Profile、选择模式与节点、连接、查看 Connections，并确认新设置何时生效。
keywords:
  - Clash Apple TV使用指南
  - Clash tvOS添加Profile
  - Clash Apple TV选择节点
  - Clash tvOS Connections
pageClass: clash-device-guide-page
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: 如何在 Apple TV 上使用 Clash
  description: 从添加 Profile、选择模式和节点，到连接、查看活动连接并确认设置生效。
  inLanguage: zh-CN
  step:
    - "@type": HowToStep
      position: 1
      name: 添加 Profile
      text: 使用 HTTP 或 HTTPS Profile 地址添加配置。
    - "@type": HowToStep
      position: 2
      name: 选择模式与节点
      text: 从首页的 Using 区域选择出站模式，并在节点页选择线路。
    - "@type": HowToStep
      position: 3
      name: 连接
      text: 从首页启动 Tunnel。
    - "@type": HowToStep
      position: 4
      name: 查看 Connections
      text: 查看正在经过 Tunnel 的代理、直连与已拒绝连接。
---

# Apple TV 使用指南

从添加 Profile 到遥控器选节点、查看实时连接，这一页只讲 Apple TV 上的操作。

<nav class="everyday-task-grid" aria-label="Apple TV 使用主题">
  <a href="#管理-profile"><strong>管理 Profile</strong><span>地址添加、iCloud 恢复与更新</span></a>
  <a href="#选择出站模式"><strong>选择出站模式</strong><span>Rule、Global 与 Direct</span></a>
  <a href="#选择节点"><strong>选择节点</strong><span>策略组、焦点与当前线路</span></a>
  <a href="#连接-tunnel"><strong>连接 Tunnel</strong><span>从首页开始或停止</span></a>
  <a href="#查看活动连接"><strong>查看活动连接</strong><span>代理、直连与已拒绝</span></a>
  <a href="#确认设置已经生效"><strong>确认设置已经生效</strong><span>检查真正的新连接</span></a>
</nav>

## 管理 Profile

从首页 `Using` 区域选择当前 Profile 名称，进入配置列表。有两种添加方式：

- **添加配置（Add profile）**：输入 HTTP 或 HTTPS Profile 地址。可以用遥控器
  输入，也可以等 iPhone 弹出键盘，在手机上输入或粘贴。
- **从 iCloud 恢复（Restore from iCloud）**：恢复 iPhone、iPad 或 Mac 同步过来的配置。
  先在那台设备上打开 Clash 的“备份与恢复”，开启“同步配置到 Apple TV”；
  Apple TV 需要登录 iCloud。有多台设备时，先选择从哪台恢复。恢复后的配置会跟着
  那台设备保持最新，Apple TV 不会写回任何内容；引用了本地资源文件的配置会被跳过。
  还没有配置时，欢迎页上也有这个入口。

Apple TV 不提供配置文件、粘贴 YAML、二维码或空白配置入口：tvOS 只保证很小的
本地存储空间，文件随时可能被系统清掉，地址则不受影响。

选择一个配置打开详情，操作按状态不同：

- 当前 Profile 显示 `In use`，提供“脚本（Script）”“规则（Rules）”“立即更新
  （Update now）”“自动更新（Auto update）”“编辑（Edit）”和“移除（Remove）”。
- 非当前 Profile 没有“立即更新”，多一个“使用这个配置（Use this profile）”。
- 从 iCloud 恢复的配置没有地址，因此没有脚本、规则和自动更新。

各项的作用：

- **编辑**：修改名称和地址。改地址并保存后会立即下载新地址，旧地址下载的内容
  不再使用。
- **规则**：在“默认配置”“懒人配置”和“配置自带规则”之间选择。前两种只使用这条
  地址里的节点，“配置自带规则”按原样运行整份配置。当前配置会立即重新获取，其他
  配置在下次使用时生效。
- **脚本**：填写覆写脚本的地址。每次拉取配置后，在应用规则之后运行这个脚本；
  留空则按原样运行。
- **自动更新**：选择手动，或每隔若干小时。超过间隔后，打开 Clash 时会拉取，
  tvOS 允许时也会在后台拉取；间隔只是最早可能更新的时间，不保证准时。

::: tip Profile 可能包含凭据
Profile 地址可能包含服务器凭据。公开求助时，不要贴出真实地址、用户名、密码、
密钥或未脱敏日志。
:::

## 选择出站模式

从首页 `Using` 区域进入出站模式页面：

| 模式 | 作用 |
|---|---|
| 规则（Rule） | 按当前 Profile 的规则，为每条连接决定直连、代理或拒绝 |
| 全局（Global） | 将流量交给全局代理组及其中选中的线路 |
| 直连（Direct） | 不经过代理，直接连接目标 |

选择后以移动后的选择标记为准；页面还会显示 `In force` 或
`Currently in force`。Global 缺少可用代理时，Clash 会保留原模式并说明原因。

Direct 不使用代理，因此节点页不显示策略组和节点是正常状态。切回 Rule 或
Global 后，相应策略组会重新出现。

## 选择节点

从首页选择“节点（Node）”，或进入“工具（Utilities）”→“节点（Nodes）”。
使用遥控器在左侧浏览策略组，再在右侧网格选择节点。当前节点显示
“使用中（In use）”。

页头的“全部测速（Test all）”会测试当前策略组，节点上显示的是最近一次的结果。
手动固定过节点的 url-test 组，可以选择“取消固定（Unfix）”交回给组自动选择。
load-balance 与 relay 组没有可手动选择的成员，页面会说明原因。

Rule 模式下，不同连接可能命中不同策略组，因此不存在一个代表全部流量的
“唯一当前节点”。

## 连接 Tunnel

回到首页启动 Tunnel。第一次连接时，按照系统提示允许 Clash 添加 VPN 配置。
连接后，首页显示当前状态、持续时间与实时流量；需要停止时从同一位置操作。

连接失败时，首页会出现“重装 VPN 配置（Reinstall VPN Profile）”：它会移除系统里的
Clash VPN 配置并重新添加，完成后再按“启动”。

## 查看活动连接

进入“工具（Utilities）”→“连接（Connections）”。可以按全部、代理、直连或
已拒绝过滤实时列表，查看正在经过 Tunnel 的目标与传输状态。

选择一条连接可以打开详情，查看代理链路、规则、目标、来源、网络、DNS 模式、
上传、下载、时长，以及连接是否仍在进行。

Apple TV 的 Connections 不能关闭单条连接，也没有 Close All。

## “更多”里的设置

顶栏的“更多（More）”集中了 Apple TV 上的设置与信息：

- **自动连接**：Apple TV 开机联网后自动连上，不用先打开 Clash。按“停止”不会关掉
  这一项，只会断开到下次按“启动”。
- **IP Stack**：IP 查询模式与 TUN 的 IPv6 档位，修改后会重新连接。
- **DNS**：查看配置里的 DNS 服务器，只读。
- **User-Agent**：下载配置时使用的身份，可选 Clash（默认）、FlClash 或 Clash Verge。
- **在本网络共享**：让同一网络里的其他设备把这台 Apple TV 当作 HTTP / SOCKS5
  代理，端口、用户名与密码按配置；只在连接时可用。
- **外部控制器**：“使用配置”或“局域网”。选择局域网后，Mac 上的
  [clash-cli](/zh/guide/clash-cli) 可以通过局域网控制这台 Apple TV；页面显示地址、
  密钥与证书指纹，也可以生成新的密钥和证书。修改后需要先停止再启动才会生效。
- **网速单位**：比特（Mbps）或字节（MB/s），影响首页的网速显示。
- **诊断**：连接状态、内存、已加载的内容和最近一次问题；其中的“外部资源”列出
  代理集合与规则集的状态。
- **日志**：只能在电视上查看。Apple TV 无法发送文件，所以不能导出。
- **Geo 数据**：正在使用的 GeoIP 与 GeoSite 数据。
- **版本**：App 版本与构建号，下面一行是内核版本。

## 确认设置已经生效

依次检查：

1. Profile 详情是否显示 `In use`。
2. Outbound Mode 是否显示目标模式已经 `In force`。
3. 目标策略组中的节点是否显示 `In use`。
4. 让目标 App 建立一条**新连接**，再到 Connections 查看它属于代理、直连还是
   已拒绝。

单纯刷新页面或重新播放内容，仍可能复用已有连接。Apple TV 不提供关闭连接操作；
需要让现有连接全部退出时，可以停止并重新连接 Tunnel。

Apple TV 当前没有 External IP 卡片。Rule 模式下本来也不能用一次出口 IP 查询
代表所有目标的实际路线。

## 更改设置后，已有连接怎么办？

- **切换 Profile**：Clash 会先断开 Tunnel，再使用所选 Profile 重新连接；全部
  现有连接都会中断。
- **切换模式或节点**：不会主动关闭已有连接。旧连接继续使用建立时的路线，新连接
  使用新模式或节点。
- **停止并重新连接 Tunnel**：全部连接中断，新 Tunnel 中的连接使用当前设置。

重要播放、通话或游戏进行中，避免切换 Profile 或 Tunnel。需要确定新设置时，
让目标 App 建立新连接，并在 Connections 中核对实际分类。
