---
title: Apple TV guide
description: Add and switch Clash Profiles, choose modes and nodes, connect, inspect Connections, and confirm when a new setting takes effect on Apple TV.
keywords:
  - Clash Apple TV guide
  - Clash tvOS Profile
  - choose Clash Apple TV node
  - Clash tvOS Connections
pageClass: clash-device-guide-page
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: How to use Clash on Apple TV
  description: Add a Profile, choose a mode and node, connect, inspect active connections, and confirm a setting is in use.
  inLanguage: en-US
  step:
    - "@type": HowToStep
      position: 1
      name: Add a Profile
      text: Add a configuration through an HTTP or HTTPS Profile URL, or restore one from iCloud.
    - "@type": HowToStep
      position: 2
      name: Choose a mode and node
      text: Choose an outbound mode from Using on Home, then select a route on the node screen.
    - "@type": HowToStep
      position: 3
      name: Connect
      text: Start the Tunnel from Home.
    - "@type": HowToStep
      position: 4
      name: Inspect Connections
      text: View proxied, direct, and rejected connections passing through the Tunnel.
---

# Apple TV guide

From adding a Profile to selecting a node with the remote and inspecting live
connections, this page covers only Apple TV.

<nav class="everyday-task-grid" aria-label="Apple TV guide topics">
  <a href="#manage-profiles"><strong>Manage Profiles</strong><span>Add by URL, restore from iCloud, and update</span></a>
  <a href="#choose-an-outbound-mode"><strong>Choose an outbound mode</strong><span>Rule, Global, and Direct</span></a>
  <a href="#choose-a-node"><strong>Choose a node</strong><span>Policy groups, focus, and the active route</span></a>
  <a href="#connect-the-tunnel"><strong>Connect the Tunnel</strong><span>Start or stop from Home</span></a>
  <a href="#inspect-active-connections"><strong>Inspect active connections</strong><span>Proxied, direct, and rejected</span></a>
  <a href="#confirm-a-setting"><strong>Confirm a setting</strong><span>Check a genuinely new connection</span></a>
</nav>

## Manage Profiles

From the `Using` section on Home, select the current Profile name to open the
Profile list. There are two ways to add one:

- **Add profile**: enter an HTTP or HTTPS Profile URL with the remote, or wait
  for the keyboard prompt on your iPhone and type or paste it there.
- **Restore from iCloud**: restore the configurations an iPhone, iPad, or Mac shares.
  On that device, open Clash's **Backup & Restore** and turn on **Sync
  Profiles to Apple TV**; Apple TV must be signed in to iCloud. With several
  devices, first choose the one to restore from. Restored configurations stay
  current with that device, and Apple TV never writes anything back.
  Configurations that refer to local resource files are skipped. This option
  also appears on the welcome screen before you add anything.

Apple TV has no configuration-file import, pasted YAML, QR, or blank-Profile
entry: tvOS guarantees apps very little local storage and may clear files at any
time, while a URL survives.

Select a Profile to open its details. The actions depend on its state:

- The current Profile shows **In use** and offers **Script**, **Rules**,
  **Update now**, **Auto update**, **Edit**, and **Remove**.
- A non-active Profile has no **Update now** and adds **Use this profile**.
- A Profile restored from iCloud has no URL, so it has no Script, Rules, or Auto
  update.

What each action does:

- **Edit** changes the name and URL. Saving a new URL downloads it right away;
  content from the old URL is no longer used.
- **Rules** chooses Default Rules, Lazy Rules, or Profile's own rules. The first
  two use only the nodes from this URL; Profile's own rules runs the whole
  configuration as written. The current Profile refetches immediately; others
  apply the change the next time they are used.
- **Script** takes the URL of an override script, which runs after the rules
  are applied each time the Profile is fetched. Leave it empty to run the
  configuration as is.
- **Auto update** is Manual or every few hours. Once the interval has passed,
  Clash fetches when you open it, and in the background when tvOS allows. The
  interval is the earliest possible update, not a promise.

::: tip Profiles may contain credentials
A Profile URL can contain server credentials. When asking for help publicly, do
not post real URLs, usernames, passwords, keys, or unredacted logs.
:::

## Choose an outbound mode

Open Outbound Mode from the `Using` section on Home:

