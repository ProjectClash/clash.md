---
title: Mac guide
description: Add and switch Clash Profiles, choose modes and routes, use the menu bar, inspect Connections, and confirm when a new setting takes effect on Mac.
keywords:
  - Clash Mac guide
  - Clash macOS Profile
  - choose Clash Mac node
  - Clash menu bar
  - Clash Connections
pageClass: clash-device-guide-page
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: How to use Clash on Mac
  description: Add a Profile, choose a mode and route, connect, inspect active connections, and confirm a setting is in use.
  inLanguage: en-US
  step:
    - "@type": HowToStep
      position: 1
      name: Add a Profile
      text: Start from a Profile URL, configuration file, pasted content, blank Profile, or QR image.
    - "@type": HowToStep
      position: 2
      name: Choose a mode and route
      text: Choose an outbound mode on Home, then select a route inside its policy group.
    - "@type": HowToStep
      position: 3
      name: Connect
      text: Connect from the main window or menu bar.
    - "@type": HowToStep
      position: 4
      name: Inspect Connections
      text: Check the matched rule, outbound target, and proxy chain used by a new connection.
---

# Mac guide

From the main window to the menu bar, and from Profile management to connection
inspection, this page covers the complete Mac workflow.

<nav class="everyday-task-grid" aria-label="Mac guide topics">
  <a href="#manage-profiles"><strong>Manage Profiles</strong><span>Add, switch, edit, and export</span></a>
  <a href="#choose-an-outbound-mode"><strong>Choose an outbound mode</strong><span>Rule, Global, and Direct</span></a>
  <a href="#choose-a-route"><strong>Choose a route</strong><span>Policy groups, nodes, and latency</span></a>
  <a href="#connect-and-use-the-menu-bar"><strong>Connect and use the menu bar</strong><span>Main window and quick controls</span></a>
  <a href="#inspect-active-connections"><strong>Inspect active connections</strong><span>Rules, proxy chains, and details</span></a>
  <a href="#confirm-a-setting"><strong>Confirm a setting</strong><span>Check a genuinely new connection</span></a>
</nav>

## Manage Profiles

Open **Profiles** from the sidebar; its toolbar switches between the profile,
node, and rule libraries. The quick-add card in the profile library can paste a
Profile URL or configuration text, scan a QR code (including one in an image),
or import a file. **Add Profile** walks you through choosing node sources and a
rule scheme, or using the original configuration as is.

Click a row to switch; the active Profile and switching progress stay visible in
the list. Each row's **⋯** button or right-click menu offers **Update**, **Copy
Link**, **Use This Profile**, **Move Up**, **Move Down**, and **Delete**. ⟳ in
the toolbar updates every Profile.

Open a Profile to change any of its settings; changes apply immediately:

- **Name** at the top can be edited in place.
- Below it are the rule scheme, custom rules, override script, and every
  configuration section, such as General, DNS, Inbounds, Proxy Groups, and
  Rules.
- At the bottom are **Edit Source…**, **Check Configuration**, **Save as Rule
  Scheme…**, **Duplicate**, and **Export…**. When a configuration is too large
  to edit, **Edit Source…** opens it in a read-only window.

Rules can live directly in the configuration file; even a configuration with
two million rules imports and runs. The **Modules** row in the profile library
opens Modules; see [Modules and HTTPS decryption](/guide/modules). Modules are
available on Mac from 1.0.15.

Deleting a source, rule scheme, node you created, or script does not ask for
confirmation; undo within 10 seconds or press ⌘Z. **iCloud Backup & Restore**
in the Data group at the bottom of the profile library backs up and restores
your configurations; turn on **Sync Profiles to Apple TV** there so Apple TV
can restore this Mac's configurations from iCloud.

::: tip Profiles may contain credentials
Profile URLs, configuration files, and backups can contain server credentials.
When asking for help publicly, do not post real URLs, usernames, passwords,
keys, or unredacted logs.
:::

## Choose an outbound mode

Choose from the **Outbound Mode** card on Home:

| Mode | What it does |
|---|---|
| **Rule** | Uses the active Profile to decide whether each connection goes direct, uses a proxy, or is rejected |
| **Global** | Sends traffic to the global proxy group and its selected route |
| **Direct** | Connects without a proxy |

