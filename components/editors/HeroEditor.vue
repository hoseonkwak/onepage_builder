<template>
  <div class="hero-editor space-y-6">
    <!-- 텍스트 영역 -->
    <div class="editor-section">
      <h3 class="editor-section-title">텍스트</h3>
      <div class="space-y-3">
        <div>
          <label class="editor-label">제목</label>
          <input
            v-model="localContent.title"
            type="text"
            class="editor-input"
            placeholder="메인 제목을 입력하세요"
          />
        </div>
        <div>
          <label class="editor-label">부제목</label>
          <input
            v-model="localContent.subtitle"
            type="text"
            class="editor-input"
            placeholder="부제목을 입력하세요"
          />
        </div>
        <div>
          <label class="editor-label">설명 (선택)</label>
          <textarea
            v-model="localContent.description"
            class="editor-input"
            rows="3"
            placeholder="추가 설명을 입력하세요"
          />
        </div>
      </div>
    </div>

    <!-- 버튼 영역 -->
    <div class="editor-section">
      <h3 class="editor-section-title">버튼</h3>
      <div class="space-y-3">
        <div>
          <label class="editor-label">버튼 텍스트</label>
          <input
            v-model="localContent.buttonText"
            type="text"
            class="editor-input"
            placeholder="버튼에 표시할 텍스트"
          />
          <p class="text-xs text-gray-500 mt-1">비우면 버튼이 표시되지 않습니다</p>
        </div>
        <div>
          <label class="editor-label">버튼 링크</label>
          <input
            v-model="localContent.buttonLink"
            type="text"
            class="editor-input"
            placeholder="#section 또는 /page"
          />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="editor-label">배경색</label>
            <div class="flex gap-2">
              <input
                v-model="localContent.buttonBgColor"
                type="color"
                class="color-picker"
              />
              <input
                v-model="localContent.buttonBgColor"
                type="text"
                class="editor-input flex-1"
                placeholder="#3b82f6"
              />
            </div>
          </div>
          <div>
            <label class="editor-label">글자색</label>
            <div class="flex gap-2">
              <input
                v-model="localContent.buttonTextColor"
                type="color"
                class="color-picker"
              />
              <input
                v-model="localContent.buttonTextColor"
                type="text"
                class="editor-input flex-1"
                placeholder="#ffffff"
              />
            </div>
          </div>
        </div>
        <div>
          <label class="editor-label">모서리 둥글기 (px)</label>
          <div class="flex items-center gap-3">
            <input
              v-model.number="localContent.buttonBorderRadius"
              type="range"
              min="0"
              max="50"
              step="1"
              class="flex-1"
            />
            <input
              v-model.number="localContent.buttonBorderRadius"
              type="number"
              class="editor-input w-20"
              min="0"
              max="50"
            />
          </div>
          <div class="flex gap-2 mt-2">
            <button
              v-for="preset in radiusPresets"
              :key="preset.value"
              class="flex-1 py-1.5 px-2 text-xs rounded-md border transition-colors"
              :class="localContent.buttonBorderRadius === preset.value
                ? 'bg-primary-500 text-white border-primary-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-primary-300'"
              @click="localContent.buttonBorderRadius = preset.value"
            >
              {{ preset.label }}
            </button>
          </div>
        </div>
        <!-- 버튼 미리보기 -->
        <div>
          <label class="editor-label">미리보기</label>
          <div class="p-3 bg-gray-200 rounded-md flex justify-center">
            <span
              class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium"
              :style="{
                backgroundColor: localContent.buttonBgColor,
                color: localContent.buttonTextColor,
                borderRadius: `${localContent.buttonBorderRadius}px`
              }"
            >
              {{ localContent.buttonText || '버튼' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 배경 영역 -->
    <div class="editor-section">
      <h3 class="editor-section-title">배경</h3>
      <div class="space-y-3">
        <div>
          <label class="editor-label">배경 이미지 URL</label>
          <input
            v-model="localContent.backgroundImage"
            type="text"
            class="editor-input"
            placeholder="https://example.com/image.jpg"
          />
          <p class="text-xs text-gray-500 mt-1">비우면 기본 배경색이 적용됩니다</p>
        </div>
      </div>
    </div>

    <!-- 정렬 옵션 -->
    <div class="editor-section">
      <h3 class="editor-section-title">텍스트 정렬</h3>
      <div class="flex gap-2">
        <button
          v-for="align in alignOptions"
          :key="align.value"
          class="flex-1 py-2 px-3 text-sm rounded-md border transition-colors"
          :class="localContent.textAlign === align.value
            ? 'bg-primary-500 text-white border-primary-500'
            : 'bg-white text-gray-700 border-gray-300 hover:border-primary-300'"
          @click="localContent.textAlign = align.value"
        >
          {{ align.label }}
        </button>
      </div>
    </div>

    <!-- 높이 설정 -->
    <div class="editor-section">
      <h3 class="editor-section-title">높이</h3>
      <div class="space-y-3">
        <div>
          <label class="editor-label">섹션 높이 (px)</label>
          <input
            v-model.number="localContent.height"
            type="number"
            class="editor-input"
            min="300"
            max="1000"
            step="50"
            placeholder="500"
          />
          <p class="text-xs text-gray-500 mt-1">최소 300px ~ 최대 1000px</p>
        </div>
        <div class="flex gap-2">
          <button
            v-for="preset in heightPresets"
            :key="preset.value"
            class="flex-1 py-2 px-3 text-sm rounded-md border transition-colors"
            :class="localContent.height === preset.value
              ? 'bg-primary-500 text-white border-primary-500'
              : 'bg-white text-gray-700 border-gray-300 hover:border-primary-300'"
            @click="localContent.height = preset.value"
          >
            {{ preset.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HeroContent } from '~/types/site'

interface Props {
  content: HeroContent
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update', content: HeroContent): void
}>()

const alignOptions = [
  { value: 'left' as const, label: '왼쪽' },
  { value: 'center' as const, label: '가운데' },
  { value: 'right' as const, label: '오른쪽' }
]

const heightPresets = [
  { value: 400, label: '작게' },
  { value: 500, label: '보통' },
  { value: 700, label: '크게' }
]

const radiusPresets = [
  { value: 0, label: '각진' },
  { value: 8, label: '기본' },
  { value: 20, label: '둥근' },
  { value: 50, label: '원형' }
]

// Local copy for editing
const localContent = reactive<HeroContent>({ ...props.content })

// Watch for changes and emit
watch(localContent, (newVal) => {
  emit('update', { ...newVal })
}, { deep: true })

// Update local when props change
watch(() => props.content, (newVal) => {
  Object.assign(localContent, newVal)
}, { deep: true })
</script>

<style scoped>
.editor-section {
  @apply bg-gray-50 rounded-lg p-4;
}

.editor-section-title {
  @apply text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200;
}

.editor-label {
  @apply block text-sm text-gray-600 mb-1;
}

.editor-input {
  @apply w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors;
}

textarea.editor-input {
  @apply resize-none;
}

.color-picker {
  @apply w-10 h-10 rounded-md border border-gray-300 cursor-pointer;
  padding: 2px;
}

.color-picker::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-picker::-webkit-color-swatch {
  border: none;
  border-radius: 4px;
}
</style>
