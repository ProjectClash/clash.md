<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import ClashMascot from './ClashMascot.vue'

const { lang } = useData()
const isZh = computed(() => lang.value.startsWith('zh'))
const guideLink = computed(() => withBase(isZh.value ? '/zh/guide/' : '/guide/'))
</script>

<template>
  <section class="clash-guide-invite" aria-labelledby="clash-guide-invite-title">
    <div class="clash-guide-invite__copy">
      <h2 id="clash-guide-invite-title">
        {{ isZh ? '先看文档，少走弯路。' : 'A little guidance goes a long way.' }}
      </h2>
      <p>{{ isZh ? '从第一次连接，到把 Clash 用顺手。' : 'From your first connection to making Clash your own.' }}</p>
      <a :href="guideLink">{{ isZh ? '打开使用指南' : 'Open the guide' }} <span aria-hidden="true">→</span></a>
    </div>
    <ClashMascot pose="welcome" />
  </section>
</template>

<style scoped>
.clash-guide-invite {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: calc(100% - 48px);
  max-width: 896px;
  margin: 0 auto 16px;
  padding: 24px 12px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.clash-guide-invite__copy {
  min-width: 0;
}

.clash-guide-invite h2 {
  margin: 0 !important;
  padding: 0;
  border: 0;
  font-size: clamp(20px, 2.4vw, 26px);
  line-height: 1.4;
}

.clash-guide-invite p {
  margin: 8px 0 14px;
  color: var(--vp-c-text-2);
  font-size: 15px;
}

.clash-guide-invite a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  color: var(--vp-c-brand-1);
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
}

.clash-guide-invite a:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

@media (max-width: 640px) {
  .clash-guide-invite {
    gap: 8px;
    margin-top: 0;
    padding: 20px 0 0;
  }

  .clash-guide-invite .clash-mascot {
    width: 88px;
    height: 132px;
  }
}
</style>
