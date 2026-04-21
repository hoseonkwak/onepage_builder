<template>
  <div class="worship-editor stack-6">
    <!-- 제목 -->
    <div class="editor-section">
      <h3 class="editor-section-title">제목</h3>
      <div class="stack-3">
        <div>
          <label class="editor-label">섹션 제목</label>
          <input
            v-model="localContent.title"
            type="text"
            class="editor-input"
            placeholder="예배안내"
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
        <div class="toggle-row">
          <label class="editor-label toggle-row__label">구분선 표시</label>
          <label class="toggle">
            <input
              v-model="localContent.showDivider"
              type="checkbox"
              @change="emitUpdate"
            />
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>

    <!-- 레이아웃 -->
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
              @click="localContent.columns = col.value; emitUpdate()"
            >
              {{ col.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 아이콘 색상 -->
    <div class="editor-section">
      <h3 class="editor-section-title">아이콘 색상</h3>
      <div class="stack-3">
        <div>
          <div class="text-color-toggle">
            <button
              class="text-color-btn"
              :class="{ active: localContent.iconUseTheme }"
              @click="localContent.iconUseTheme = true; emitUpdate()"
            >테마 컬러</button>
            <button
              class="text-color-btn"
              :class="{ active: !localContent.iconUseTheme }"
              @click="localContent.iconUseTheme = false; emitUpdate()"
            >직접 선택</button>
          </div>
        </div>
        <template v-if="!localContent.iconUseTheme">
          <div class="color-row">
            <div>
              <label class="editor-label">배경색</label>
              <div class="color-field">
                <input
                  :value="localContent.iconBgColor"
                  type="color"
                  class="color-picker"
                  @input="(e) => { localContent.iconBgColor = getVal(e); emitUpdate() }"
                />
                <input
                  :value="localContent.iconBgColor"
                  type="text"
                  class="editor-input"
                  placeholder="transparent"
                  @input="(e) => { localContent.iconBgColor = getVal(e); emitUpdate() }"
                />
              </div>
            </div>
            <div>
              <label class="editor-label">아이콘색</label>
              <div class="color-field">
                <input
                  :value="localContent.iconColor"
                  type="color"
                  class="color-picker"
                  @input="(e) => { localContent.iconColor = getVal(e); emitUpdate() }"
                />
                <input
                  :value="localContent.iconColor"
                  type="text"
                  class="editor-input"
                  placeholder="#1f2937"
                  @input="(e) => { localContent.iconColor = getVal(e); emitUpdate() }"
                />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 항목 목록 -->
    <div class="editor-section">
      <h3 class="editor-section-title">예배 항목</h3>
      <div class="stack-4">
        <div
          v-for="(item, index) in localContent.items"
          :key="index"
          class="item-card"
        >
          <div class="item-card__header">
            <span class="item-card__index">항목 {{ index + 1 }}</span>
            <button @click="removeItem(index)" class="item-card__delete">삭제</button>
          </div>
          <div class="stack-2">
            <div>
              <label class="editor-label">아이콘</label>
              <IconPicker
                :model-value="item.icon"
                @update:model-value="updateItemIcon(index, $event)"
              />
            </div>
            <div>
              <label class="editor-label">제목</label>
              <input
                :value="item.title"
                type="text"
                class="editor-input"
                placeholder="항목 제목"
                @input="(e) => updateItemField(index, 'title', getVal(e))"
              />
            </div>
            <div>
              <label class="editor-label">설명</label>
              <textarea
                :value="item.description"
                class="editor-input editor-textarea"
                rows="3"
                placeholder="줄바꿈으로 구분"
                @input="(e) => updateItemField(index, 'description', getVal(e))"
              />
              <p class="hint">엔터로 줄바꿈 가능</p>
            </div>
          </div>
        </div>

        <button @click="addItem" class="add-item-btn">+ 항목 추가</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WorshipInfoContent, WorshipInfoItem } from '~/types/site'
import IconPicker from '~/components/editors/IconPicker.vue'

interface Props {
  content: WorshipInfoContent
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update', content: WorshipInfoContent): void
}>()

const columnOptions = [
  { value: 2 as const, label: '2열' },
  { value: 3 as const, label: '3열' },
  { value: 4 as const, label: '4열' }
]

const localContent = ref<WorshipInfoContent>({
  ...props.content,
  items: props.content.items.map(item => ({ ...item }))
})

const getVal = (e: Event): string => (e.target as HTMLInputElement).value

const emitUpdate = () => {
  emit('update', {
    ...localContent.value,
    items: localContent.value.items.map(item => ({ ...item }))
  })
}

const updateItemIcon = (index: number, value: string) => {
  updateItemField(index, 'icon', value)
}

const updateItemField = (index: number, field: keyof WorshipInfoItem, value: string) => {
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

watch(() => props.content, (newVal: WorshipInfoContent) => {
  localContent.value = {
    ...newVal,
    items: newVal.items.map((item: WorshipInfoItem) => ({ ...item }))
  }
}, { deep: true })
</script>

<style scoped>
.editor-textarea { resize: none; }

.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toggle-row__label { margin-bottom: 0; }

.text-color-toggle {
  display: flex;
  gap: 0.5rem;
}

.text-color-btn {
  flex: 1;
  padding: 0.5rem;
  font-size: 0.875rem;
  border-radius: var(--radius-md);
  border: 2px solid var(--gray-200);
  background-color: #fff;
  color: var(--gray-700);
  font-weight: 500;
  transition: all var(--transition-fast);
}

.text-color-btn.active {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 1px var(--primary-500);
}

.color-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.color-field {
  display: flex;
  gap: 0.5rem;
}

.option-row {
  display: flex;
  gap: 0.5rem;
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
</style>
