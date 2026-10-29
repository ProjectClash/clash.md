---
title: Clash 与 Shadowrocket（小火箭）兼容吗？
description: 说明如何把 Shadowrocket 小火箭的远程配置、二维码、节点参数、规则与模块需求迁移到 Clash iOS。
head:
  - - link
    - rel: canonical
      href: https://clash.md/zh/guide/compatibility/shadowrocket
  - - link
    - rel: alternate
      hreflang: en-US
      href: https://clash.md/guide/compatibility/shadowrocket
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Shadowrocket 小火箭的远程配置可以用于 Clash 吗？","acceptedAnswer":{"@type":"Answer","text":"服务商通过 HTTPS 配置地址返回 mihomo YAML 时，可以直接添加到 Clash；必要时可切换下载身份。"}},{"@type":"Question","name":"如何在 Clash 中使用小火箭的 ss:// 等节点参数？","acceptedAnswer":{"@type":"Answer","text":"把单节点分享链接或 Base64 列表中的参数整理为 mihomo YAML，或在节点编辑器中添加；二维码可用于添加 HTTPS 配置地址。"}},{"@type":"Question","name":"如何迁移 Shadowrocket 的规则和模块？","acceptedAnswer":{"@type":"Answer","text":"模块可以直接粘贴链接导入 Clash 的模块；规则可以用 mihomo 配置与 Clash 规则重新建立。"}}]}'
---

# Clash 与 Shadowrocket（小火箭）兼容吗？

**远程配置、常见节点和模块都可以继续使用。**

如果你已经在 Shadowrocket 中使用某个服务商配置地址，并且服务商能够通过
该 HTTPS 地址返回 mihomo YAML，通常可以把同一个地址添加到 Clash。
节点协议与参数对应后，同一台服务器可以直接使用。

## 小火箭远程配置怎么导入 Clash？

1. 复制 Shadowrocket 中正在使用的配置地址。
2. 在 Clash 中添加远程配置。
3. 更新配置并检查节点与策略组。
4. 服务商提供多种格式时，可以在“下载身份”中切换为 FlClash 或 Clash Verge，获取 Clash / mihomo 输出。
5. 测试延迟，选择节点并连接。

## 如何使用分享链接和二维码？

二维码可以快速添加返回 mihomo YAML 的 HTTPS 配置地址。对于 `ss://`、
`ssr://`、`vmess://`、`vless://`、`trojan://`、`hysteria2://`、
`tuic://`、`anytls://` 等单节点链接，以及 Base64 节点列表，可以把其中
的服务器、端口、凭据、TLS 和传输参数整理为 mihomo YAML，或在节点编辑器
中添加。

## 小火箭的模块怎么导入？

小火箭模块（`.module` 或 `.sgmodule`）可以直接导入 Clash 的[模块](/zh/guide/modules)：
在配置库的“模块”里粘贴模块链接即可。规则、URL 与请求头 / 正文重写、本地映射、
`[MITM]` 主机名、脚本与面板都会生效；添加节点或策略组、DNS 脚本、规则脚本和更换证书的写法会跳过，模块详情的“已跳过”会写明原因。需要 HTTPS 解密的部分，在安装并信任证书后生效。

## 在 Clash 中重新建立的内容

- 使用 Clash 规则表达原有分流逻辑；
- 按自己的使用习惯设置节点分组与场景；
- 使用 Clash 的配置文件管理与备份方式保存设置。

这样既能继续使用原有节点，也能让配置结构与 Clash 的功能保持清晰一致。

## 使用单节点参数

可以在 Shadowrocket 中查看或导出节点参数，再根据服务器地址、端口、认证、
TLS 和传输参数在 Clash 的节点编辑器中重新添加，也可以先整理为 mihomo YAML。

## 可以继续使用同一台服务器吗？

只要节点使用 Clash 支持的协议，而且协议版本、传输、TLS、认证与其他参数一致，同一台服务器可以直接使用。

返回[兼容性总览](/zh/guide/compatibility)，或查看[全部支持的协议](/zh/guide/protocols)。
