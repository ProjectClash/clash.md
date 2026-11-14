---
layout: doc
title: Clash Core for Apple
description: Clash Core is the fully open-source, mihomo-based Apple proxy core that powers Clash, with SDK releases, build details, and measurements on real Apple hardware.
keywords:
  - Clash Core
  - mihomo Apple core
  - NetworkExtension proxy core
  - open-source network core
  - Clash Core xcframework
jsonLd:
  "@context": https://schema.org
  "@graph":
    - "@type": WebPage
      "@id": https://clash.md/core#webpage
      url: https://clash.md/core
      name: Clash Core for Apple
      description: Clash Core is the fully open-source, mihomo-based Apple proxy core that powers Clash, with SDK releases, build details, and measurements on real Apple hardware.
      inLanguage: en-US
      isPartOf:
        "@id": https://clash.md/#website
      mainEntity:
        "@id": https://clash.md/#core
      publisher:
        "@id": https://clash.md/#organization
      primaryImageOfPage:
        "@type": ImageObject
        contentUrl: https://clash.md/brand/clash-app-icon.svg
    - "@type": SoftwareSourceCode
      "@id": https://clash.md/#core
      name: Clash Core
      description: The fully open-source, mihomo-based Apple proxy core that powers Clash, tuned for Apple NetworkExtension and published with versioned SDK releases.
      url: https://clash.md/core
      image: https://clash.md/brand/clash-app-icon.svg
      codeRepository: https://github.com/ProjectClash/Clash
      sameAs: https://github.com/ProjectClash/Clash
      license: https://www.gnu.org/licenses/gpl-3.0.html
      programmingLanguage: Go
      runtimePlatform:
        - iOS
        - iPadOS
        - macOS
        - tvOS
      isBasedOn: https://github.com/MetaCubeX/mihomo
      isPartOf:
        "@id": https://clash.md/#app
      publisher:
        "@id": https://clash.md/#organization
      inLanguage: en-US
sidebar: false
aside: false
outline: false
pageClass: core-product-page
---

<section class="core-hero">
  <div class="core-hero-copy">
    <p class="product-eyebrow">Clash Core · Built on mihomo</p>
    <h1><span>Speed, measured.</span><span>Trust, open source.</span></h1>
    <p class="core-hero-lede">Clash Core is the proxy core that powers Clash. Built on proven mihomo and retuned for Apple NetworkExtension constraints, it handles traffic on your device—with performance measured on real hardware and its complete source code open for anyone to inspect.</p>
    <div class="product-actions">
      <a class="product-action product-action--primary" href="https://github.com/ProjectClash/Clash/releases/tag/v1.19.34-clash.1" target="_blank" rel="noopener noreferrer">Download the latest SDK</a>
      <a class="product-action product-action--secondary" href="https://github.com/ProjectClash/Clash" target="_blank" rel="noopener noreferrer">View source code</a>
    </div>
  </div>
  <div class="core-release-panel" aria-label="Latest Clash Core SDK and its upstream core">
    <img class="core-logo" src="/brand/clash-app-icon.svg" alt="Clash Core logo" width="256" height="256">
    <p>Latest SDK</p>
    <strong><a href="https://github.com/ProjectClash/Clash/releases/tag/v1.19.34-clash.1" target="_blank" rel="noopener noreferrer">v1.19.34-clash.1</a></strong>
    <div class="core-public-release"><span>Upstream core</span><a href="https://github.com/MetaCubeX/mihomo/releases/tag/v1.19.34" target="_blank" rel="noopener noreferrer">mihomo 1.19.34 ↗</a></div>
    <div class="core-platform-chips"><span>iOS</span><span>iPadOS</span><span>macOS</span><span>tvOS</span></div>
  </div>
</section>

<section class="core-section core-benchmarks" aria-labelledby="core-benchmarks-title">
  <div class="core-bench-light" aria-hidden="true"><span class="core-bench-curtain"></span><span class="core-bench-beam"></span></div>
  <div class="core-section-heading core-section-heading--light core-bench-heading">
    <p class="section-kicker">Measured on Mac, iPhone, iPad, and Apple TV</p>
    <p class="core-bench-figure" aria-hidden="true"><span>10</span><small>Gbit/s</small></p>
    <h2 id="core-benchmarks-title">Mac, iPhone, and iPad top<br>10 Gbit/s on one connection.</h2>
  </div>
  <ol class="core-bench-bars" aria-label="Single-connection download and upload speed by device">
    <li style="--v: 14.16"><span class="core-bench-device">Mac mini (M4 Pro)</span><span class="core-bench-track" aria-hidden="true"><span></span></span><span class="core-bench-value"><span><strong>14.16</strong> Gbit/s</span><small>11.58 Gbit/s up</small></span></li>
    <li style="--v: 12.29"><span class="core-bench-device">iPhone 17 Pro Max</span><span class="core-bench-track" aria-hidden="true"><span></span></span><span class="core-bench-value"><span><strong>12.29</strong> Gbit/s</span><small>9.55 Gbit/s up</small></span></li>
    <li style="--v: 11.00"><span class="core-bench-device">iPad Pro (M2)</span><span class="core-bench-track" aria-hidden="true"><span></span></span><span class="core-bench-value"><span><strong>11.00</strong> Gbit/s</span><small>8.62 Gbit/s up</small></span></li>
    <li style="--v: 8.32"><span class="core-bench-device">Apple TV 4K</span><span class="core-bench-track" aria-hidden="true"><span></span></span><span class="core-bench-value"><span><strong>8.32</strong> Gbit/s</span><small>6.62 Gbit/s up</small></span></li>
  </ol>
  <p class="core-benchmark-note">Both ends of the test run on the same device: traffic passes through Clash's tunnel, rules, and proxy node, but not an outside network, so this measures what Clash itself can handle, not your internet speed. On iPad, memory stays under 14 MiB during the test. Actual speeds depend on your network and node.</p>
