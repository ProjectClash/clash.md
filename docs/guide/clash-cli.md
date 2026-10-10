---
title: clash-cli command-line tool
description: clash-cli comes built into Clash for Mac. Check status, switch nodes, inspect connections, and see which rule a site will use from Terminal — control Clash on your iPhone, iPad, and Apple TV from your Mac, or hand it to an AI assistant.
keywords:
  - clash-cli
  - Clash command line
  - Clash Terminal
  - Clash External Controller
  - Clash AI assistant
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: How to control Clash from Mac Terminal with clash-cli
  description: Turn on the External Controller, install clash-cli, then paste the terminal command to check and control Clash from Terminal.
  inLanguage: en-US
  step:
    - "@type": HowToStep
      position: 1
      name: Turn on the External Controller
      text: In Clash, open More › Client Settings › External Controller and choose This Device.
    - "@type": HowToStep
      position: 2
      name: Install clash-cli
      text: Copy the install command under Command-Line Tool on the same page and run it once in Terminal.
    - "@type": HowToStep
      position: 3
      name: Start using it
      text: Copy the Terminal Command and run it in Terminal.
---

# clash-cli command-line tool

Stay in Terminal and still have Clash at hand: check status, switch nodes,
inspect connections, and see which rule a site will use. From your Mac, you can
also control Clash on the iPhone, iPad, and Apple TV around your home, or hand
these tasks to a script or an AI assistant.

clash-cli comes built into Clash for Mac and updates with the app. There is
nothing else to download.

## Get started in three steps {#get-started}

1. **Turn on the External Controller**: in Clash, open **More › Client
   Settings › External Controller** and choose **This Device**.
2. **Install clash-cli**: under Command-Line Tool on the same page, choose
   **Copy** next to Install Command and run it once in Terminal. `clash-cli`
   then works from any folder, and app updates never require reinstalling it.
3. **Start using it**: choose **Copy** next to Terminal Command and run it in
   Terminal. The line already includes the address and secret, and shows the
   current mode, the node selected in each policy group, and live traffic. From
   then on, just type `clash-cli` commands in the same Terminal window.

The address, certificate fingerprint, and secret each have their own copy
button when you need them separately. The External Controller works while
Clash is connected, so keep Clash connected while you use it.

## Control iPhone, iPad, Apple TV, and other Macs {#other-devices}

On the device you want to control, open the External Controller and choose
**Local Network**. On iPhone, iPad, and Mac it is under **More › Client
Settings › External Controller**; on Apple TV, under **More › External
Controller**.

- **iPhone, iPad, and Mac**: choose **Copy** next to Terminal Command and run
  it in Terminal on the Mac you are using. The line already includes the
  address, secret, and certificate fingerprint. With Universal Clipboard, you
  can copy on iPhone or iPad and paste straight on your Mac.
- **Apple TV**: type the address and secret shown on the TV into Terminal on
  your Mac, for example:

  ```sh
  export CLASH_API=https://192.168.1.20:9443 CLASH_SECRET=<the TV's secret>
  clash-cli status
  ```

  The first time you connect, Terminal shows the TV's certificate fingerprint.
  Once it matches the one on screen, type `y`; clash-cli remembers it from then
  on.

Both devices need to be on the same local network. An iPhone or iPad may pause
Wi-Fi when locked, so keep its screen on or keep it on power while you control
it remotely.

## Command reference {#commands}

Every clash-cli command is listed below. `<…>` is required and `[…]` is
optional. Run `clash-cli help` in Terminal to see the same list at any time.

### Status and mode {#status}

| Command | What it does |
| --- | --- |
| `clash-cli status` | Everything at a glance: Clash version, outbound mode, memory, live traffic, connection count, and the node selected in each policy group |
| `clash-cli mode` | Show the current outbound mode |
| `clash-cli mode rule\|global\|direct` | Switch to Rule, Global, or Direct mode |
| `clash-cli configs` | Show the running settings, such as ports, TUN, and DNS |
| `clash-cli version` | Show the clash-cli version, plus the device's Clash version when connected |

### Policy groups and nodes {#proxies}

