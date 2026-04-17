<template>
  <div class="church-intro-editor stack-6">
    <!-- 제목 영역 -->
    <div class="editor-section">
      <h3 class="editor-section-title">제목</h3>
      <div class="stack-3">
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
      <div class="stack-4">
        <div
          v-for="(item, index) in localContent.items"
          :key="index"
          class="item-card"
        >
          <div class="item-card__header">
            <span class="item-card__index">항목 {{ index + 1 }}</span>
            <button
              @click="removeItem(index)"
              class="item-card__delete"
            >
              삭제
            </button>
          </div>
          <div class="stack-2">
            <div>
              <label class="editor-label">아이콘</label>
              <input
                :value="item.icon"
                type="text"
                class="editor-input"
                placeholder="mdi:cross"
                @input="(e) => updateItemField(index, 'icon', getInputValue(e))"
              />
              <p class="hint">
                <a href="https://icon-sets.iconify.design/mdi/" target="_blank" class="hint-link">아이콘 검색</a>
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
                class="editor-input editor-textarea"
                rows="2"
                placeholder="항목 설명"
                @input="(e) => updateItemField(index, 'description', getInputValue(e))"
              />
            </div>
          </div>
        </div>

        <button
          @click="addItem"
          class="add-item-btn"
        >
          + 항목 추가
        </button>
      </div>
    </div>

    <!-- 레이아웃 설정 -->
    <div class="editor-section">
      <h3 class="editor-section-title">레이아웃</h3>
      <div class="stack-3">
        <div>
          <label class="editor-label">컬럼 수</label>
          <div class="option-row">
            <button
              v-for="col in columnOptions"
              :key="col.value"
              class="option-btn"
              :class="{ active: localContent.columns === col.value }"
              @click="setColumns(col.value)"
            >
              {{ col.label }}
            </button>
          </div>
        </div>
        <div>
          <label class="editor-label">스타일</label>
          <div class="option-row">
            <button
              v-for="style in styleOptions"
              :key="style.value"
              class="option-btn"
              :class="{ active: localContent.style === style.value }"
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

const localContent = ref<ChurchIntroContent>({
  ...props.content,
  items: props.content.items.map(item => ({ ...item }))
})

const getInputValue = (e: Event): string => {
  return (e.target as HTMLInputElement).value
}

const emitUpdate = () => {
  emit('update', {
    ...localContent.value,
    items: localContent.value.items.map(item => ({ ...item }))
  })
}

const updateItemField = (index: number, field: keyof ChurchIntroItem, value: string) => {
  localContent.value.items[index][field] = value
  emitUpdate()
}

const addItem = () => {
  localContent.value.items.push({
    icon: 'mdi:church',
    title: '새 항목',
    description: '설명을 입력하세요'
  })
  emitUpdate()
}

const removeItem = (index: number) => {
  localContent.value.items.splice(index, 1)
  emitUpdate()
}

const setColumns = (value: 2 | 3 | 4) => {
  localContent.value.columns = value
  emitUpdate()
}

const setStyle = (value: 'cards' | 'icons' | 'minimal') => {
  localContent.value.style = value
  emitUpdate()
}

watch(() => props.content, (newVal: ChurchIntroContent) => {
  localContent.value = {
    ...newVal,
    items: newVal.items.map((item: ChurchIntroItem) => ({ ...item }))
  }
}, { deep: true })
</script>

<style scoped>
.editor-textarea {
  resize: none;
}

.item-card {
  background-color: #fff;
  padding: 0.75rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--gray-200);
}

.item-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.item-card__index {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
}

.item-card__delete {
  color: var(--red-500);
  font-size: 0.875rem;
  transition: color var(--transition-fast);
}

.item-card__delete:hover {
  color: var(--red-700);
}

.hint-link {
  color: var(--primary-500);
  transition: text-decoration var(--transition-fast);
}

.hint-link:hover {
  text-decoration: underline;
}

.add-item-btn {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 2px dashed var(--gray-300);
  border-radius: var(--radius-lg);
  color: var(--gray-500);
  transition: all var(--transition-fast);
}

.add-item-btn:hover {
  border-color: var(--primary-500);
  color: var(--primary-500);
}

.option-row {
  display: flex;
  gap: 0.5rem;
}
</style>
