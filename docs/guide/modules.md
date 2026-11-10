---
title: Modules and HTTPS decryption
description: Use Clash modules on iPhone, iPad, and Mac to add rules, rewrites, scripts, and panels, import modules in common formats as they are, and install and trust the certificate for HTTPS decryption.
keywords:
  - Clash modules
  - Clash HTTPS decryption
  - Clash MITM
  - Clash scripts
  - Clash certificate
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: How to add modules and turn on HTTPS decryption in Clash
  description: Open Modules, paste a module link, then install and trust the certificate for modules that need decryption.
  inLanguage: en-US
  step:
    - "@type": HowToStep
      position: 1
      name: Open Modules
      text: In Profile Center, choose Modules in the profile library.
    - "@type": HowToStep
      position: 2
      name: Add a module
      text: Paste a module link or the module itself in Add Module, then tap Add.
    - "@type": HowToStep
      position: 3
      name: Install and trust the certificate
      text: When a module needs HTTPS decryption, tap Install Certificate, then install and trust Clash Module Certificate in Settings.
---

# Modules and HTTPS decryption

A module bundles rules, rewrites, scripts, panels, and settings so you can turn
them on, off, or update them together. Clash imports modules from popular proxy
apps as they are, and every configuration shares the same set of modules.

| Platform | Modules and HTTPS decryption |
| --- | --- |
| iPhone and iPad | Supported from 1.0.13 |
| Mac | Supported from 1.0.15 |
| Apple TV | Unsupported; modules turned on elsewhere do not apply on Apple TV |

<nav class="everyday-task-grid" aria-label="Module topics">
  <a href="#add-a-module"><strong>Add a module</strong><span>Link, manual, and install links</span></a>
  <a href="#what-takes-effect"><strong>What takes effect</strong><span>Rules, rewrites, and Skipped</span></a>
  <a href="#manage-modules"><strong>Manage modules</strong><span>Switches, order, and updates</span></a>
  <a href="#module-details"><strong>Module details</strong><span>Panels, settings, and sections</span></a>
  <a href="#scripts"><strong>Scripts</strong><span>Triggers and notifications</span></a>
  <a href="#https-decryption"><strong>HTTPS decryption</strong><span>Install and trust the certificate</span></a>
  <a href="#write-a-module"><strong>Write a module</strong><span>Format, examples, and debugging</span></a>
  <a href="#before-you-start"><strong>Before you start</strong><span>Add only trusted sources</span></a>
</nav>

## Open Modules

- iPhone: tap the current Profile name at the top left of Home, then open
  **Profile Center** › profile library › **Modules**.
- iPad: open **Profiles** from the sidebar › profile library › **Modules**.
- Mac: open **Profiles** from the sidebar › profile library › **Modules**.

The **Modules** row shows its state: **Certificate Needed**, **N Modules On**,
or off.

## Add a module

- **⊕ Add Module** at the top right: choose **Link** to paste a module link, or
  **Manual** to write the module yourself. **Name** is optional; tap **Add**.
- **The Add Module card** at the bottom: paste a link, or the module itself,
  into **Module Link**. **New Module** opens the manual page with a template
  that starts with `#!name=`.
- **Install links on the web**: `clash://install-module?url=<encoded module
  link>`. Opening one only fills in **Add Module**; nothing is installed until
  you tap **Add**.

