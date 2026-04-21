<template>
  <section :id="id" class="map-sec" :style="{ height: `${content.height}px` }">
    <iframe
      v-if="content.address"
      :src="embedUrl"
      class="map-sec__iframe"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      allowfullscreen
    ></iframe>
    <div v-else class="map-sec__placeholder">
      <Icon name="mdi:map" class="icon-48" />
      <p>주소를 입력해주세요</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { MapContent } from '~/types/site'

interface Props {
  id?: string
  content: MapContent
}

const props = defineProps<Props>()

const embedUrl = computed(() => {
  const q = encodeURIComponent(props.content.address || '')
  return `https://maps.google.com/maps?q=${q}&output=embed`
})
</script>

<style scoped>
.map-sec {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.map-sec__iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.map-sec__placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--gray-100);
  color: var(--gray-400);
}

.icon-48 { width: 3rem; height: 3rem; }
</style>
