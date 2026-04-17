<template>
  <div class="header-editor stack-6">
    <!-- 로고 영역 -->
    <div class="editor-section">
      <h3 class="editor-section-title">로고</h3>
      <div class="stack-3">
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
          <p class="hint">이미지가 있으면 텍스트 대신 표시됩니다</p>
        </div>
      </div>
    </div>

    <!-- 로그인 영역 -->
    <div class="editor-section">
      <h3 class="editor-section-title">로그인</h3>
      <div class="stack-3">
        <div class="toggle-row">
          <label class="editor-label toggle-row__label">로그인 버튼 표시</label>
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
      <div class="stack-3">
        <div class="toggle-row">
          <label class="editor-label toggle-row__label">상단 고정</label>
          <label class="toggle">
            <input
              v-model="localContent.sticky"
              type="checkbox"
            />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <p class="hint">스크롤해도 헤더가 항상 보입니다</p>
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

const localContent = reactive<HeaderContent>({ ...props.content })

watch(localContent, (newVal) => {
  emit('update', { ...newVal })
}, { deep: true })

watch(() => props.content, (newVal) => {
  Object.assign(localContent, newVal)
}, { deep: true })
</script>

<style scoped>
.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toggle-row__label {
  margin-bottom: 0;
}
</style>