Rule is the usual everyday choice. Different connections can use different
policy groups, so Rule mode has no single “current node” that represents all
traffic. Direct does not use a proxy; an empty node screen in Direct is expected.

If you switch to Global while connected and the `GLOBAL` group ends on DIRECT
or REJECT, Clash first asks **Switch to Global Mode?**: choose **Choose Node** to
pick a node for `GLOBAL`, or **Switch Anyway** or **Cancel**. When `GLOBAL`
can't be used, Clash shows **Global Mode Unavailable** with the reason.

## Choose a route

Open **Proxies**, expand a policy group, and choose a node. The selected card
uses a highlighted background and leading accent line. Cards also report a
latency value, failure, or timeout.

Search, expand-all, and collapse-all controls are in the window toolbar. When
connected, use **Test All** to compare response times on the current network.
Lower latency does not guarantee higher throughput on every network.

When a test fails, the node row shows the reason reported by the core, such as
an MTU out of range, rather than only a timeout.

## Connect and use the menu bar

Connect from Home. The first time, approve the system request to add a VPN
configuration. Home then reports connection state, duration, and live traffic.

Use the menu bar to connect, disconnect, switch Mode, and choose nodes without
opening the main window; groups with many nodes expand to show all of them. If
switching a node or mode, or starting the connection, fails, a notice appears
even while the main window is closed. Return to the main window when you need to
inspect Profiles, rules, DNS, logs, or connection details.

To open Clash when you log in, choose **Settings…** (⌘,) to go to **More**, then
turn on **Launch Clash at login** under **General** in **App Settings › Client
Settings**. If macOS asks for approval, allow it in System Settings › General ›
Login Items.

## Inspect active connections

Open `Connection` → **Activity** from the sidebar. Switch between
**Connections**, **Requests**, and **Logs** at the top of Activity; every row in
Connections and Requests shows its time, rule, and route; pause Requests to read
them without new rows arriving. The connection
list shows destinations, matched rules, outbound targets, proxy chains, and
transferred bytes. The detail pane adds endpoints, traffic, and connection
metadata.

Search, sort, close one connection, or use **Close All** to end every active
connection. The originating app may reconnect according to its own behavior.

## Confirm a setting

Check these in order:

1. The active item in Profiles is the intended configuration.
2. The Outbound Mode indicator is on the intended mode.
3. The intended node is selected inside the intended policy group.
4. Make sure the target app establishes a **new connection**, then inspect its
   matched rule, outbound target, and proxy chain under Activity › Connections.

A page refresh can still reuse HTTP/2, HTTP/3, or QUIC. When certainty matters,
close the corresponding old connection in Connections before making the target
app connect again.

The optional **External IP** card on Home provides another signal, but it proves
only where that particular lookup went. In Rule mode, it cannot represent every
destination.

## What happens to existing connections?

- **Switch Profile:** a successful switch normally ends current active
  connections. Apps that still need network access use the new Profile when
  they establish new connections. The Tunnel can remain Connected.
- **Switch between Rule, Global, and Direct:** while the default **Close
  connections on node or mode switch** setting is on, active connections end
  once, and apps that still need the network reconnect using the new mode. With
  it off, existing connections stay on their original route and new connections
  use the new mode right away. Updating or editing the
  configuration later can still end old connections.
- **Change a node manually:** with that setting on, only connections that go
  through the group you changed end; connections through other groups are left
  alone. With it off, old connections stay in place.
  The setting is under **More › App Settings › Client Settings**.
- **Stop and reconnect the Tunnel:** all connections are interrupted; new ones
  use current settings.

Avoid changing a Profile, node, or the Tunnel during an important download,
call, or game. To move traffic immediately, use **Close All** in Connections,
then make the target app establish a new connection.

## Shortcuts and widgets

Shortcuts can start, stop, and toggle the connection, check VPN status, set the
outbound mode, and import a profile. On macOS 14 or later you can also add the
Clash widget and choose in **Edit Widget** whether it shows connection status
with a switch, a policy group, or network statistics.

## Use Clash from Terminal

clash-cli comes built into Clash for Mac. From Terminal you can check status,
switch nodes, inspect connections, and see which rule a site will use, and you
can control Clash on your iPhone, iPad, and Apple TV from your Mac. See
[clash-cli](/guide/clash-cli).
