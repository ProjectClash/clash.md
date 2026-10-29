---
title: 隐私政策
description: Clash 不收集 App 或 VPN 数据。了解配置、凭据、日志、诊断、模块与 HTTPS 解密、iCloud 备份及用户主动指定的网络请求如何处理。
keywords:
  - Clash隐私政策
  - Clash VPN数据
  - iOS代理数据收集
  - VPN隐私政策
  - 本地配置隐私
jsonLd:
  "@context": https://schema.org
  "@type": WebPage
  name: Clash 隐私政策
  description: Clash 不收集 App 或 VPN 数据，并说明本地配置、诊断和用户主动指定请求的处理方式。
  url: https://clash.md/zh/privacy
  inLanguage: zh-CN
  about:
    - VPN 数据
    - 本地配置
    - 诊断信息
    - iCloud 备份
    - 模块
    - HTTPS 解密
  publisher:
    "@type": Organization
    name: OmniWide Media Limited
    email: legal@omniwide.media
---

# 隐私政策

**最后更新：2026 年 10 月 29 日**

本政策说明 Clash 在 iPhone、iPad、Mac 与 Apple TV 上如何处理信息，并在
下文单独说明官网访问。Clash 是运行在设备上的网络工具，不是代理服务；它
没有开发者运营的流量中转服务器或账户后台，只连接到**你**配置的服务。

Clash 的发行主体及本政策中的“我们”是指 **OmniWide Media Limited**。

## App 中我们收集什么

开发者不从 Clash App 收集任何数据。

Clash 没有账户系统、分析、遥测、广告 SDK、追踪 SDK、第三方崩溃报告器
或自动诊断上传器。App 的隐私清单声明不收集任何数据类型、不进行追踪，
也没有追踪域名。

按照 Apple 对 App 隐私的定义，只在设备上处理的信息不属于“收集”。
我们不会把 App 数据或 VPN 数据发送给自己，也不会发送给分析、广告或
数据经纪合作方。

## VPN 数据承诺

我们不收集或出售用户数据，不将其用于自身目的，也不向第三方披露。
Clash 只会在设备上处理提供你所请求功能所必需的网络流量。

由你配置的代理、DNS、配置地址、Provider 与测试服务，以及你添加的模块和其
脚本访问的服务，属于用户主动指定的外部服务；它们不是我们运营的服务，也不是由我们选择的数据接收方。

## 留在设备上的内容

- **配置文件**会按照你提供的内容逐字节保存，包括文件内含的凭据。文件
  受相应 Apple 平台的数据保护与 App 容器保护。
- **App 设置**保存在 App 容器内；本地代理共享凭据等敏感设置保存在设备
  钥匙串中。
- **连接与请求活动**是 App 显示的有限运行信息。实时与近期连接数据只在
  本机保存，不会由 Clash 上传。Clash 不记录网络流量正文。开启 HTTPS 解密后，
  匹配的 HTTPS 请求只在本机隧道内解密，交给你开启的模块改写，或交给其中的
  脚本处理；Clash 本身不保存、不上传解密后的内容。
- **日志与诊断**留在本机。Clash 没有自动上传器。
- **模块**：你添加的模块、模块设置，以及模块脚本按作者设计保存的数据，保存在
  App 容器内。
- **HTTPS 解密证书**在本机生成。iPhone 与 iPad 上私钥保存在 App 容器内，Mac 上
  保存在钥匙串中。证书和私钥不会上传，也不包含在 iCloud 备份中。

## 用户主动指定的网络连接

Clash 会为你配置或主动启动的功能建立网络连接：

- **配置中指定的配置地址、规则 Provider、代理 Provider、代理与 DNS 服务。**
  根据服务类型，它们可能收到你的 IP 地址、请求时间、认证信息、DNS
  查询、流量元数据，以及所选协议能够访问的内容。
- **资源更新。** 更新来源会显示在 App 的“资源”页面；默认地理数据库
  来源指向 GitHub 上 MetaCubeX 的 `meta-rules-dat` Release。