A new module is on and takes effect right away. Clash recognizes the format from
the content first and the link's extension second. Content without any
`[section]` is refused with "This isn't a module, so it wasn't added." See
[compatibility](/guide/compatibility#modules) for how each format is recognized.

## What takes effect

| Content | How Clash handles it |
| --- | --- |
| Rules | Take effect ahead of the configuration's own rules. A rule naming a policy group the current configuration lacks uses the configuration's final match target or its first select group instead |
| URL, header, and body rewrites; local mappings | Take effect. HTTPS requests need HTTPS decryption to be ready |
| Scripts | Run by trigger; see [Scripts](#scripts) |
| Hostnames to decrypt | Merge into the HTTPS decryption scope; see [Which sites are decrypted](#which-sites-are-decrypted) |
| Panels | Appear under **Panels** in module details |
| Module parameters | Appear under **Settings** in module details, where you can change them |
| General settings | Partly: for example addresses that skip the proxy, DNS servers, and IPv6. Where they conflict with Clash's own settings, Clash wins |

Anything that does not take effect is listed under **Skipped** in module
details, each line with its reason. Common ones:

- a module cannot add proxy nodes or replace the certificate;
- Clash does not run DNS scripts or rule scripts;
- content that points to files on the module author's own device;
- syntax Clash does not support.

Some lines under **Skipped** still work: a line written for another app that
"still works here", or one where only some options have no effect, keeps its
main effect.

## Manage modules

- Each module has its own switch; tap ⓘ for details.
- Touch and hold a module to **Update**, **Copy Link** (for modules added from a
  link), **Move Up**, **Move Down**, or **Delete**. Swipe left to delete.
- ⇅ **Reorder Modules** at the top right changes the order; **Update All** at
  the bottom updates every module. On Mac, use ＋ in the toolbar to add a module
  and ⟳ to update all.

Modules apply to every configuration, and switching configurations does not
change their switches. Rules that name a policy group are matched against the
current configuration's own groups. When the current configuration cannot use
modules, Clash says so and runs the configuration as usual.

The configuration page notes any setting a module or override script changed,
for example: "Module “X” sets “Y”, which runs over this."

## Module details

Tap a module's ⓘ. From top to bottom:

- **Name and switch**: rename it and tap **Save**; the **Enable** switch;
  author, source, and when it was updated.
- **Information**: version date and homepage.
- **Panels**: shown when the module has panels, with results from its scripts;
  tap ↻ to refresh.
- **Settings**: the module's parameters as switches, menus, or fields, applied
  as soon as you change them. Each shows "Default · …", and **Reset** returns to
  the module's own value.
- **Content sections**: Sites, Rules, Rewrites, General, Scripts, Other Scripts,
  and Skipped.
- **Delete Module**. A module you created yourself can be changed with **Edit**.

## Scripts

Scripts in modules run as they are. Clash does not cap their size, number, or
running time; iPhone and iPad decide by available memory. Scripts and resources
given as http(s) links work too.

Each script shows its trigger:

| Trigger | When it runs |
| --- | --- |
| Request or response | Inside the tunnel on matching traffic; HTTPS traffic needs HTTPS decryption to be ready |
| Schedule | On schedule while Clash is open and connected |
| Network change | When the network changes while Clash is open and connected |
| Panel | When its panel refreshes |
| Node | Touch and hold a node on the Proxies page, then choose the script; iPhone and iPad only |

Scheduled scripts are listed under **Scripts** in module details; there is no
separate scheduled-task screen.

Script notifications are system notifications. Tapping one copies its text and,
when it carries a link, opens the link. Clash asks for notification permission
only when you first add or turn on a module that sends notifications.

## HTTPS decryption

Modules that rewrite or inspect HTTPS content need HTTPS decryption. A site is
decrypted only when all three hold:

1. a module that names the site is on;
2. the **HTTPS Decryption** switch at the top of Modules is on;
3. **Certificate** shows **Ready**.

**HTTPS Decryption** is off by default. Once you have started installing the
certificate or turned the switch on, Clash turns it on by itself when the
certificate becomes trusted; if you turn it off, it stays off. The certificate
moves through **Not Created**, **Not Installed**, **Not Trusted**, and
**Ready**.

### Install the certificate on iPhone and iPad

When a module that is on needs decryption and the certificate is not ready,
Modules shows **Install Certificate**:

1. Tap **Install Certificate** and allow the download, then install **Clash
   Module Certificate** in Settings > General > VPN & Device Management.
2. In Settings > General > About > Certificate Trust Settings, turn on **Clash
   Module Certificate**.

### Install the certificate on Mac

On Modules, click **Certificate** › **Install Certificate** and enter your Mac
password when asked. Clash adds the certificate to the login keychain and sets
it to Always Trust. If that does not work, follow the on-screen steps to set it
to Always Trust in Keychain Access. Dismissing the password prompt is not a
failure; click again to retry.

### Which sites are decrypted

The scope is built from the hostnames in every module that is on, merged in
module order, and shown read-only under **Sites** in module details. You cannot
add or exclude a hostname in the app directly. To change the scope:

- turn the module off;
- turn **HTTPS Decryption** off;
- create a module that appends hostnames to the existing scope:

```ini
#!name=Extra decryption scope
[MITM]
hostname = %APPEND% example.com
```

### Before the certificate is ready

The parts of a module that need decryption wait, and their section is marked
**Needs HTTPS Decryption** or **Certificate Needed**, with a count such as "N
entries · in use once HTTPS Decryption is ready". The rest of the module works
as usual, including ordinary rules, general settings, and scheduled,
network-change, and panel scripts.

## Write a module

A module is a plain-text file: `#!` lines at the top give its name, description,
and settings, and `[sections]` below hold rules, rewrites, and scripts. Put it
at any address that opens over http(s) and paste the link into **Add Module**;
for your own devices only, you can also choose **Manual** and paste the whole
text.

### The smallest module

This module has a single rule and needs no HTTPS decryption. In **Add Module**,
choose **Manual**, paste it, and tap **Add**:

```ini
#!name=My first module
#!desc=Sends example.com and its subdomains direct.

[Rule]
DOMAIN-SUFFIX,example.com,DIRECT
```

Open its details: if the line appears under **Rules** and not under
**Skipped**, it is written correctly. Then visit example.com, and Activity ›
Connections shows it matching this rule. A line starting with `#` that is not
followed by `!` is a comment.

### The top lines

| Line | What it does |
| --- | --- |
| `#!name=Name` | The module's name |
| `#!desc=Description` | A description shown in module details |
| `#!arguments=name:default,name:default` | Settings, shown under **Settings** in module details, each as a text field |
| `#!arguments-desc=Description` | A note shown under **Settings** |

Wherever the body says <code v-pre>{{{name}}}</code>, Clash puts in the value
from **Settings**, or the default if you have not changed it. The name must be
declared in `#!arguments`; a line that uses an undeclared name goes to
**Skipped** (except in a script's `argument=`, which is handed to the script as
written).

### What each section holds

| Section | Each line | Needs HTTPS decryption |
| --- | --- | --- |
| `[Rule]` | A rule, written as in a configuration's `rules`. The policy is `DIRECT`, `REJECT`, or a policy group name in the current configuration | No; `URL-REGEX` and `USER-AGENT` rules do for HTTPS sites |
| `[URL Rewrite]` | `regex new-address 302` (or `307`) redirects the request; `regex - reject` rejects it | For HTTPS sites |
| `[Header Rewrite]` | `http-request regex header-add name value` adds a request header; there are also `header-del`, `header-replace`, and `header-replace-regex`. Start with `http-response` to change response headers | For HTTPS sites |
| `[Body Rewrite]` | `http-response regex find-regex replacement`, with more pairs on the same line if you like; start with `http-request` for request bodies. `http-response-jq regex 'jq expression'` changes JSON with jq | For HTTPS sites |
| `[Map Local]` | `regex data-type=text data="content"` answers with this content without sending the request; you can add `status-code=200` and `header="Content-Type:application/json"` | For HTTPS sites |
| `[Script]` | Scripts; see below | Request and response scripts do for HTTPS sites |
| `[MITM]` | `hostname = %APPEND% site, site`: the sites to decrypt. `*` is a wildcard, and a leading `-` excludes a site | — |
| `[Panel]` | `name = title=Title, content=Text, script-name=Script, update-interval=seconds` | No |
| `[Host]` | `domain = IP address`: resolves the domain to that address | No |
| `[General]` | Some general settings; see [What takes effect](#what-takes-effect) | No |

Write `%APPEND%` in `[MITM]`'s `hostname`: without it, the line replaces the
sites written by modules ahead of it instead of adding to them.

### Write a script

Each line in `[Script]` is one script:

```ini
name = type=kind, option=value, option=value
```

| `type=` | When it runs | Also write |
| --- | --- | --- |
| `http-request` | Before a matching request is sent | `pattern=`: a regex for the URL |
| `http-response` | After the response to a matching request arrives | `pattern=` |
| `cron` | On a schedule | `cronexp="minute hour day month weekday"` |
| `event` | After the network changes | `event-name=network-changed` |
| `generic` | When its panel refreshes | Point a `[Panel]` line's `script-name=` at it |

Every script needs `script-path=`, the script's http(s) address. A script cannot
be written inside the module or given as a relative path. Other common options:

- `requires-body=true`: write it when the script reads or changes the body.
  Without it the script gets no body, and a body given to `$done` is ignored.
- `timeout=seconds`: how long one run may take before it times out.
- `argument=text`: text handed to the script, which reads it as `$argument`;
  you can write <code v-pre>{{{name}}}</code> to hand over a value from
  **Settings**.

Inside a script you can use:

| API | What it is for |
| --- | --- |
| `$request` | The request: `url`, `method`, `headers`, and `body` with `requires-body=true` |
| `$response` | The response, in `http-response` scripts only: `status`, `headers`, `body` |
| `$done(…)` | Ends this run; call it once in every run |
| `$argument` | The text written in `argument=` |
| `$persistentStore.read(key)`, `$persistentStore.write(value, key)` | Stores a piece of text that is still there next run |
| `$notification.post(title, subtitle, body)` | Posts a system notification |
| `$httpClient.get(address or options, callback)`, `$httpClient.post(…)` | Sends a network request; the callback gets `(error, response, body)` |
| `console.log(…)` | Writes a log line; see [Debugging](#debugging) |
| `setTimeout(…)` | Runs code later |

What to give `$done`:

- **Request scripts**: `$done({})` sends the request as it is;
  `$done({ url, headers, body })` changes the address, headers, or body;
  `$done({ response: { status, headers, body } })` answers with this response
  without sending the request.
- **Response scripts**: `$done({})` returns the response as it is;
  `$done({ status, headers, body })` changes the status, headers, or body.
- **Scheduled scripts**: `$done()`. **Panel scripts**: `$done({ title, content })`,
  which the panel shows.

A script that never calls `$done` waits until it times out. Every module's
scripts share `$persistentStore`, so give your keys a prefix of your own to keep
them apart from other modules'.

### Debugging

1. **Check module details first.** Lines with mistakes or unsupported syntax
   go to **Skipped**, each with its reason. A script that could not be
   downloaded says why too, for example "This script couldn't be downloaded:
   the server couldn't be reached."
2. **Turn on log recording.** In Activity, switch to **Logs** and turn on
   **Record Logs** (off by default; on iPhone and iPad it is under ⋯ › **Log
   Settings**). From then
   on, what `console.log` writes is recorded, marked `[script]` with the
   script's name; a run that fails is marked `[Script Aborted]`, and one that
   times out `[Script Timeout]`. **Logs** shows only the latest lines; export the
   log to see earlier ones.
3. **When a panel does not update**, it says why: "Connect to refresh", "It
   didn't refresh; try again", or "Not Available Yet" while its script has not
   been downloaded.
4. **After changing a module or a script**, touch and hold the module on
   Modules and choose **Update**; Clash downloads it again.

### Examples

These three examples go from simple to more involved. The modules and scripts
are hosted on clash.md, so you can add them directly: tap **Add to Clash**, or
paste the module link into **Add Module**. When you are done, swipe left to
delete.

#### Example 1: a rule with a setting

No HTTPS decryption needed. The module's **Settings** has a **Domain**,
`example.com` by default; that domain and its subdomains go direct.

[Add to Clash](clash://install-module?url=https%3A%2F%2Fclash.md%2Fmodules%2Fexamples%2Frule-en.txt) · Module link: `https://clash.md/modules/examples/rule-en.txt`

<<< @/public/modules/examples/rule-en.txt{ini}

**Check it works**: visit example.com, and Activity › Connections shows it
matching this `DOMAIN-SUFFIX` rule and going direct. Change the domain in
**Settings**, and the rule follows.

#### Example 2: rewrite a page with a response script

Needs HTTPS decryption. The script replaces "Not rewritten yet" on the
[test page](https://clash.md/modules/examples/try) with the **Text** in
**Settings**.

[Add to Clash](clash://install-module?url=https%3A%2F%2Fclash.md%2Fmodules%2Fexamples%2Frewrite-en.txt) · Module link: `https://clash.md/modules/examples/rewrite-en.txt`

<<< @/public/modules/examples/rewrite-en.txt{ini}

The script, `rewrite-en.js`:

<<< @/public/modules/examples/rewrite-en.js

**Check it works**:

1. Install and trust the certificate as in [HTTPS decryption](#https-decryption),
   and make sure **HTTPS Decryption** is on.
2. Open the test page `https://clash.md/modules/examples/try` in Safari; the
   line now reads "This line was rewritten by a Clash module".
3. With log recording on, **Logs** has a line
   `Rewrote https://clash.md/modules/examples/try`.

This module adds clash.md to the decryption scope; delete it when you are done.

#### Example 3: a scheduled script, a notification, and a panel

No HTTPS decryption needed. Each time the scheduled script runs, it stores the
count and time and posts a notification; the panel script reads them back and
shows them under **Panels** in module details. The two scripts pass the data
through the same keys in `$persistentStore`.

[Add to Clash](clash://install-module?url=https%3A%2F%2Fclash.md%2Fmodules%2Fexamples%2Freminder-en.txt) · Module link: `https://clash.md/modules/examples/reminder-en.txt`

<<< @/public/modules/examples/reminder-en.txt{ini}

The scheduled script, `reminder-en.js`:

<<< @/public/modules/examples/reminder-en.js

The panel script, `reminder-panel-en.js`:

<<< @/public/modules/examples/reminder-panel-en.js

**Check it works**:

1. After you add it, Clash asks for notification permission; choose **Allow**.
2. In **Settings** in module details, change **Schedule** to `* * * * *`
   (every minute).
3. Keep Clash open and connected; a **Reminder** notification arrives every
   minute.
4. Under **Panels** in module details, tap ↻; the panel shows how many times it
   ran and when it last ran.
5. When you are done, change **Schedule** back to `0 9 * * *`, or delete the
   module.

## Before you start

- Add modules only from sources you trust. A module can rewrite web content and
  run scripts, and those scripts can make network requests of their own.
- The certificate is generated on your device, and decryption happens only
  inside the tunnel on your device. See the [privacy model](/guide/privacy-model).
- When you no longer need HTTPS decryption, turn the switch off; on iPhone and
  iPad you can also turn off trust for the certificate in Certificate Trust
  Settings.
