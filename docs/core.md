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
      <a class="product-action product-action--primary" href="https://github.com/ProjectClash/Clash/releases" target="_blank" rel="noopener noreferrer">View SDK releases</a>
      <a class="product-action product-action--secondary" href="https://github.com/ProjectClash/Clash" target="_blank" rel="noopener noreferrer">View source code</a>
    </div>
  </div>
  <div class="core-release-panel" aria-label="Clash Core SDK and its upstream core">
    <img class="core-logo" src="/brand/clash-app-icon.svg" alt="Clash Core logo" width="256" height="256">
    <p>SDK upstream core</p>
    <strong>mihomo 1.19.31</strong>
    <div class="core-public-release"><span>SDK releases</span><a href="https://github.com/ProjectClash/Clash/releases" target="_blank" rel="noopener noreferrer">Clash Core ↗</a></div>
    <div class="core-platform-chips"><span>iOS</span><span>iPadOS</span><span>macOS</span><span>tvOS</span></div>
  </div>
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
      <h3>Apple public APIs only</h3>
      <p>Clash Core runs inside NetworkExtension and moves packets through the public <code>NEPacketTunnelFlow</code> API—without private APIs or file-descriptor tricks.</p>
    </article>
    <article>
      <span>02</span>
      <h3>Control stays on-device</h3>
      <p>Status, traffic, connections, and logs travel over an app-private local channel, with no extra network-accessible controller.</p>
    </article>
    <article>
      <span>03</span>
      <h3>Profiles stay with the client</h3>
      <p>Clash Core never downloads or stores profile URLs or credentials. The client prepares the runtime configuration; Clash Core applies its rules.</p>
    </article>
  </div>
</section>

<section class="core-section core-benchmarks" aria-labelledby="core-benchmarks-title">
  <div class="core-section-heading core-section-heading--light">
    <p class="section-kicker">Measured on an iPad Pro (M2)</p>
    <h2 id="core-benchmarks-title">No “should be fast.”<br>See how fast it ran.</h2>
  </div>
  <div class="core-metric-grid">
    <article><strong>924<small> Mbps</small></strong><span>Public-network download</span><p>545 Mbps up · 5 ms latency</p></article>
    <article><strong>18.7<small> MiB</small></strong><span>Core memory at speed</span><p>Lightweight under high throughput</p></article>
    <article><strong>16.49<small> GB</small></strong><span>30-minute pressure run</span><p>0 disconnects · 0 packet loss · 0 crashes</p></article>
    <article><strong>39.6<small> MiB</small></strong><span>400 concurrent connections</span><p>Within a 50 MiB test budget</p></article>
  </div>
  <p class="core-benchmark-note">Speed tests cannot exceed the available bandwidth of the test network. These figures come from a controlled run on the stated device, network, and build; actual performance varies with device, route, and configuration.</p>
</section>

<section class="core-section core-trust" aria-labelledby="core-trust-title">
  <div class="core-section-heading">
    <p class="section-kicker">Open source · independently reviewable</p>
    <h2 id="core-trust-title">Performance can be measured.<br>Security should be inspectable.</h2>
    <p>Clash Core builds on stable mihomo releases and is adapted for Apple NetworkExtension. SDK versions are separate from the Clash App Store app version. The core uses the GPL-3.0 license; source code, build details, and future SDK releases share a home at ProjectClash/Clash.</p>
  </div>
  <div class="core-release-facts">
    <article><span>SDK upstream core</span><strong>mihomo 1.19.31</strong><p>Built for all five Apple slices</p></article>
    <article><span>SDK releases</span><strong>Clash Core</strong><p>Find SDK releases and build artifacts on GitHub</p></article>
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
    <article><span>Local control</span><h3>Runtime state stays visible</h3><p>Status, traffic, connections, proxies, logs, latency tests, and connection control remain available to the app locally.</p></article>
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
