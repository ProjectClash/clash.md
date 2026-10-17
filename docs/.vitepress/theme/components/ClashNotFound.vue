<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, withBase } from 'vitepress'
import ClashMascot from './ClashMascot.vue'

const route = useRoute()
const isZh = computed(() => route.path.startsWith(withBase('/zh/')))
const homeLink = computed(() => withBase(isZh.value ? '/zh/' : '/'))
const guideLink = computed(() => withBase(isZh.value ? '/zh/guide/' : '/guide/'))
</script>

<template>
  <main class="clash-not-found">
    <ClashMascot pose="lost" />
    <div class="clash-not-found__copy">
      <p class="clash-not-found__code">404</p>
      <h1>{{ isZh ? '这条路，走不通。' : 'This route is a dead end.' }}</h1>
      <p>{{ isZh ? '页面可能搬家了。跟我回文档看看。' : 'This page may have moved. Let’s get you back to the docs.' }}</p>
      <nav :aria-label="isZh ? '继续浏览' : 'Keep exploring'">
        <a :href="guideLink">{{ isZh ? '打开使用指南' : 'Open the guide' }} <span aria-hidden="true">→</span></a>
        <a class="clash-not-found__home" :href="homeLink">{{ isZh ? '返回首页' : 'Back to home' }}</a>
      </nav>
    </div>
  </main>
</template>

<style scoped>
.clash-not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  max-width: 720px;
  margin: 0 auto;
  padding: 80px 24px 112px;
}

.clash-not-found .clash-mascot {
  width: 160px;
  height: 240px;
}

.clash-not-found__code {
  margin: 0 0 8px;
  color: var(--vp-c-text-3);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.12em;
}

.clash-not-found h1 {
  margin: 0;
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 650;
  line-height: 1.3;
  letter-spacing: -0.03em;
}

.clash-not-found h1 + p {
  margin: 14px 0;
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.7;
}

.clash-not-found nav {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 24px;
}

.clash-not-found a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  color: var(--vp-c-brand-1);
  font-size: 14px;
  font-weight: 600;
}

.clash-not-found .clash-not-found__home {
  color: var(--vp-c-text-2);
}

.clash-not-found a:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

@media (max-width: 480px) {
  .clash-not-found {
    flex-direction: column;
    gap: 20px;
    padding: 40px 24px 64px;
    text-align: center;
  }

  .clash-not-found .clash-mascot {
    width: 120px;
    height: 180px;
  }

  .clash-not-found nav {
    justify-content: center;
  }
}
</style>
