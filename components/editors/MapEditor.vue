<template>
  <div class="map-editor stack-6">
    <div class="editor-section">
      <h3 class="editor-section-title">주소</h3>
      <div class="stack-3">
        <div>
          <label class="editor-label">주소 입력</label>
          <input
            v-model="localContent.address"
            type="text"
            class="editor-input"
            placeholder="서울특별시 관악구 신림로 340"
            @input="emitUpdate"
          />
          <p class="hint">주소를 입력하면 해당 위치의 지도가 자동으로 표시됩니다</p>
        </div>
        <div>
          <label class="editor-label">지도 높이 ({{ localContent.height }}px)</label>
          <div class="range-field">
            <input
              v-model.number="localContent.height"
              type="range"
              min="300"
              max="800"
              step="10"
              class="range-input"
              @input="emitUpdate"
            />
            <input
              v-model.number="localContent.height"
              type="number"
              class="editor-input range-number"
              min="200"
              max="1000"
              @input="emitUpdate"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="localContent.address" class="editor-section">
      <h3 class="editor-section-title">미리보기</h3>
      <div class="map-preview" :style="{ height: '200px' }">
        <iframe
          :src="previewUrl"
          class="map-preview__iframe"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MapContent } from '~/types/site'

interface Props {
  content: MapContent
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update', content: MapContent): void
}>()

const localContent = reactive<MapContent>({ ...props.content })

const previewUrl = computed(() => {
  const q = encodeURIComponent(localContent.address || '')
  return `https://maps.google.com/maps?q=${q}&output=embed`
})

const emitUpdate = () => {
  emit('update', { ...localContent })
}

watch(() => props.content, (newVal) => {
  Object.assign(localContent, newVal)
}, { deep: true })
</script>

<style scoped>
.range-field {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.range-input { flex: 1; }
.range-number { width: 5rem; }

.map-preview {
  border-radius: var(--radius-md);
  overflow: hidden;
  background-color: var(--gray-100);
}

.map-preview__iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
