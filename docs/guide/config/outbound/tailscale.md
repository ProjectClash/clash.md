---
title: Tailscale
---

# Tailscale

This outbound has Clash join your Tailnet as a device, so it does not use ordinary server and port fields. Device authorization and route permissions must also be granted by the control service.

## Complete example {#example}

This is a minimal working configuration: one Tailscale node, one group, and two rules that send Tailnet names and addresses to it. Replace `auth-key`; you can rename `ts` and `TAILNET` as long as the references match.

```yaml
proxies:
  - name: ts
    type: tailscale
    hostname: my-iphone
    auth-key: YOUR_TAILSCALE_AUTH_KEY # omit to join with a login link, see below
    udp: true
    # control-url: https://your-control-server # for a self-hosted control server

proxy-groups:
  - name: TAILNET
    type: select
    proxies: [ts]

rules:
  - DOMAIN-SUFFIX,ts.net,TAILNET
  - IP-CIDR,100.64.0.0/10,TAILNET,no-resolve
  - MATCH,DIRECT
```

- Keep both rules. With only `IP-CIDR`, connections that arrive with a domain
  name, such as MagicDNS names, do not reach this node.
- `MATCH,DIRECT` is just the example's fallback. When merging into an existing
  configuration, put the first two rules ahead of your own rules.

## Join the Tailnet {#join}

- Generate the `auth-key` in the Tailscale admin console under **Settings › Keys**.
- If device approval is on for your Tailnet, approve this device in the admin
  console before it can carry traffic.
- The node does not come online when the configuration loads: Clash joins the
  Tailnet when the first connection reaches it, or the first time it resolves a
  name through it. Joining takes about ten seconds, and the first one or two
  requests may time out meanwhile; just retry.
- After setting it up, open a 100.x address in your Tailnet through it once, then
  look for the device in the admin console.

### Without an auth-key {#login-link}

You can join without an `auth-key`. When the first connection reaches the node,
the log shows a login link:

```text
[Tailscale](ts) To start this tsnet server, restart with TS_AUTHKEY set, or go to: https://login.tailscale.com/a/…
```

With a self-hosted control server, the link is `<control-url>/register/…`. Open
it in a browser and sign in; about ten seconds later the node connects on its own,
with no restart. Until you sign in, connections through it time out. After that,
the identity is kept in `state-dir`, and you are not asked to sign in again.

`log-level` in the configuration must be `info` for the link to appear in the
log; at `warning` or higher it is hidden.

## Where the device identity is kept {#state-dir}

The device's Tailnet identity is kept in the `state-dir` folder, so it stays the
same device after a restart. By default this is a `tailscale` folder in the
configuration directory; to set your own, a relative path is enough and lands in
the configuration directory.

With `ephemeral` on, the device joins as an ephemeral node, and Tailscale removes
it from the Tailnet after it goes offline.

## Resolve names through Tailscale {#dns}

A DNS server can be written as `tailscale://node-name`, or `ts://node-name` for
short, to resolve through that Tailscale node. The node name is the `name` in
`proxies`; `tailscale://` without a node name fails with
`missing Tailscale proxy name`.

### Reach MagicDNS names {#magicdns}

Use the full MagicDNS name, `machine-name.<tailnet>.ts.net`; the short machine
name alone does not resolve. By DNS mode:

- **fake-ip (recommended)**: the `DOMAIN-SUFFIX,ts.net` rule above is enough. You
  need no `nameserver-policy` and no `fake-ip-filter` entry; the node resolves
  the name with the Tailnet's DNS itself.
- **redir-host**: also add this `nameserver-policy`:

  ```yaml
  dns:
    nameserver-policy:
      "+.ts.net": tailscale://ts
  ```

- **fake-ip, alternative**: adding `+.ts.net` to `fake-ip-filter` together with
  the `nameserver-policy` above also works.

What does not work: in fake-ip mode, only the `nameserver-policy`, with neither a
`fake-ip-filter` entry nor a `ts.net` domain rule. Connections then fall through
to the fallback rule, go direct, and time out.

## Reach the internet through an exit node {#exit-node}

Add `exit-node` to the node, then send the traffic you want on the public internet
to it with rules (for example, point `MATCH` at `TAILNET`). That traffic then
leaves through the exit device in your Tailnet. `exit-node` takes the machine
name, the Tailnet address (100.x), or the full MagicDNS name:

```yaml
proxies:
  - name: ts
    type: tailscale
    hostname: my-iphone
    auth-key: YOUR_TAILSCALE_AUTH_KEY
    udp: true
    exit-node: 100.64.0.10
```

- That device must offer itself as an exit node in Tailscale and be approved in
  the admin console. If it isn't, the configuration still loads with only a
  warning in the log, `set exit node failed: … is not advertising an exit node`;
  Tailnet access works as usual, and internet access through it times out.
- The exit node is set only when the node starts. If that device offers or is
  approved as an exit node later, reload the configuration or restart Clash.
- Names reached through the exit node are resolved by the Tailnet's DNS, not by
  Clash's DNS settings.
- An exit node does not forward its own local network to you; that is what
  subnet routes are for.

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `hostname` | Device name shown in the Tailnet. |
| `auth-key` | Authorization key for joining the Tailnet, generated under **Settings › Keys** in the Tailscale admin console; omit it to join with a [login link](#login-link). |
| `control-url` | Set for a custom control server; omit for ordinary Tailscale. |
| `udp` | Whether UDP traffic also goes through this node. |
| `accept-routes` | Accept subnet routes advertised in the Tailnet. |
| `exit-node` | Exit node, as a machine name, Tailnet address, or full MagicDNS name. See [above](#exit-node). |
| `exit-node-allow-lan-access` | Whether the local network stays directly reachable while an exit node is in use. |
| `state-dir` | Folder that keeps the device identity; defaults to a `tailscale` folder in the configuration directory. See [above](#state-dir). |
| `ephemeral` | Join as an ephemeral device, which Tailscale removes after it goes offline. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/tailscale/).
