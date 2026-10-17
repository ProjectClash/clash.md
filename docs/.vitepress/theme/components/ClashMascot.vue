<script setup lang="ts">
import { withBase } from 'vitepress'

withDefaults(defineProps<{ pose?: 'welcome' | 'guide' | 'lost' }>(), {
  pose: 'welcome'
})
</script>

<template>
  <img
    class="clash-mascot"
    :src="withBase(`/brand/clash-mascot-${pose}.webp`)"
    alt=""
    aria-hidden="true"
    width="512"
    height="768"
    loading="lazy"
    decoding="async"
  >
</template>

<style scoped>
.clash-mascot {
  display: block;
  flex-shrink: 0;
  width: 120px;
  height: 180px;
  margin: 0;
  object-fit: contain;
}
</style>
