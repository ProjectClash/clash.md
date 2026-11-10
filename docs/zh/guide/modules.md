---
title: 模块与 HTTPS 解密
description: 在 iPhone、iPad 与 Mac 上用 Clash 的模块添加规则、重写、脚本与面板，直接导入常见格式的模块，并为 HTTPS 解密安装和信任证书。
keywords:
  - Clash模块
  - Clash HTTPS解密
  - Clash MITM
  - Clash脚本
  - Clash证书
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: 如何在 Clash 中添加模块并开启 HTTPS 解密
  description: 打开模块页，粘贴模块链接，再为需要解密的模块安装并信任证书。
  inLanguage: zh-CN
  step:
    - "@type": HowToStep
      position: 1
      name: 打开模块页
      text: 在配置中心的配置库里选择“模块”。
    - "@type": HowToStep
      position: 2
      name: 添加模块
      text: 在“添加模块”中粘贴模块链接或模块内容，点“添加”。
    - "@type": HowToStep
      position: 3
      name: 安装并信任证书
      text: 模块需要 HTTPS 解密时，点“安装证书”，在系统设置中安装并信任“Clash 模块证书”。
---

# 模块与 HTTPS 解密

模块把一组规则、重写、脚本、面板和设置打包在一起，可以整体开关、整体更新。
Clash 能直接导入常见代理 App 的模块，不用改写；所有配置共用同一套模块。

| 平台 | 模块与 HTTPS 解密 |
| --- | --- |
| iPhone 与 iPad | 1.0.13 起支持 |
| Mac | 1.0.15 起支持 |
| Apple TV | 不支持；其他设备上开启的模块不会在 Apple TV 生效 |

<nav class="everyday-task-grid" aria-label="模块主题">
  <a href="#添加模块"><strong>添加模块</strong><span>链接、手动与安装链接</span></a>
  <a href="#哪些内容会生效"><strong>哪些内容会生效</strong><span>规则、重写与已跳过</span></a>
  <a href="#管理模块"><strong>管理模块</strong><span>开关、排序与更新</span></a>
  <a href="#模块详情"><strong>模块详情</strong><span>面板、设置与内容分区</span></a>
  <a href="#脚本"><strong>脚本</strong><span>触发方式与通知</span></a>
  <a href="#https-解密"><strong>HTTPS 解密</strong><span>安装与信任证书</span></a>
  <a href="#编写模块"><strong>编写模块</strong><span>格式、示例与调试</span></a>
  <a href="#使用前须知"><strong>使用前须知</strong><span>只添加可信来源</span></a>
</nav>

## 打开模块页

- iPhone：在首页左上角点当前配置名，进入“配置中心” › 配置库 › “模块”。
- iPad：从侧边栏进入“配置” › 配置库 › “模块”。
- Mac：从侧边栏进入“配置” › 配置库 › “模块”。

“模块”这一行会显示当前状态：“需要证书”、“N 个已开启”或“关闭”。

## 添加模块

- **右上角 ⊕“添加模块”**：选择“链接”粘贴模块链接，或选择“手动”直接写入模块
  内容。“名称”可以不填，点“添加”完成。
- **页面底部的“添加模块”卡片**：在“模块链接”里粘贴链接，也可以直接粘贴模块
  内容；“新建模块”会打开手动页，模板以 `#!name=` 开头。
- **网页上的安装链接**：`clash://install-module?url=<编码后的模块链接>`。点开后
  只会打开已经填好链接的“添加模块”，需要你点“添加”才会安装。

