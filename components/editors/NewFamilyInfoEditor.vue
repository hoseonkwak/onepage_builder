<template>
  <div class="newfamily-editor stack-6">
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
            placeholder="새가족안내"
            @input="emitUpdate"
          />
        </div>
        <div>
          <label class="editor-label">부제목 (선택)</label>
          <input
            v-model="localContent.subtitle"
            type="text"
            class="editor-input"
            placeholder="부제목"
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
      <div>
        <label class="editor-label">컬럼 수</label>
        <div class="option-row">
          <button
            v-for="col in columnOptions"
            :key="col"
            class="option-btn"
            :class="{ active: localContent.columns === col }"
            @click="setColumns(col)"
          >
            {{ col }}열
          </button>
        </div>
      </div>
    </div>

    <!-- Step 목록 -->
    <div class="editor-section">
      <h3 class="editor-section-title">Step 편집</h3>
      <div class="stack-4">
        <div
          v-for="(step, index) in localContent.steps"
          :key="index"
          class="item-card"
        >
          <div class="item-card__header">
            <span class="item-card__index">Step {{ index + 1 }}</span>
            <button @click="removeStep(index)" class="item-card__delete">삭제</button>
          </div>
          <div class="stack-2">
            <div>
              <label class="editor-label">라벨</label>
              <input
                :value="step.label"
                type="text"
                class="editor-input"
                placeholder="STEP-1"
                @input="(e) => updateField(index, 'label', getVal(e))"
              />
            </div>
            <div>
              <label class="editor-label">제목</label>
              <input
                :value="step.title"
                type="text"
                class="editor-input"
                placeholder="교인등록"
                @input="(e) => updateField(index, 'title', getVal(e))"
              />
            </div>
            <div>
              <label class="editor-label">부제목</label>
              <input
                :value="step.subtitle"
                type="text"
                class="editor-input"
                placeholder="새가족 등록카드 작성"
                @input="(e) => updateField(index, 'subtitle', getVal(e))"
              />
            </div>
            <div>
              <label class="editor-label">설명</label>
              <textarea
                :value="step.description"
                class="editor-input editor-textarea"
                rows="3"
                placeholder="상세 설명"
                @input="(e) => updateField(index, 'description', getVal(e))"
              />
            </div>
            <div>
              <label class="editor-label">버튼 텍스트 (선택)</label>
              <input
                :value="step.buttonText"
                type="text"
                class="editor-input"
                placeholder="비우면 버튼 표시 안 함"
                @input="(e) => updateField(index, 'buttonText', getVal(e))"
              />
            </div>
            <template v-if="step.buttonText">
              <div>
                <label class="editor-label">버튼 링크</label>
                <input
                  :value="step.buttonLink"
                  type="text"
                  class="editor-input"
                  placeholder="#"
                  @input="(e) => updateField(index, 'buttonLink', getVal(e))"
                />
              </div>
              <div>
                <label class="editor-label">버튼 색상</label>
                <div class="text-color-toggle">
                  <button
                    class="text-color-btn"
                    :class="{ active: step.buttonUseTheme }"
                    @click="updateBoolField(index, 'buttonUseTheme', true)"
                  >테마 컬러</button>
                  <button
                    class="text-color-btn"
                    :class="{ active: !step.buttonUseTheme }"
                    @click="updateBoolField(index, 'buttonUseTheme', false)"
                  >직접 선택</button>
                </div>
              </div>
              <div v-if="step.buttonUseTheme">
                <label class="editor-label">버튼 글자색</label>
                <div class="text-color-toggle">
                  <button
                    class="text-color-btn text-color-btn--white"
                    :class="{ active: !step.buttonTextDark }"
                    @click="updateBoolField(index, 'buttonTextDark', false)"
                  >흰색</button>
                  <button
                    class="text-color-btn text-color-btn--black"
                    :class="{ active: step.buttonTextDark }"
                    @click="updateBoolField(index, 'buttonTextDark', true)"
                  >검정</button>
                </div>
              </div>
              <template v-else>
                <div class="color-row">
                  <div>
                    <label class="editor-label">배경색</label>
                    <div class="color-field">
                      <input
                        :value="step.buttonBgColor"
                        type="color"
                        class="color-picker"
                        @input="(e) => updateField(index, 'buttonBgColor', getVal(e))"
                      />
                      <input
                        :value="step.buttonBgColor"
                        type="text"
                        class="editor-input"
                        placeholder="#111827"
                        @input="(e) => updateField(index, 'buttonBgColor', getVal(e))"
                      />
                    </div>
                  </div>
                  <div>
                    <label class="editor-label">글자색</label>
                    <div class="color-field">
                      <input
                        :value="step.buttonTextColor"
                        type="color"
                        class="color-picker"
                        @input="(e) => updateField(index, 'buttonTextColor', getVal(e))"
                      />
                      <input
                        :value="step.buttonTextColor"
                        type="text"
                        class="editor-input"
                        placeholder="#ffffff"
                        @input="(e) => updateField(index, 'buttonTextColor', getVal(e))"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </template>
          </div>
        </div>

        <button @click="addStep" class="add-item-btn">+ Step 추가</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NewFamilyInfoContent, NewFamilyStep } from '~/types/site'

interface Props {
  content: NewFamilyInfoContent
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update', content: NewFamilyInfoContent): void
}>()

const columnOptions = [2, 3, 4] as const

const localContent = ref<NewFamilyInfoContent>({
  ...props.content,
  steps: props.content.steps.map(s => ({ ...s }))
})

const getVal = (e: Event): string => (e.target as HTMLInputElement).value

const emitUpdate = () => {
  emit('update', {
    ...localContent.value,
    steps: localContent.value.steps.map(s => ({ ...s }))
  })
}

const updateField = (index: number, field: keyof NewFamilyStep, value: string) => {
  (localContent.value.steps[index] as any)[field] = value
  emitUpdate()
}

const updateBoolField = (index: number, field: 'buttonUseTheme' | 'buttonTextDark', value: boolean) => {
  localContent.value.steps[index][field] = value
  emitUpdate()
}

const setColumns = (value: 2 | 3 | 4) => {
  localContent.value.columns = value
  emitUpdate()
}

const addStep = () => {
  const next = localContent.value.steps.length + 1
  localContent.value.steps.push({
    label: `STEP-${next}`,
    title: '새 단계',
    subtitle: '부제목',
    description: '설명을 입력하세요',
    buttonUseTheme: false,
    buttonTextDark: false,
    buttonBgColor: '#111827',
    buttonTextColor: '#ffffff'
  })
  emitUpdate()
}

const removeStep = (index: number) => {
  localContent.value.steps.splice(index, 1)
  emitUpdate()
}

watch(() => props.content, (newVal: NewFamilyInfoContent) => {
  localContent.value = {
    ...newVal,
    steps: newVal.steps.map((s: NewFamilyStep) => ({ ...s }))
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

.text-color-btn--white {
  background-color: var(--gray-800);
  color: #fff;
}

.text-color-btn--black {
  background-color: #fff;
  color: var(--gray-900);
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
}

.item-card__delete:hover { color: var(--red-700); }

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
