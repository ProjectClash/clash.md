---
title: Modules and HTTPS decryption
description: Use Clash modules on iPhone and iPad to add rules, rewrites, scripts, and panels, import modules in common formats as they are, and install and trust the certificate for HTTPS decryption.
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
| iPhone and iPad | Supported |
| Mac | Supported from 1.0.15 |
| Apple TV | Unsupported; modules turned on elsewhere do not apply on Apple TV |

<nav class="everyday-task-grid" aria-label="Module topics">
  <a href="#add-a-module"><strong>Add a module</strong><span>Link, manual, and install links</span></a>
  <a href="#what-takes-effect"><strong>What takes effect</strong><span>Rules, rewrites, and Skipped</span></a>
  <a href="#module-details"><strong>Module details</strong><span>Panels, settings, and sections</span></a>
  <a href="#scripts"><strong>Scripts</strong><span>Triggers and notifications</span></a>
  <a href="#https-decryption"><strong>HTTPS decryption</strong><span>Install and trust the certificate</span></a>
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
  the bottom updates every module.

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

## Before you start

- Add modules only from sources you trust. A module can rewrite web content and
  run scripts, and those scripts can make network requests of their own.
- The certificate is generated on your device, and decryption happens only
  inside the tunnel on your device. See the [privacy model](/guide/privacy-model).
- When you no longer need HTTPS decryption, turn the switch off; on iPhone and
  iPad you can also turn off trust for the certificate in Certificate Trust
  Settings.
