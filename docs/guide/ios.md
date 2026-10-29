---
title: iPhone and iPad guide
description: Add and switch Clash Profiles, choose modes and routes, connect, inspect Connections, and confirm when a new setting takes effect on iPhone and iPad.
keywords:
  - Clash iPhone guide
  - Clash iPad guide
  - add Clash Profile
  - choose Clash node
  - Clash Connections
pageClass: clash-device-guide-page
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: How to use Clash on iPhone and iPad
  description: Add a Profile, choose a mode and route, connect, inspect active connections, and confirm a setting is in use.
  inLanguage: en-US
  step:
    - "@type": HowToStep
      position: 1
      name: Add a Profile
      text: Add a configuration from a Profile URL, QR code, or file, or build one from nodes and rules with Create Profile.
    - "@type": HowToStep
      position: 2
      name: Choose a mode and route
      text: Choose an outbound mode on Home, then select a route inside its policy group.
    - "@type": HowToStep
      position: 3
      name: Connect
      text: Connect from Home and approve the system VPN configuration request.
    - "@type": HowToStep
      position: 4
      name: Inspect Connections
      text: Check the matched rule, outbound target, and proxy chain used by a new connection.
---

# iPhone and iPad guide

From adding your first Profile to changing routes, inspecting connections, and
confirming a setting, this page covers only iPhone and iPad.

<nav class="everyday-task-grid" aria-label="iPhone and iPad guide topics">
  <a href="#manage-profiles"><strong>Manage Profiles</strong><span>Add, switch, update, and remove</span></a>
  <a href="#choose-an-outbound-mode"><strong>Choose an outbound mode</strong><span>Rule, Global, and Direct</span></a>
  <a href="#choose-a-route"><strong>Choose a route</strong><span>Policy groups, nodes, and latency</span></a>
  <a href="#connect-and-use-quick-controls"><strong>Connect and use quick controls</strong><span>Home, Control Center, and Shortcuts</span></a>
  <a href="#inspect-active-connections"><strong>Inspect active connections</strong><span>Rules, proxy chains, and live traffic</span></a>
  <a href="#confirm-a-setting"><strong>Confirm a setting</strong><span>Check a genuinely new connection</span></a>
</nav>

## Manage Profiles

### Open the Profile list

- iPhone: tap the current Profile name at the top left of Home to open
  **Profile Center**, then its profile library.
- iPad: at regular width, open **Profiles** from the sidebar; narrow split views
  use the same path as iPhone.

The **Add Profile** card in the library offers three ways in: paste a Profile
URL into its link field, **Scan QR Code** (or choose a QR code from Photos), or
**Import File**. To combine existing nodes and rules into a new configuration,
tap ⊕ at the top right and choose **Create Profile**, then pick nodes and rules.

Tap a row to switch. The active Profile shows a checkmark, and Home updates to
the new name when switching completes. Touch and hold a row to update it, copy
its link, or delete it.

Tap a row's ⓘ to open its configuration page:

- **Name**, at the top of the **Configuration** section, can be edited in place;
  it saves when you leave the field.
- **Configuration Override** chooses a rule scheme and adds custom rules and an
  override script.
- Sections such as General Configuration, DNS, Inbounds, Proxy Groups, and
  Route Rules list every setting in the configuration.
- At the bottom are **Edit Source**, **Check Configuration**, **Save as Rule
  Scheme**, **Duplicate Profile**, and **Export**. When a configuration is too
  large to edit, **Edit Source** becomes **View Source**: you can jump through
  its outline, search, and copy lines, but not change them.

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

## Choose a route

Open **Proxies**, find the policy group responsible for the traffic, and choose
a node inside it. The selected card uses a highlighted background and leading
accent line. Cards also report a latency value, failure, or timeout.

When connected, use **Test All** to compare response times on the current
network; after a search, it tests only the results. **Jump to Current Node** on
a group header scrolls to the node in use. Lower latency can be useful, but it
does not guarantee higher throughput on every network. iPad uses a multi-column
grid at wider sizes.

A node whose test failed shows a red dot. Open its ⓘ **Node Details**; under
**Latency Test** you see the reason reported by the core, such as an MTU out of
range, rather than only a timeout.

## Connect and use quick controls

Return to Home and connect. The first time, approve the system request to add a
VPN configuration. Home then reports connection state, duration, and live
traffic.

iPhone and iPad also provide common actions through Control Center and
Shortcuts. Automatic connection behavior follows the on-demand conditions you
choose.

## Inspect active connections

- iPhone: **Utilities** → **This Connection** → **Activity**.
- iPad: open **Activity** from the sidebar at regular width; narrow split
  views use the iPhone path.

Switch between **Connections**, **Requests**, and **Logs** at the top of
Activity. Connections shows destinations, matched rules, outbound targets, proxy chains,
and transferred bytes. Search, sort, inspect details, close one connection, or
use **Close All** to end current active connections. The originating app may
reconnect according to its own behavior.

## Confirm a setting

Check these in order:

1. The Profile checkmark and Home name have moved to the intended Profile.
2. The Outbound Mode indicator is on the intended mode.
3. The intended node is selected inside the intended policy group.
4. Make sure the target app establishes a **new connection**, then inspect its
   matched rule and proxy chain under Activity › Connections.

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
- **Switch between Rule, Global, and Direct:** existing connections stay open
  on their original route; new connections use the new mode.
- **When switching to Global:** if the app also has to select a node in the
  `GLOBAL` group for you, that counts as a node change, and active connections
  end while the default **Close connections on node switch** setting is on.
- **Change a node manually:** active connections end when **Close connections
  on node switch** is enabled. Disabling it leaves old connections in place.
  The setting is under **More › App Settings › Client Settings**.
- **Stop and reconnect the Tunnel:** all connections are interrupted; new ones
  use current settings.

Avoid changing a Profile, node, or the Tunnel during an important download,
call, or game. To move traffic immediately, use **Close All** in Connections,
then make the target app establish a new connection.
