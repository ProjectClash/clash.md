---
title: iPhone 与 iPad 使用指南
description: 在 iPhone 与 iPad 上添加和切换 Clash Profile、选择模式与线路、连接、查看 Connections，并确认新设置何时生效。
keywords:
  - Clash iPhone使用指南
  - Clash iPad使用指南
  - Clash添加Profile
  - Clash选择节点
  - Clash Connections
pageClass: clash-device-guide-page
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: 如何在 iPhone 与 iPad 上使用 Clash
  description: 从添加 Profile、选择模式和线路，到连接、查看活动连接并确认设置生效。
  inLanguage: zh-CN
  step:
    - "@type": HowToStep
      position: 1
      name: 添加 Profile
      text: 从配置链接、二维码或配置文件添加配置，也可以用“创建配置”向导挑选节点和规则。
    - "@type": HowToStep
      position: 2
      name: 选择模式与线路
      text: 在首页选择出站模式，并在策略组中选择线路。
    - "@type": HowToStep
      position: 3
      name: 连接
      text: 从首页连接，并允许系统添加 VPN 配置。
    - "@type": HowToStep
      position: 4
      name: 查看 Connections
      text: 查看新连接实际命中的规则、出站目标和代理链。
---

# iPhone 与 iPad 使用指南

从第一次添加 Profile，到切换线路、查看连接和确认设置生效，这一页只讲
iPhone 与 iPad 上的操作。

<nav class="everyday-task-grid" aria-label="iPhone 与 iPad 使用主题">
  <a href="#管理-profile"><strong>管理 Profile</strong><span>添加、切换、更新与移除</span></a>
  <a href="#选择出站模式"><strong>选择出站模式</strong><span>Rule、Global 与 Direct</span></a>
  <a href="#选择线路"><strong>选择线路</strong><span>策略组、节点与延迟</span></a>
  <a href="#连接与快捷操作"><strong>连接与快捷操作</strong><span>首页、控制中心与快捷指令</span></a>
  <a href="#查看活动连接"><strong>查看活动连接</strong><span>规则、代理链与实时流量</span></a>
  <a href="#确认设置已经生效"><strong>确认设置已经生效</strong><span>检查真正的新连接</span></a>
</nav>

## 管理 Profile

### 进入配置列表

- iPhone：在首页左上角点当前配置名，进入“配置中心（Profile Center）”的配置库。
- iPad：常规宽度下从侧边栏进入“配置（Profiles）”；窄幅分屏与 iPhone 路径
  相同。

配置库里的“添加配置（Add Profile）”卡片有三种方式：在链接框里粘贴配置链接，
“扫描二维码（Scan QR Code）”（也可以从照片中选择二维码），或者“导入文件
（Import File）”。想用已有的节点和规则组合出一份新配置，点右上角 ⊕ 的“创建配置
（Create Profile）”，依次选择节点和规则。

点配置行即可切换。当前 Profile 显示勾选，切换完成后首页顶部名称同步更新。长按
配置行可以更新、复制链接或删除。

点行尾的 ⓘ 进入配置页：

- 最上面“配置管理”分区的“名称”可以直接修改，离开输入框就会保存。
- “配置覆写”里可以选择规则方案，添加自定义规则和覆写脚本。
- 下面按全局配置、DNS、入站、代理组、路由规则等分区，列出这份配置的全部设置。
- 最下面是“编辑源码”“检查配置”“存成规则方案”“复制配置”和“导出”。配置大到
  不能编辑时，“编辑源码”会换成“查看源码”：可以按大纲跳转、查找和复制，但不能修改。

::: tip Profile 可能包含凭据
Profile 地址、配置文件与备份可能包含服务器凭据。公开求助时，不要贴出真实
地址、用户名、密码、密钥或未脱敏日志。
:::

## 选择出站模式

在首页“出站模式（Outbound Mode）”卡片中选择：