- **你主动启动的诊断。** 在提供相应功能的平台上，网络质量测试会连接
  Apple 的测量端点；STUN 测试连接你输入的服务器；延迟测试连接所选策略组
  配置的 URL。
- **已配置的后台更新。** 启用后，Clash 可在后台检查你配置的远程配置与
  资源，且仅用于你选择的更新目的。
- **你添加的模块。** Clash 会下载模块链接，以及模块中写明的脚本与资源文件，
  并按你的设置更新。你开启的模块中的脚本运行时可以自行发出网络请求，请求的
  目标与内容由模块作者决定。请只添加你信任的来源提供的模块。

这些外部服务适用其各自的条款与隐私政策。我们不控制它们，也不会收到
它们处理的数据。

Clash 不会为了开发者自身利益在后台联系任何服务。远程配置与资源的自动
更新只会在你配置或启用后运行。

## iCloud 备份与同步

在支持 iCloud 备份的平台上，如果你明确创建备份，文件会按照 Apple 的条款保存在
**你的** iCloud 账户中。备份包含配置及其中可能含有的凭据、设置、模块和模块脚本
保存的数据，不包含 HTTPS 解密证书。

在 iPhone、iPad 或 Mac 上开启“同步配置到 Apple TV”后，该设备会把一份副本上传到
**你的** iCloud 账户的私有数据库，供登录同一账户的 Apple TV 恢复；Apple TV 只读取，
不会写回。关闭这一项时，这份副本会一并删除。

我们无法访问这些备份或同步数据。

## 保留、删除与隐私选择

我们不收集数据，也不提供账户，因此没有服务器端用户档案或由开发者持有
的个人数据需要保留或删除。

- 本机配置、设置、凭据、日志与诊断会保留在设备上，直到你删除对应项目或
  卸载 Clash。
- 在提供“清除全部本机数据”的平台上，该操作会删除本机的全部配置、模块、证书、
  设置与已保存的凭据，但不会删除 iCloud 备份；之前安装的证书将不再使用。
- 不再需要 HTTPS 解密时，可以在系统设置中关闭对证书的信任，或删除对应的描述
  文件。
- 当前 iCloud 备份可以在 Clash 的“备份与恢复”页面中删除。

## 官网访问

`clash.md` 是静态网站。我们没有为官网加入账户系统、分析、广告、追踪脚本
或营销 Cookie。网站托管于 Cloudflare Pages；Cloudflare 会为传送和保护网站处理
访客的 IP 地址等请求信息，适用 [Cloudflare 隐私政策](https://www.cloudflare.com/privacypolicy/)。

Cloudflare 的托管日志不是 Clash App 或 VPN 数据。我们不会把官网访问与
App 中的配置、流量或设备活动关联。

## 开源与可验证性

Clash [客户端](https://github.com/ProjectClash/Clash-Client)与
[Clash Core](https://github.com/ProjectClash/Clash)均已完整开源。任何人都可
检查客户端与内核实际执行的数据处理逻辑，而不必只依赖本政策中的承诺。

## 儿童

Clash 是通用网络工具，并非面向儿童。我们不会有意收集任何人的个人数据，
包括儿童的数据。

## 政策变更

当 App、官网托管方式或数据处理方式发生变化时，我们可能更新本政策。当前
版本及更新日期会发布在本网址；重大变更也会在 App 或版本信息中说明。

## 联系方式

如需就本隐私政策或任何隐私相关事项联系我们，请发送电子邮件至
[legal@omniwide.media](mailto:legal@omniwide.media)，或邮寄至：
**OmniWide Media Limited, 128 City Road, London, United Kingdom,
EC1V 2NX**。

非保密问题可以提交到
[Clash 客户端 Issue](https://github.com/ProjectClash/Clash-Client/issues)。
请勿在公开 Issue 中发布配置地址、凭据、服务器地址、私密日志或其他
敏感信息。