| Command | What it does |
| --- | --- |
| `clash-cli proxies` | List every policy group and its nodes |
| `clash-cli proxies <group>` | Show one policy group: its type, current selection, and all members |
| `clash-cli proxy get <group>` | The node currently selected in a policy group, and the members to choose from |
| `clash-cli proxy set <group> <node>` | Switch nodes. Any member of the group works, including nested policy groups and `DIRECT` |
| `clash-cli group unfix <group>` | Clear a manually fixed choice so an auto-test group picks on its own again |

Node names must match what the app shows exactly, including emoji and spaces.
Quote names that contain spaces, for example
`clash-cli proxy set PROXY "Hong Kong 01"`.

### Latency tests {#latency}

| Command | What it does |
| --- | --- |
| `clash-cli test <node> [test URL] [timeout ms]` | Test one node's latency |
| `clash-cli grouptest <group> [test URL] [timeout ms]` | Test each member of a policy group in turn |
| `clash-cli group test <group> [test URL] [timeout ms]` | Test the way the policy group itself does |
| `clash-cli provider test <proxy provider>` | Run one health check on a proxy provider |

The test URL defaults to `https://www.gstatic.com/generate_204` and the timeout
to 5000 ms. `test` and `grouptest` only measure and never change a selection.
`group test` first clears the fixed choice of auto-test groups (URLTest and
Fallback), so use `grouptest` when you only want to see latency.

### Connections {#connections}

| Command | What it does |
| --- | --- |
| `clash-cli connections [count]` | Active connections: destination, the policy groups and node used, the matched rule, and upload and download totals. Shows the first 20 by default |
| `clash-cli connections -f` | Keep showing connection changes: `+` for a new connection, `-` for a closed one |
| `clash-cli conn close <connection ID>` | Close one connection; the ID comes from `connections`. You are told if no such connection exists |
| `clash-cli conn close all` | Close every connection; downloads and SSH sessions in progress are interrupted |

### Rules {#rules}

| Command | What it does |
| --- | --- |
| `clash-cli rules [count]` | List rules, the first 10 by default; `0` lists all |
| `clash-cli rule match <URL\|domain\|IP> [conditions]` | Check which rule a connection would match and which policy group and node it would use. See the next section |

### Which rule will this site use? {#rule-match}

```sh
clash-cli rule match https://example.com
clash-cli rule match 1.1.1.1 port=53 network=udp
clash-cli rule match example.com --resolve
```

clash-cli shows the rule it matches and the policy group and node it will use,
without opening a connection or changing any setting. When a site is not going
through the proxy as you expect, start here.

Add these conditions to get closer to the real connection:

| Condition | Meaning |
| --- | --- |
| `port=port` | Destination port; 443 when omitted |
| `network=tcp\|udp` | Connection type |
| `src=IP` | Source address; this device when omitted |
| `process=name` | Name of the program making the connection; Mac only |
| `--resolve` | Resolve the domain first so IP-based rules take part; without it, those rules are marked undecided |

If a rule needs information you did not provide, the result is marked
undecided. The node shown is each policy group's current selection, which can
change with latency tests or manual switching.

### DNS {#dns}

| Command | What it does |
| --- | --- |
| `clash-cli dns query <domain> [record type]` | Look up a domain through Clash's DNS and list each answer's name, type, TTL, and data. A by default, or AAAA, CNAME, and so on |
| `clash-cli dns explain <domain> [record type]` | Explain which group of DNS servers this lookup would use, the candidate servers, and whether the cache answers it |
| `clash-cli flush dns` | Clear the DNS cache |
| `clash-cli flush fakeip` | Clear Fake IP records; some apps may need to reconnect afterward |

### Providers {#providers}

| Command | What it does |
| --- | --- |
| `clash-cli provider list` | List the proxy providers and rule providers in the configuration |
| `clash-cli provider update proxy <name>` | Download this proxy provider again |
| `clash-cli provider update rule <name>` | Download this rule provider again |

### Traffic and logs {#traffic-logs}

| Command | What it does |
| --- | --- |
| `clash-cli traffic [seconds]` | Live upload and download speed, plus totals, one line per second |
| `clash-cli logs [seconds] [level]` | Live logs; level is `debug`, `info` (default), `warning`, or `error` |

`traffic`, `logs`, and `connections -f` keep streaming. Give a number of
seconds to watch for that long; otherwise they keep going until you press
Ctrl-C. `-f` also keeps them going.