| 模式 | 作用 |
|---|---|
| 规则（Rule） | 按当前 Profile 的规则，为每条连接决定直连、代理或拒绝 |
| 全局（Global） | 将流量交给全局代理组及其中选中的线路 |
| 直连（Direct） | 不经过代理，直接连接目标 |

日常使用通常选择 Rule。不同连接可能命中不同策略组，因此 Rule 模式下不存在一个
代表全部流量的“唯一当前节点”。Direct 不使用代理，节点页面不显示策略组与节点
是正常状态。

## 选择线路

进入“代理（Proxies）”，找到负责这类流量的策略组，再在组内选择节点。当前节点
使用选中背景和左侧强调线表示；节点卡片会显示延迟、失败或超时状态。

连接后可以使用“全部测速（Test All）”比较当前网络下的响应速度；先搜索再测速，
只测搜索结果。分组标题上的“跳到当前节点”可以直接定位到正在使用的节点。延迟
更低不等于任何网络和任何时间下都拥有更高吞吐，实际使用体验仍取决于线路与网络环境。

测速失败的节点显示红点。点节点的 ⓘ 打开“节点详情”，在“延迟测试”里可以看到内核
给出的失败原因，例如 MTU 超出范围，而不只是超时。

iPad 在宽屏下使用多列网格，操作方式与 iPhone 相同。

## 连接与快捷操作

回到首页连接。第一次连接时，按照系统提示允许 Clash 添加 VPN 配置。连接成功后，
首页会显示状态、持续时间和实时流量。

iPhone 与 iPad 还可以通过控制中心和快捷指令执行常用操作；是否自动连接则由你
设置的按需连接条件决定。

## 查看活动连接

- iPhone：`工具（Utilities）` → `本次连接（This Connection）` → `活动（Activity）`。
- iPad：常规宽度下从侧边栏进入“活动”；窄幅分屏使用与 iPhone 相同的路径。

活动页顶部可以切换“连接”“请求”和“日志”。“连接”会显示目标、匹配规则、出站目标、代理链与传输量。可以搜索、排序、
查看详情、关闭单条连接，或使用“全部关闭（Close All）”结束当前活动连接。发起
连接的 App 仍可能按自身逻辑自动重连。

## 确认设置已经生效

依次检查：

1. 配置列表的勾选和首页名称是否已经切到目标 Profile。
2. Outbound Mode 的选择标记是否位于目标模式。
3. 目标策略组中的节点是否显示选中样式。
4. 确保目标 App 建立一条**新连接**，再到活动页的“连接”里查看实际命中的规则和
   代理链。

单纯刷新网页可能继续复用 HTTP/2、HTTP/3 或 QUIC。需要确定时，先在
“连接”里关闭对应旧连接，再让目标 App 重新联网。

首页的“出口 IP（External IP）”卡片可以辅助判断，但它只说明这一次出口查询
走了哪里；在 Rule 模式下，不能代表所有目标都使用同一线路。

## 更改设置后，已有连接怎么办？

- **切换 Profile**：成功后通常会结束当前活动连接；仍需通信的 App 自行建立
  新连接后使用新 Profile。Tunnel 可以保持 Connected。
- **切换 Rule、Global 与 Direct**：已有连接不会断开，继续走原来的路线；新连接
  使用新模式。
- **切换到 Global 时**：如果 App 还需要在 `GLOBAL` 组里替你选中一个节点，这一步
  算作更换节点；保持默认开启的“切换节点时断开连接”时，现有连接会结束。
- **手动更换节点**：开启“切换节点时断开连接”时会结束现有连接；关闭该设置后，
  旧连接不会被主动清理。这个设置在“更多 › 应用设置 › 客户端设置”中。
- **停止并重新连接 Tunnel**：全部连接中断，新 Tunnel 中的连接使用当前设置。

重要下载、通话或游戏进行中，避免切换 Profile、节点或 Tunnel。需要立刻让流量
使用新设置时，可以在“连接”里使用“全部关闭（Close All）”，再让目标 App 建立新连接。