</section>

<section class="core-section core-story" aria-labelledby="core-story-title">
  <div class="core-section-heading">
    <p class="section-kicker">The heart of Clash</p>
    <h2 id="core-story-title">Trust belongs<br>where your traffic flows.</h2>
    <p>Clash makes the network feel simple. Clash Core is the part that actually handles connections, DNS, and rules. It does not ask you to trust a promise: its runtime boundaries are built into a fully open-source implementation anyone can inspect.</p>
  </div>
  <div class="core-principle-grid">
    <article>
      <span>01</span>
      <h3>No private APIs</h3>
      <p>Clash Core runs inside NetworkExtension and reads and writes the virtual network interface the system creates for the tunnel, as WireGuard and sing-box do; when it can't, it falls back to the public <code>NEPacketTunnelFlow</code> API. It never calls private APIs.</p>
    </article>
    <article>
      <span>02</span>
      <h3>Control stays on-device</h3>
      <p>Status, traffic, connections, and logs travel over an app-private local channel by default. Only when you choose Local Network for the External Controller does it open to your local network, encrypted and protected by a secret.</p>
    </article>
    <article>
      <span>03</span>
      <h3>Profiles stay with the client</h3>
      <p>The client downloads and stores profile URLs, then hands Clash Core the prepared runtime configuration. Clash Core applies it and only fetches resources that configuration declares, such as rule sets and geo data.</p>
    </article>
  </div>
</section>

<section class="core-section core-trust" aria-labelledby="core-trust-title">
  <div class="core-section-heading">
    <p class="section-kicker">Open source · independently reviewable</p>
    <h2 id="core-trust-title">Performance can be measured.<br>Security should be inspectable.</h2>
    <p>Clash Core builds on stable mihomo releases and is adapted for Apple NetworkExtension. SDK versions are separate from the Clash App Store app version. The core uses the GPL-3.0 license; source code, build details, and SDK releases are all public at ProjectClash/Clash. The latest, v1.19.34-clash.1, is based on mihomo 1.19.34.</p>
  </div>
  <div class="core-release-facts">
    <article><span>Latest SDK</span><strong>v1.19.34-clash.1</strong><p>Complete source and build artifacts are on GitHub</p></article>
    <article><span>Upstream core</span><strong>mihomo 1.19.34</strong><p>Follows stable mihomo releases</p></article>
    <article><span>Apple architectures</span><strong>5 slices</strong><p>iOS device and simulator, macOS, tvOS device and simulator</p></article>
  </div>
</section>

<section class="core-section core-capabilities" aria-labelledby="core-capabilities-title">
  <div class="core-section-heading">
    <p class="section-kicker">A proven data plane</p>
    <h2 id="core-capabilities-title">The Clash capabilities you know,<br>inside Apple’s system boundaries.</h2>
  </div>
  <div class="core-capability-grid">
    <article><span>Protocols</span><h3>Connect to the routes you use</h3><p>Shadowsocks, VMess, VLESS, Trojan, Snell, Hysteria2, TUIC, WireGuard, AnyTLS, SSH, and more.</p></article>
    <article><span>DNS</span><h3>Resolution follows the rules too</h3><p>DoH, DoT, DoQ, fake-IP, traffic sniffing, and per-domain resolver policies.</p></article>
    <article><span>Routing</span><h3>Direct when it should be direct</h3><p>domain, IP-CIDR, GEOIP, GEOSITE, RULE-SET, sub-rules, and logical rules.</p></article>
    <article><span>Policy groups</span><h3>Select, test, and fail over</h3><p>select, url-test, fallback, load-balance, health checks, and remote providers.</p></article>
    <article><span>Local control</span><h3>Runtime state stays visible</h3><p>Status, traffic, connections, proxies, logs, latency tests, and connection control remain available to the app locally, and on Mac from Terminal with <a href="/guide/clash-cli">clash-cli</a>.</p></article>
    <article><span>Platform differences</span><h3>macOS adds process rules</h3><p>macOS can match process names, executable paths, and UIDs; signing-ID and team-ID matching remain unavailable. In Packet Tunnel mode, iPhone, iPad, and Apple TV do not expose per-app or per-process identity.</p></article>
  </div>
</section>

<section class="core-cta" aria-labelledby="core-cta-title">
  <p class="section-kicker">Do not take our word for it</p>
  <h2 id="core-cta-title">Want the code? Read it.</h2>
  <p>Inspect the implementation, follow SDK releases, or review the repository’s security information. Verifying Clash Core requires no one’s permission.</p>
  <div class="core-cta-links">
    <a href="https://github.com/ProjectClash/Clash" target="_blank" rel="noopener noreferrer">View source code ↗</a>
    <a href="https://github.com/ProjectClash/Clash/releases" target="_blank" rel="noopener noreferrer">View SDK releases ↗</a>
    <a href="https://github.com/ProjectClash/Clash/security" target="_blank" rel="noopener noreferrer">Repository security ↗</a>
  </div>
</section>