### Remembered devices {#devices}

| Command | What it does |
| --- | --- |
| `clash-cli forget <address:port>` | Forget a device's certificate fingerprint; the device's `https://` address works too. The next connection asks you to confirm again. This command does not connect to any device |

### Done in the app instead {#not-provided}

Switch, update, and check configurations in the Clash app.
`clash-cli reload` and `clash-cli check` point you there.

### Common options {#options}

Put any option before the command, or set its environment variable once so you
don't have to repeat it.

| Option | Environment variable | What it does |
| --- | --- | --- |
| `-u`, `--url <address>` | `CLASH_API` | The device to connect to; `http://127.0.0.1:9090` (this Mac) by default. For another device, use the address on its External Controller page |
| `--secret <secret>` | `CLASH_SECRET` | The secret from the External Controller page |
| `--secret-stdin` | — | Read the secret from standard input so it stays out of your shell history |
| `--fingerprint <fingerprint>` | `CLASH_FINGERPRINT` | Another device's certificate fingerprint; once a connection with it succeeds, it is remembered and you can leave it out. Without it, the first connection asks you to confirm and remembers it |
| `--json` | — | Output results as JSON for scripts |
| `--timeout <duration>` | `CLASH_TIMEOUT` | Timeout for each request, 8 seconds by default; write `8`, `8s`, or `500ms` |
| `-h`, `--help` | — | Show help |

## AI assistants and scripts {#ai}

Run `clash-cli skill` to get a ready-made skill file. Once your AI assistant
installs it, you can ask in plain language to check status, switch nodes, or
look into a rule:

```sh
clash-cli skill > SKILL.md
```

On iPhone and iPad, choosing This Device also lets an AI assistant on the same
device control Clash through the External Controller.

For scripts, add `--json`. Every command prints one line of JSON: `ok` is
`true` with `data` on success, or `false` with `error` on failure. Streaming
commands print one such line per update. Scripts can also check the exit code:

| Exit code | Meaning |
| --- | --- |
| 0 | Success |
| 1 | Clash returned an error |
| 2 | The command or its arguments are written incorrectly |
| 3 | Could not reach the device |
| 4 | Wrong secret, or the secret has been changed |
| 5 | Not talking to Clash, or the command is not offered in clash-cli |
| 6 | The certificate fingerprint does not match or has not been confirmed |

In a script, streaming commands such as `traffic` and `logs` stop after 3
seconds unless you give a number of seconds. clash-cli does not prompt when a
script connects to another device; use the terminal command copied from the
External Controller page, which includes the fingerprint, or connect once by
hand in Terminal first.

## Security {#security}

- **Anyone with the secret can fully control Clash**, including LAN sharing and
  the outbound mode. Keep it the way you would a password.
- If you think the secret has leaked, choose **Make New Secret** on the
  External Controller page. The old secret stops working at once, and any
  streaming command using it stops and tells you the secret changed. A new
  secret does not change the certificate fingerprint.
- If you think the certificate has leaked, choose **Make New Certificate** on
  the Certificate Fingerprint row of the Local Network tier. clash-cli on each
  Mac then reports that the fingerprint changed and sends no secret.
- With Local Network, the connection is encrypted and accepts only devices on
  the same local network.
- Before connecting to another device, clash-cli checks its certificate
  fingerprint and sends the secret only when it matches. If the fingerprint
  ever changes, it stops and tells you. Copy the Terminal Command again from
  the device's External Controller page, which carries the new fingerprint, and
  run it once, or run `clash-cli forget <address:port>` and confirm the new
  fingerprint when you connect again.
- When you no longer need it, set the External Controller back to **Use
  Configuration**.

## FAQ {#faq}

### It says it can't connect?

Make sure Clash is connected and the External Controller is set to This Device
or Local Network. When controlling another device, also check that your Mac
and the device are on the same local network and that the address and port
match the device's page.

### It says the secret is wrong?

It may have been copied incorrectly, or a new secret was made. Copy it again
from the External Controller page.

### It says it's not talking to Clash?

Another program is using that address and port. Check the address and port,
or choose a different port on the External Controller page.

### The External Controller page says "This build doesn't include clash-cli"?

Update Clash for Mac to the latest version.
