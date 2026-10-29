---
title: Clash 与 Surge 兼容吗？
description: 说明如何把 Surge Profile 中的 Snell、Shadowsocks、Trojan、WireGuard 等节点与分流策略迁移到 Clash iOS。
head:
  - - link
    - rel: canonical
      href: https://clash.md/zh/guide/compatibility/surge
  - - link
    - rel: alternate
      hreflang: en-US
      href: https://clash.md/guide/compatibility/surge
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"如何把 Surge Profile 迁移到 Clash？","acceptedAnswer":{"@type":"Answer","text":"把节点与分流策略整理为 mihomo YAML，或添加服务商提供且返回 Clash / mihomo YAML 的配置地址；Surge 模块可以直接导入 Clash 的模块。"}},{"@type":"Question","name":"Clash 支持 Surge 的 Snell 节点吗？","acceptedAnswer":{"@type":"Answer","text":"支持。可以通过 mihomo YAML、兼容配置地址或节点编辑器添加 Snell 节点。"}}]}'
---

# Clash 与 Surge 兼容吗？

**共同的节点协议可以继续使用，分流策略可以整理为 mihomo YAML。**

[Surge 使用自己的 Profile 格式](https://manual.nssurge.com/overview/quick-start.html)，包含 `[General]`、`[Proxy]`、`[Proxy Group]`、`[Rule]` 等段落。迁移时可把节点与策略组整理为 mihomo YAML；Surge 模块可以直接导入 Clash 的模块。

## 哪些 Surge 节点可以继续使用？

Clash 支持 Snell，也支持双方共有的多种出站协议，例如：

- HTTP 与 SOCKS；
- Shadowsocks；
- VMess 与 Trojan；
- WireGuard；
- Snell。

Snell 通常通过 mihomo YAML、返回 mihomo YAML 的兼容配置地址或节点编辑器添加。
其他节点也可以根据服务器与协议参数在节点编辑器中重新添加。

## 怎么迁移？

1. 优先获取服务商提供且返回 mihomo / Clash YAML 的配置地址。
2. 如果只有 Surge Profile，提取需要的节点参数，在 Clash 中重新添加。
3. 将 Surge 的策略组和规则改写为 mihomo YAML。
4. 把 Surge 模块链接粘贴到 Clash 的“添加模块”，直接导入。

## Surge 模块怎么用？

Surge 模块（`.sgmodule`）可以直接导入 Clash 的[模块](/zh/guide/modules)：在配置库的
“模块”里粘贴模块链接即可。规则、URL 与请求头 / 正文重写、本地映射、`[MITM]` 主机名、
脚本、`[Host]` 与面板都会生效；`[Proxy]`、`[Proxy Group]`、DNS 脚本、规则脚本和更换证书的写法会跳过，模块详情的“已跳过”会写明原因。需要 HTTPS 解密的部分，在安装并信任证书后生效。

## 迁移时需要重新配置的内容

- 将 Surge Profile 的节点与策略整理为 mihomo YAML；
- 使用 Clash 规则表达原有分流逻辑；
- 按自己的使用习惯设置 App 偏好。

协议和参数对应后，同一台服务器可以直接使用。

返回[兼容性总览](/zh/guide/compatibility)。