| Mode | What it does |
|---|---|
| **Rule** | Uses the active Profile to decide whether each connection goes direct, uses a proxy, or is rejected |
| **Global** | Sends traffic to the global proxy group and its selected route |
| **Direct** | Connects without a proxy |

Treat the moved selection indicator as the result; the screen also reports
**In force** or **Currently in force**. When Global has no usable proxy, Clash
keeps the previous mode and explains why.

Direct does not use a proxy, so the node screen does not list policy groups or
nodes. They return when you switch to Rule or Global.

## Choose a node

Select **Node** on Home, or open **Utilities** → **Nodes**. Move focus through
policy groups on the left, then select a node from the grid on the right. The
active node shows **In use**.

**Test all** in the header tests the current group, and each node shows its most
recent result. A url-test group whose node you fixed by hand can be handed back
to automatic selection with **Unfix**. Load-balance and relay groups have no
members to pick by hand, and the screen explains why.

In Rule mode, different connections can use different policy groups, so there
is no single “current node” that represents all traffic.

## Connect the Tunnel

Return to Home and start the Tunnel. The first time, approve the system request
to add a VPN configuration. Home then reports connection state, duration, and
live traffic. Stop the Tunnel from the same screen when needed.

If connecting fails, Home offers **Reinstall VPN Profile**, which removes
Clash's VPN configuration from the system and adds it again; then press
**START**.

## Inspect active connections

Open **Utilities** → **Connections**. Filter the live list by All, Proxied,
Direct, or Rejected to see traffic currently passing through the Tunnel.

Select a connection to open its details: proxy chain, rule, destination,
source, network, DNS mode, upload, download, duration, and whether it is still
live.

Connections on Apple TV cannot close a single connection and has no **Close
All**.

## Settings under More

The **More** tab gathers Apple TV's settings and information:

- **Connect automatically**: Apple TV connects as soon as it is on and online,
  without opening Clash first. **STOP** does not turn this off; it only
  disconnects until you press **START** again.
- **IP Stack**: the IP lookup mode and TUN IPv6 level. Changing it reconnects.
- **DNS**: the DNS servers in your configuration, read-only.
- **User-Agent**: the identity used to download profiles: Clash (default),
  FlClash, or Clash Verge.
- **Share on this network**: lets other devices on the same network use this
  Apple TV as an HTTP / SOCKS5 proxy, with the port, username, and password
  from your configuration. Available only while connected.
- **External Controller**: **Use Configuration** or **Local Network**. With
  Local Network, [clash-cli](/guide/clash-cli) on a Mac can control this Apple TV
  over the local network; the screen shows the address, secret, and certificate
  fingerprint, and can create a new secret or certificate. Stop and start again
  for a change to apply.
- **Speed Unit**: bits (Mbps) or bytes (MB/s) for the speed on Home.
- **Diagnostics**: connection state, memory, what is loaded, and the most recent
  problem. **External resources** inside it lists the status of proxy and rule
  providers.
- **Logs**: read on the TV only. Apple TV cannot send files, so logs cannot be
  exported.
- **Geo data**: the GeoIP and GeoSite data in use.
- **Version**: the app version and build, with the core version below.

## Confirm a setting

Check these in order:

1. Profile details show **In use**.
2. Outbound Mode reports the intended mode **In force**.
3. The intended node shows **In use** in its policy group.
4. Make the target app establish a **new connection**, then use Connections to
   check whether it is Proxied, Direct, or Rejected.

Reloading content or starting playback again can still reuse an existing
connection. Apple TV does not provide connection-closing controls. When every
old connection must end, stop and reconnect the Tunnel.

Apple TV does not currently provide an External IP card. In Rule mode, a single
exit-IP lookup would not represent every destination anyway.

## What happens to existing connections?

- **Switch Profile:** Clash disconnects the Tunnel, then reconnects with the
  selected Profile. All existing connections are interrupted.
- **Switch a mode or node:** Clash does not actively close existing connections.
  Old connections remain on their original route; new connections use the new
  mode or node.
- **Stop and reconnect the Tunnel:** all connections are interrupted; new ones
  use current settings.

Avoid changing a Profile or the Tunnel during important playback, a call, or a
game. To verify a new setting, make the target app establish a new connection
and check its actual category in Connections.
