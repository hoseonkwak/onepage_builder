<template>
  <div class="header-editor space-y-6">
    <!-- 로고 영역 -->
    <div class="editor-section">
      <h3 class="editor-section-title">로고</h3>
      <div class="space-y-3">
        <div>
          <label class="editor-label">로고 텍스트</label>
          <input
            v-model="localContent.logoText"
            type="text"
            class="editor-input"
            placeholder="회사명 또는 브랜드명"
          />
        </div>
        <div>
          <label class="editor-label">로고 이미지 URL</label>
          <input
            v-model="localContent.logoImage"
            type="text"
            class="editor-input"
            placeholder="https://example.com/logo.png"
          />
          <p class="text-xs text-gray-500 mt-1">이미지가 있으면 텍스트 대신 표시됩니다</p>
        </div>
      </div>
    </div>

    <!-- 로그인 영역 -->
    <div class="editor-section">
      <h3 class="editor-section-title">로그인</h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <label class="editor-label mb-0">로그인 버튼 표시</label>
          <label class="toggle">
            <input
              v-model="localContent.showLogin"
              type="checkbox"
            />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <template v-if="localContent.showLogin">
          <div>
            <label class="editor-label">로그인 텍스트</label>
            <input
              v-model="localContent.loginText"
              type="text"
              class="editor-input"
              placeholder="로그인"
            />
          </div>
          <div>
            <label class="editor-label">로그인 링크</label>
            <input
              v-model="localContent.loginLink"
              type="text"
              class="editor-input"
              placeholder="/login"
            />
          </div>
        </template>
      </div>
    </div>

    <!-- 스타일 옵션 -->
    <div class="editor-section">
      <h3 class="editor-section-title">스타일</h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <label class="editor-label mb-0">상단 고정</label>
          <label class="toggle">
            <input
              v-model="localContent.sticky"
              type="checkbox"
            />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <p class="text-xs text-gray-500">스크롤해도 헤더가 항상 보입니다</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HeaderContent } from '~/types/site'

interface Props {
  content: HeaderContent
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update', content: HeaderContent): void
}>()

// Local copy for editing
const localContent = reactive<HeaderContent>({ ...props.content })

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

/* Toggle Switch */
.toggle {
  @apply relative inline-block w-10 h-6 cursor-pointer;
}

.toggle input {
  @apply opacity-0 w-0 h-0;
}

.toggle-slider {
  @apply absolute inset-0 bg-gray-300 rounded-full transition-colors;
}

.toggle-slider::before {
  content: '';
  @apply absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform;
}

.toggle input:checked + .toggle-slider {
  @apply bg-primary-500;
}

.toggle input:checked + .toggle-slider::before {
  transform: translateX(16px);
}
</style>
