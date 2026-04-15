<template>
  <div class="church-intro-editor space-y-6">
    <!-- 제목 영역 -->
    <div class="editor-section">
      <h3 class="editor-section-title">제목</h3>
      <div class="space-y-3">
        <div>
          <label class="editor-label">섹션 제목</label>
          <input
            v-model="localContent.title"
            type="text"
            class="editor-input"
            placeholder="교회소개"
            @input="emitUpdate"
          />
        </div>
        <div>
          <label class="editor-label">부제목 (선택)</label>
          <input
            v-model="localContent.subtitle"
            type="text"
            class="editor-input"
            placeholder="부제목을 입력하세요"
            @input="emitUpdate"
          />
        </div>
      </div>
    </div>

    <!-- 아이템 목록 -->
    <div class="editor-section">
      <h3 class="editor-section-title">소개 항목</h3>
      <div class="space-y-4">
        <div
          v-for="(item, index) in localContent.items"
          :key="index"
          class="item-card"
        >
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-gray-700">항목 {{ index + 1 }}</span>
            <button
              @click="removeItem(index)"
              class="text-red-500 hover:text-red-700 text-sm"
            >
              삭제
            </button>
          </div>
          <div class="space-y-2">
            <div>
              <label class="editor-label">아이콘</label>
              <input
                :value="item.icon"
                type="text"
                class="editor-input"
                placeholder="mdi:cross"
                @input="(e) => updateItemField(index, 'icon', getInputValue(e))"
              />
              <p class="text-xs text-gray-500 mt-1">
                <a href="https://icon-sets.iconify.design/mdi/" target="_blank" class="text-primary-500 hover:underline">아이콘 검색</a>
              </p>
            </div>
            <div>
              <label class="editor-label">제목</label>
              <input
                :value="item.title"
                type="text"
                class="editor-input"
                placeholder="항목 제목"
                @input="(e) => updateItemField(index, 'title', getInputValue(e))"
              />
            </div>
            <div>
              <label class="editor-label">설명</label>
              <textarea
                :value="item.description"
                class="editor-input"
                rows="2"
                placeholder="항목 설명"
                @input="(e) => updateItemField(index, 'description', getInputValue(e))"
              />
            </div>
          </div>
        </div>

        <button
          @click="addItem"
          class="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary-500 hover:text-primary-500 transition-colors"
        >
          + 항목 추가
        </button>
      </div>
    </div>

    <!-- 레이아웃 설정 -->
    <div class="editor-section">
      <h3 class="editor-section-title">레이아웃</h3>
      <div class="space-y-3">
        <div>
          <label class="editor-label">컬럼 수</label>
          <div class="flex gap-2">
            <button
              v-for="col in columnOptions"
              :key="col.value"
              class="flex-1 py-2 px-3 text-sm rounded-md border transition-colors"
              :class="localContent.columns === col.value
                ? 'bg-primary-500 text-white border-primary-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-primary-300'"
              @click="setColumns(col.value)"
            >
              {{ col.label }}
            </button>
          </div>
        </div>
        <div>
          <label class="editor-label">스타일</label>
          <div class="flex gap-2">
            <button
              v-for="style in styleOptions"
              :key="style.value"
              class="flex-1 py-2 px-3 text-sm rounded-md border transition-colors"
              :class="localContent.style === style.value
                ? 'bg-primary-500 text-white border-primary-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-primary-300'"
              @click="setStyle(style.value)"
            >
              {{ style.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChurchIntroContent, ChurchIntroItem } from '~/types/site'

interface Props {
  content: ChurchIntroContent
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update', content: ChurchIntroContent): void
}>()

const columnOptions = [
  { value: 2 as const, label: '2열' },
  { value: 3 as const, label: '3열' },
  { value: 4 as const, label: '4열' }
]

const styleOptions = [
  { value: 'cards' as const, label: '카드' },
  { value: 'icons' as const, label: '아이콘' },
  { value: 'minimal' as const, label: '미니멀' }
]

// Local copy for editing
const localContent = ref<ChurchIntroContent>({
  ...props.content,
  items: props.content.items.map(item => ({ ...item }))
})

// Get input value from event
const getInputValue = (e: Event): string => {
  return (e.target as HTMLInputElement).value
}

// Emit update to parent
const emitUpdate = () => {
  emit('update', {
    ...localContent.value,
    items: localContent.value.items.map(item => ({ ...item }))
  })
}

// Update item field
const updateItemField = (index: number, field: keyof ChurchIntroItem, value: string) => {
  localContent.value.items[index][field] = value
  emitUpdate()
}

// Add new item
const addItem = () => {
  localContent.value.items.push({
    icon: 'mdi:church',
    title: '새 항목',
    description: '설명을 입력하세요'
  })
  emitUpdate()
}

// Remove item
const removeItem = (index: number) => {
  localContent.value.items.splice(index, 1)
  emitUpdate()
}

// Set columns
const setColumns = (value: 2 | 3 | 4) => {
  localContent.value.columns = value
  emitUpdate()
}

// Set style
const setStyle = (value: 'cards' | 'icons' | 'minimal') => {
  localContent.value.style = value
  emitUpdate()
}

// Update local when props change
watch(() => props.content, (newVal: ChurchIntroContent) => {
  localContent.value = {
    ...newVal,
    items: newVal.items.map((item: ChurchIntroItem) => ({ ...item }))
  }
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

.item-card {
  @apply bg-white p-3 rounded-lg border border-gray-200;
}
</style>
