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
        <div v-if="localContent.style === 'cards'">
          <label class="editor-label">카드 배경색</label>
          <div class="color-field">
            <input
              :value="localContent.cardBgColor"
              type="color"
              class="color-picker"
              @input="(e) => { localContent.cardBgColor = getInputValue(e); emitUpdate() }"
            />
            <input
              :value="localContent.cardBgColor"
              type="text"
              class="editor-input"
              placeholder="#f9fafb"
              @input="(e) => { localContent.cardBgColor = getInputValue(e); emitUpdate() }"
            />
          </div>
        </div>
        <div v-if="localContent.style === 'cards'">
          <label class="editor-label">그림자</label>
          <div class="shadow-presets">
            <button
              v-for="preset in shadowPresets"
              :key="preset.value"
              class="shadow-preset-btn"
              :class="{ active: localContent.cardShadow === preset.value }"
              @click="setShadowPreset(preset.value)"
            >
              <span class="shadow-preset-box" :style="{ boxShadow: preset.preview }"></span>
              <span class="shadow-preset-label">{{ preset.label }}</span>
            </button>
          </div>
        </div>
        <div v-if="localContent.style === 'cards' && localContent.cardShadow !== 'none' && localContent.cardShadow !== 'custom'">
          <label class="editor-label">그림자 방향</label>
          <div class="shadow-dir-row">
            <button
              v-for="dir in shadowDirs"
              :key="dir.value"
              class="shadow-dir-btn"
              :class="{ active: localContent.cardShadowDir === dir.value }"
              @click="setShadowDir(dir.value)"
            >
              <Icon :name="dir.icon" class="icon-16" />
              <span>{{ dir.label }}</span>
            </button>
          </div>
        </div>
        <template v-if="localContent.style === 'cards' && localContent.cardShadow === 'custom'">
          <div>
            <label class="editor-label">X 오프셋 ({{ localContent.cardShadowX }}px)</label>
            <div class="range-field">
              <input
                v-model.number="localContent.cardShadowX"
                type="range" min="-20" max="20" step="1"
                class="range-input"
                @input="emitUpdate"
              />
              <input
                v-model.number="localContent.cardShadowX"
                type="number"
                class="editor-input range-number"
                @input="emitUpdate"
              />
            </div>
          </div>
          <div>
            <label class="editor-label">Y 오프셋 ({{ localContent.cardShadowY }}px)</label>
            <div class="range-field">
              <input
                v-model.number="localContent.cardShadowY"
                type="range" min="-20" max="20" step="1"
                class="range-input"
                @input="emitUpdate"
              />
              <input
                v-model.number="localContent.cardShadowY"
                type="number"
                class="editor-input range-number"
                @input="emitUpdate"
              />
            </div>
          </div>
          <div>
            <label class="editor-label">흐림 ({{ localContent.cardShadowBlur }}px)</label>
            <div class="range-field">
              <input
                v-model.number="localContent.cardShadowBlur"
                type="range" min="0" max="40" step="1"
                class="range-input"
                @input="emitUpdate"
              />
              <input
                v-model.number="localContent.cardShadowBlur"
                type="number"
                class="editor-input range-number"
                @input="emitUpdate"
              />
            </div>
          </div>
          <div>
            <label class="editor-label">확산 ({{ localContent.cardShadowSpread }}px)</label>
            <div class="range-field">
              <input
                v-model.number="localContent.cardShadowSpread"
                type="range" min="-10" max="20" step="1"
                class="range-input"
                @input="emitUpdate"
              />
              <input
                v-model.number="localContent.cardShadowSpread"
                type="number"
                class="editor-input range-number"
                @input="emitUpdate"
              />
            </div>
          </div>
          <div>
            <label class="editor-label">그림자 색상</label>
            <div class="color-field">
              <input
                :value="localContent.cardShadowColor"
                type="color"
                class="color-picker"
                @input="(e) => { localContent.cardShadowColor = getInputValue(e); emitUpdate() }"
              />
              <input
                :value="localContent.cardShadowColor"
                type="text"
                class="editor-input"
                placeholder="#00000015"
                @input="(e) => { localContent.cardShadowColor = getInputValue(e); emitUpdate() }"
              />
            </div>
            <p class="hint">투명도 포함 가능 (예: #00000026)</p>
          </div>
        </template>
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
              @click="setIconUseTheme(true)"
            >테마 컬러</button>
            <button
              class="text-color-btn"
              :class="{ active: !localContent.iconUseTheme }"
              @click="setIconUseTheme(false)"
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
                  @input="(e) => { localContent.iconBgColor = getInputValue(e); emitUpdate() }"
                />
                <input
                  :value="localContent.iconBgColor"
                  type="text"
                  class="editor-input"
                  placeholder="#dbeafe"
                  @input="(e) => { localContent.iconBgColor = getInputValue(e); emitUpdate() }"
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
                  @input="(e) => { localContent.iconColor = getInputValue(e); emitUpdate() }"
                />
                <input
                  :value="localContent.iconColor"
                  type="text"
                  class="editor-input"
                  placeholder="#3b82f6"
                  @input="(e) => { localContent.iconColor = getInputValue(e); emitUpdate() }"
                />
              </div>
            </div>
          </div>
        </template>
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

   
  </div>
</template>

<script setup lang="ts">
import type { ChurchIntroContent, ChurchIntroItem } from '~/types/site'
import IconPicker from '~/components/editors/IconPicker.vue'

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

const updateItemIcon = (index: number, value: string) => {
  updateItemField(index, 'icon', value)
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

const setIconUseTheme = (value: boolean) => {
  localContent.value.iconUseTheme = value
  emitUpdate()
}

const shadowPresets = [
  { value: 'none' as const, label: '없음', preview: 'none' },
  { value: 'sm' as const, label: '약하게', preview: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
  { value: 'md' as const, label: '보통', preview: '0 4px 6px -1px rgb(0 0 0 / 0.1)' },
  { value: 'lg' as const, label: '강하게', preview: '0 10px 15px -3px rgb(0 0 0 / 0.1)' },
  { value: 'custom' as const, label: '커스텀', preview: '0 4px 10px 0 rgb(0 0 0 / 0.15)' },
]

const setShadowPreset = (value: 'none' | 'sm' | 'md' | 'lg' | 'custom') => {
  localContent.value.cardShadow = value
  emitUpdate()
}

const shadowDirs = [
  { value: 'center' as const, label: '가운데', icon: 'mdi:circle-outline' },
  { value: 'left' as const, label: '왼쪽', icon: 'mdi:arrow-bottom-left' },
  { value: 'bottom' as const, label: '아래', icon: 'mdi:arrow-down' },
  { value: 'right' as const, label: '오른쪽', icon: 'mdi:arrow-bottom-right' },
]

const setShadowDir = (value: 'center' | 'left' | 'bottom' | 'right') => {
  localContent.value.cardShadowDir = value
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

.shadow-presets {
  display: flex;
  gap: 0.375rem;
}

.shadow-preset-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.25rem;
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-md);
  background-color: #fff;
  transition: all var(--transition-fast);
}

.shadow-preset-btn.active {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 1px var(--primary-500);
}

.shadow-preset-box {
  width: 2rem;
  height: 1.25rem;
  background-color: #fff;
  border-radius: 3px;
}

.shadow-preset-label {
  font-size: 0.625rem;
  color: var(--gray-500);
}

.shadow-preset-btn.active .shadow-preset-label {
  color: var(--primary-500);
  font-weight: 600;
}

.shadow-dir-row {
  display: flex;
  gap: 0.375rem;
}

.shadow-dir-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem;
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-md);
  background-color: #fff;
  font-size: 0.625rem;
  color: var(--gray-500);
  transition: all var(--transition-fast);
}

.shadow-dir-btn.active {
  border-color: var(--primary-500);
  color: var(--primary-500);
  font-weight: 600;
}

.icon-16 { width: 1rem; height: 1rem; }

.range-field {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.range-input {
  flex: 1;
}

.range-number {
  width: 4.5rem;
}
</style>