添加后模块默认开启，立即生效。Clash 按内容判断模块格式，再参考链接的后缀；没有
任何 `[段]` 的内容会提示“这不是模块，没有添加。”。各家格式的识别方式见
[兼容性说明](/zh/guide/compatibility#模块)。

## 哪些内容会生效

| 内容 | 怎么处理 |
| --- | --- |
| 规则 | 生效，排在当前配置自己的规则之前。规则指向的策略组在当前配置里不存在时，改为配置的最终匹配目标或第一个手动选择组 |
| URL 重写、请求头与正文重写、本地映射 | 生效。处理 HTTPS 请求时需要 HTTPS 解密就绪 |
| 脚本 | 按触发方式运行，见[脚本](#脚本) |
| 需要解密的主机名 | 合并进 HTTPS 解密范围，见[解密哪些网站](#解密哪些网站) |
| 面板 | 显示在模块详情的“面板”里 |
| 模块提供的参数 | 显示在模块详情的“设置”里，可以修改 |
| 常规设置 | 部分生效，例如跳过代理的地址、DNS 服务器、IPv6；与 Clash 自己的设置冲突时，以 Clash 为准 |

不会生效的内容会列在模块详情的“已跳过”里，每一行都写明原因，常见的有：

- 模块不能添加代理节点，也不能更换证书；
- Clash 不运行 DNS 脚本和规则脚本；
- 引用模块作者本机文件的内容；
- Clash 不支持的写法。

“已跳过”里也有主体仍然生效的行：标着“这一行是其他 App 的写法，在这里照样生效。”
或“这一行里有些选项不起作用”的，只是写法或个别选项被忽略。

## 管理模块

- 每个模块都有自己的开关；点 ⓘ 打开详情。
- 长按模块可以“更新”、“复制链接”（从链接添加的模块才有）、“上移”、“下移”或
  “删除”，也可以左滑删除。
- 右上角 ⇅“模块排序”调整顺序；底部的“全部更新”一次更新所有模块。Mac 上用工具栏的
  ＋ 添加模块，⟳ 全部更新。

模块对所有配置生效，切换配置不会改变模块的开关。规则指向的策略组按当前配置
自己的组去匹配；当前配置用不了模块时，会提示“当前配置用不了模块，配置照常使用。”。

被模块或覆写脚本改掉的配置项，会在配置页的该项下面注明，例如：“模块「X」设成了
「Y」，暂时盖过这里。”

## 模块详情

点模块的 ⓘ 打开详情，从上到下是：

- **名称与开关**：可以改名后点“保存”；“启用”开关；作者、来源与更新时间。
- **详细**：版本日期与主页。
- **面板**：模块带面板时出现，显示脚本给出的结果，点 ↻ 刷新。
- **设置**：模块提供的参数显示为开关、菜单或输入框，改完立即生效。每项下面写着
  “默认 · …”，“恢复默认”回到模块原本的值。
- **内容分区**：网站、规则、重写、常规、脚本、其他脚本、已跳过。
- **删除模块**。自己新建的模块可以在详情里“编辑”。

## 脚本

模块里的脚本直接运行，Clash 不限制脚本的大小、数量或运行时间；iPhone 与 iPad 会
根据剩余内存决定能否运行。脚本和资源写成 http(s) 链接也可以使用。

每个脚本下面会写明触发方式：

| 触发方式 | 什么时候运行 |
| --- | --- |
| 处理请求或响应 | 在隧道里随匹配的流量运行；HTTPS 流量需要 HTTPS 解密就绪 |
| 定时 | 在 Clash 打开并连接时按时运行 |
| 网络变化 | 在 Clash 打开并连接时，网络变化后运行 |
| 面板 | 面板刷新时运行 |
| 长按节点 | 在代理页长按节点，选择“脚本”里的脚本名；仅 iPhone 与 iPad |

定时运行的脚本列在模块详情的“脚本”分区里，没有单独的定时任务页面。

脚本发出的通知是系统通知。点通知会复制其中的文字；通知带链接时，还会打开这个
链接。Clash 在你第一次添加或开启会发通知的模块时，才请求通知权限。

## HTTPS 解密

需要改写或检查 HTTPS 内容的模块，要靠 HTTPS 解密才能生效。一个网站真正被解密，
要同时满足三条：

1. 写了这个网站的模块已开启；
2. 模块页顶部的“HTTPS 解密”开关已打开；
3. “证书”显示“已就绪”。

“HTTPS 解密”默认关闭。你开始安装证书或打开过开关后，证书一旦被信任，Clash 会
自动打开它；你手动关掉后，不会再自动打开。证书状态依次是“未生成”、“未安装”、
“未信任”和“已就绪”。

### 在 iPhone 与 iPad 上安装证书

有开启的模块需要解密而证书还没就绪时，模块页会出现“安装证书”：

1. 点“安装证书”并允许下载，再到“设置 › 通用 › VPN与设备管理”里安装“Clash 模块
   证书”。
2. 到“设置 › 通用 › 关于本机 › 证书信任设置”，打开“Clash 模块证书”。

### 在 Mac 上安装证书

在模块页点“证书” › “安装证书”，按系统提示输入 Mac 密码即可：Clash 会把证书加入
“登录”钥匙串并设为始终信任。没有成功时，按页面上的提示到“钥匙串访问”里把它设为
“始终信任”。关掉密码框不算失败，可以再点一次。

### 解密哪些网站

解密范围来自所有已开启模块里写的主机名，按模块顺序合并，在模块详情的“网站”分区
里只读显示。App 里不能单独添加或排除主机名，需要调整时可以：

- 关掉对应的模块；
- 关掉“HTTPS 解密”；
- 新建一个模块，在已有范围后追加主机名：

```ini
#!name=追加解密范围
[MITM]
hostname = %APPEND% example.com
```

### 证书还没就绪时

模块里需要解密的部分会等待，所在分区标“需要 HTTPS 解密”或“需要证书”，模块页
显示“N 条 · HTTPS 解密就绪后生效”。模块的其余部分照常生效，包括普通规则、常规
设置，以及定时、网络变化和面板脚本。

## 编写模块

模块是一个纯文本文件：开头用 `#!` 写名称、说明和设置项，下面按 `[段]` 分开写
规则、重写和脚本。写好后放到任意能用 http(s) 打开的地址，把链接粘贴到“添加模块”；
只在自己的设备上用时，也可以选“手动”直接粘贴全文。

### 最小的模块

下面这个模块只有一条规则，不需要 HTTPS 解密。在“添加模块”里选“手动”，粘贴进去，
点“添加”：

```ini
#!name=我的第一个模块
#!desc=让 example.com 及其子域名直连。

[Rule]
DOMAIN-SUFFIX,example.com,DIRECT
```

打开它的详情，这一行出现在“规则”分区、没有进“已跳过”，就说明写对了。之后访问
example.com，在活动页的“连接”里能看到它命中这条规则。以 `#` 开头、后面不是 `!` 的
行是注释。

### 开头几行

| 写法 | 作用 |
| --- | --- |
| `#!name=名称` | 模块名称 |
| `#!desc=说明` | 显示在模块详情里的说明 |
| `#!arguments=名称:默认值,名称:默认值` | 设置项，显示在模块详情的“设置”里，每项是一个输入框 |
| `#!arguments-desc=说明` | 显示在“设置”里的说明 |

正文里写 <code v-pre>{{{名称}}}</code> 的地方，会换成“设置”里填写的值，没改过时用默认值。名称要先在
`#!arguments` 里写过；没写过的，用到它的那一行会进“已跳过”（脚本的 `argument=` 除外，
会原样交给脚本）。

### 各段能写什么

| 段 | 每行写什么 | 需要 HTTPS 解密吗 |
| --- | --- | --- |
| `[Rule]` | 规则，写法与配置文件的 `rules` 相同。策略写 `DIRECT`、`REJECT` 或当前配置里的策略组名 | 不需要；`URL-REGEX`、`USER-AGENT` 规则遇到 HTTPS 网站时需要 |
| `[URL Rewrite]` | `正则 新地址 302`（或 `307`）把请求重定向；`正则 - reject` 拒绝这个请求 | HTTPS 网站需要 |
| `[Header Rewrite]` | `http-request 正则 header-add 名称 值` 添加请求头；还有 `header-del`、`header-replace`、`header-replace-regex`。改响应头时开头写 `http-response` | HTTPS 网站需要 |
| `[Body Rewrite]` | `http-response 正则 要找的正则 替换成的文字`，一行可以接着写多对；改请求正文时开头写 `http-request`。`http-response-jq 正则 'jq 表达式'` 用 jq 改 JSON | HTTPS 网站需要 |
| `[Map Local]` | `正则 data-type=text data="内容"`：不发出请求，直接用这段内容回应；还可以加 `status-code=200`、`header="Content-Type:application/json"` | HTTPS 网站需要 |
| `[Script]` | 脚本，见下文 | 处理请求或响应的脚本遇到 HTTPS 网站时需要 |
| `[MITM]` | `hostname = %APPEND% 网站, 网站`：要解密的网站，可以用 `*` 通配，前面加 `-` 表示排除 | — |
| `[Panel]` | `名称 = title=标题, content=内容, script-name=脚本名, update-interval=秒数` | 不需要 |
| `[Host]` | `域名 = IP 地址`：这个域名直接解析成这个地址 | 不需要 |
| `[General]` | 部分常规设置，见[哪些内容会生效](#哪些内容会生效) | 不需要 |

`[MITM]` 的 `hostname` 记得写 `%APPEND%`：不写时，这一行会替换掉排在前面的模块写的
网站，而不是追加。

### 脚本怎么写

`[Script]` 里每行一个脚本：

```ini
名称 = type=类型, 参数=值, 参数=值
```

| `type=` | 什么时候运行 | 还要写 |
| --- | --- | --- |
| `http-request` | 匹配的请求发出前 | `pattern=`：匹配网址的正则 |
| `http-response` | 收到匹配请求的响应后 | `pattern=` |
| `cron` | 按设定的时间 | `cronexp="分 时 日 月 星期"` |
| `event` | 网络变化后 | `event-name=network-changed` |
| `generic` | 面板刷新时 | 在 `[Panel]` 里用 `script-name=` 指向它 |

每个脚本都要写 `script-path=`，填脚本的 http(s) 地址。脚本不能直接写在模块里，也不能
写相对路径。常用的参数还有：

- `requires-body=true`：脚本要读或改正文时写上。不写时脚本拿不到正文，`$done` 里给的
  正文也会被忽略。
- `timeout=秒数`：一次运行最多多久，到时没有结束就算超时。
- `argument=文字`：交给脚本的文字，脚本里用 `$argument` 读到；可以写 <code v-pre>{{{名称}}}</code>，把
  “设置”里的值交给脚本。

脚本里可以用：

| 接口 | 用途 |
| --- | --- |
| `$request` | 请求：`url`、`method`、`headers`，写了 `requires-body=true` 时还有 `body` |
| `$response` | 响应，只在 `http-response` 脚本里有：`status`、`headers`、`body` |
| `$done(…)` | 结束这次运行，每次运行都要调用一次 |
| `$argument` | `argument=` 写的文字 |
| `$persistentStore.read(键)`、`$persistentStore.write(值, 键)` | 存取一段文字，下次运行还在 |
| `$notification.post(标题, 副标题, 正文)` | 发一条系统通知 |
| `$httpClient.get(地址或选项, 回调)`、`$httpClient.post(…)` | 发出网络请求，回调收到 `(错误, 响应, 正文)` |
| `console.log(…)` | 写一行日志，见[调试](#调试) |
| `setTimeout(…)` | 延后运行一段代码 |

`$done` 里写什么：

- **请求脚本**：`$done({})` 原样发出；`$done({ url, headers, body })` 改地址、请求头或
  正文；`$done({ response: { status, headers, body } })` 不发出请求，直接用这个响应回应。
- **响应脚本**：`$done({})` 原样返回；`$done({ status, headers, body })` 改状态码、响应头
  或正文。
- **定时脚本**：`$done()`。**面板脚本**：`$done({ title, content })`，面板显示这两项。

没有调用 `$done` 的脚本，会一直等到超时。`$persistentStore` 是所有模块的脚本共用的，
键名最好带上自己的前缀，免得和别的模块重名。

### 调试

1. **先看模块详情。** 写错或不支持的行会进“已跳过”，每行写明原因。脚本没下载下来时，
   也会写明原因，例如“脚本下载失败，无法连接服务器。”。
2. **打开日志记录。** 在活动页切到“日志”，打开“记录日志”（默认关闭；iPhone 与 iPad
   在 ⋯ › “日志设置”里）。之后 `console.log` 写的内容会记下来，带 `[script]` 和脚本名；运行出错的行带
   `[Script Aborted]`，超时的带 `[Script Timeout]`。“日志”只显示最近的内容，较早的
   请导出日志查看。
3. **面板没有更新时**，面板上会写明原因：“连接后可刷新”、“这次没有刷新成功，可重试”，
   或者脚本还没下载好时的“暂时用不了”。
4. **改了模块或脚本之后**，在模块页长按这个模块，选“更新”，Clash 会重新下载。

### 示例

下面三个示例由浅入深，模块和脚本都放在 clash.md 上，可以直接添加：点“在 Clash 中添加”，
或者把模块链接粘贴到“添加模块”。试完不需要了，左滑删除即可。

#### 示例一：用设置项写一条规则

不需要 HTTPS 解密。模块的“设置”里有一个“域名”，默认 `example.com`；这个域名和它的
子域名都会直连。

[在 Clash 中添加](clash://install-module?url=https%3A%2F%2Fclash.md%2Fmodules%2Fexamples%2Frule-zh.txt) · 模块链接：`https://clash.md/modules/examples/rule-zh.txt`

<<< @/public/modules/examples/rule-zh.txt{ini}

**确认生效**：访问 example.com，在活动页的“连接”里看到它命中的是这条
`DOMAIN-SUFFIX` 规则、走直连。在“设置”里把域名改成别的，规则跟着变。

#### 示例二：用响应脚本改写网页

需要 HTTPS 解密。脚本把[测试页](https://clash.md/modules/examples/try)上的
“还没有被模块改写”换成“设置”里的“文字”。

[在 Clash 中添加](clash://install-module?url=https%3A%2F%2Fclash.md%2Fmodules%2Fexamples%2Frewrite-zh.txt) · 模块链接：`https://clash.md/modules/examples/rewrite-zh.txt`

<<< @/public/modules/examples/rewrite-zh.txt{ini}

脚本 `rewrite-zh.js`：

<<< @/public/modules/examples/rewrite-zh.js

**确认生效**：

1. 按 [HTTPS 解密](#https-解密)安装并信任证书，确认“HTTPS 解密”已打开。
2. 在 Safari 打开测试页 `https://clash.md/modules/examples/try`，那一行变成
   “这一行已被 Clash 模块改写”。
3. 打开了日志记录时，“日志”里有一行 `已改写 https://clash.md/modules/examples/try`。

这个模块会把 clash.md 加进解密范围，试完建议删掉。

#### 示例三：定时脚本、通知和面板

不需要 HTTPS 解密。定时脚本每次运行都记下次数和时间、发一条通知；面板脚本读出
这些记录，显示在模块详情的“面板”里。两个脚本靠 `$persistentStore` 里同样的键传递数据。

[在 Clash 中添加](clash://install-module?url=https%3A%2F%2Fclash.md%2Fmodules%2Fexamples%2Freminder-zh.txt) · 模块链接：`https://clash.md/modules/examples/reminder-zh.txt`

<<< @/public/modules/examples/reminder-zh.txt{ini}

定时脚本 `reminder-zh.js`：

<<< @/public/modules/examples/reminder-zh.js

面板脚本 `reminder-panel-zh.js`：

<<< @/public/modules/examples/reminder-panel-zh.js

**确认生效**：

1. 添加后，Clash 会请求通知权限，选“允许”。
2. 在模块详情的“设置”里，把“时间”改成 `* * * * *`（每分钟一次）。
3. 保持 Clash 打开并连接，每分钟会收到一条“定时提醒”。
4. 在模块详情的“面板”里点 ↻，面板显示运行了几次、上次是什么时间。
5. 试完把“时间”改回 `0 9 * * *`，或者删掉这个模块。

## 使用前须知

- 只添加你信任的来源提供的模块。模块可以改写网页内容、运行脚本，脚本还能自己
  发出网络请求。
- 证书在本机生成，解密只在本机隧道里进行，详见[隐私模型](/zh/guide/privacy-model)。
- 不再需要 HTTPS 解密时，可以关掉开关；iPhone 与 iPad 还可以在“证书信任设置”里
  关闭对证书的信任。
