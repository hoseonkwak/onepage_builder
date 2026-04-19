<template>
  <section :id="id" class="section map-sec">
    <div class="container-custom">
      <div class="section-header">
        <h2 class="section-title">{{ content.title }}</h2>
        <div v-if="content.showDivider" class="section-divider"></div>
        <p v-if="content.subtitle" class="section-subtitle">{{ content.subtitle }}</p>
      </div>

      <div class="map-sec__info">
        <div v-if="content.address" class="map-sec__row">
          <Icon name="mdi:map-marker" class="icon-24 map-sec__icon" />
          <span>{{ content.address }}</span>
        </div>
        <div v-if="content.phone" class="map-sec__row">
          <Icon name="mdi:phone" class="icon-24 map-sec__icon" />
          <a :href="`tel:${content.phone}`">{{ content.phone }}</a>
        </div>
      </div>

      <div class="map-sec__frame" :style="{ height: `${content.height}px` }">
        <iframe
          v-if="content.embedUrl"
          :src="content.embedUrl"
          class="map-sec__iframe"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <div v-else class="map-sec__placeholder">
          <Icon name="mdi:map" class="icon-48 color-gray-300" />
          <p>지도 embed URL을 설정해주세요</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { MapContent } from '~/types/site'

interface Props {
  id?: string
  content: MapContent
}

defineProps<Props>()
</script>

<style scoped>
.map-sec__info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: var(--gray-50);
  border-radius: var(--radius-lg);
}

.map-sec__row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--gray-700);
}

.map-sec__icon {
  color: var(--primary-500);
  flex-shrink: 0;
}

.map-sec__frame {
  border-radius: var(--radius-lg);
  overflow: hidden;
  background-color: var(--gray-100);
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
  color: var(--gray-500);
  gap: 0.5rem;
}

.icon-24 { width: 1.5rem; height: 1.5rem; }
.icon-48 { width: 3rem; height: 3rem; }
.color-gray-300 { color: var(--gray-300); }
</style>
