<template>
  <div class="hero-editor stack-6">
      <!-- 배경 영역 -->
      <div class="editor-section">
      <h3 class="editor-section-title">배경</h3>
      <div class="stack-3">
        <div>
          <label class="editor-label">배경 이미지</label>
          <div class="bg-upload">
            <!-- 미리보기 -->
            <div v-if="localContent.backgroundImage" class="bg-upload__preview">
              <img :src="localContent.backgroundImage" alt="배경 미리보기" class="bg-upload__img" />
              <button class="bg-upload__remove" @click="removeBackgroundImage">
                <Icon name="mdi:close-circle" class="icon-20" />
              </button>
            </div>

            <!-- 업로드 영역 -->
            <div v-else class="bg-upload__dropzone" @click="triggerFileInput">
              <Icon name="mdi:image-plus" class="icon-32 color-gray-400" />
              <span class="bg-upload__dropzone-text">클릭하여 이미지 선택</span>
            </div>

            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="bg-upload__file-input"
              @change="onFileSelect"
            />
          </div>

          <div class="bg-upload__url-row">
            <span class="bg-upload__or">또는 URL 직접 입력</span>
            <input
              v-model="localContent.backgroundImage"
              type="text"
              class="editor-input"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <p class="hint">비우면 기본 배경색이 적용됩니다</p>
        </div>
      </div>
      <!-- 딤 처리 -->
      <div class="editor-section">
        <h3 class="editor-section-title">딤 처리</h3>
        <div class="stack-3">
          <div class="toggle-row">
            <label class="editor-label toggle-row__label">배경 어둡게</label>
            <label class="toggle">
              <input
                v-model="localContent.dimEnabled"
                type="checkbox"
              />
              <span class="toggle-slider"></span>
            </label>
          </div>
          <template v-if="localContent.dimEnabled">
            <div>
              <label class="editor-label">불투명도 ({{ localContent.dimOpacity }}%)</label>
              <div class="range-field">
                <input
                  v-model.number="localContent.dimOpacity"
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  class="range-input"
                />
                <input
                  v-model.number="localContent.dimOpacity"
                  type="number"
                  class="editor-input range-number"
                  min="0"
                  max="100"
                />
              </div>
              <!-- <div class="dim-preview" :style="{ backgroundColor: `rgba(0,0,0,${localContent.dimOpacity / 100})` }">
                <span class="dim-preview__text">미리보기</span>
              </div> -->
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- 텍스트 영역 -->
    <div class="editor-section">
      <h3 class="editor-section-title">텍스트</h3>
      <div class="stack-3">
        <div>
          <label class="editor-label">글자 색상</label>
          <div class="text-color-toggle">
            <button
              class="text-color-btn text-color-btn--white"
              :class="{ active: !localContent.textDark }"
              @click="localContent.textDark = false"
            >흰색</button>
            <button
              class="text-color-btn text-color-btn--black"
              :class="{ active: localContent.textDark }"
              @click="localContent.textDark = true"
            >검정</button>
          </div>
        </div>
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
            class="editor-input editor-textarea"
            rows="3"
            placeholder="추가 설명을 입력하세요"
          />
        </div>
      </div>
    </div>

    <!-- 버튼 영역 -->
    <div class="editor-section">
      <h3 class="editor-section-title">버튼</h3>
      <div class="stack-3">
        <div>
          <label class="editor-label">버튼 텍스트</label>
          <input
            v-model="localContent.buttonText"
            type="text"
            class="editor-input"
            placeholder="버튼에 표시할 텍스트"
          />
          <p class="hint">비우면 버튼이 표시되지 않습니다</p>
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
        <div>
          <label class="editor-label">버튼 색상</label>
          <div class="text-color-toggle">
            <button
              class="text-color-btn"
              :class="{ active: localContent.buttonUseTheme }"
              @click="localContent.buttonUseTheme = true"
            >테마 컬러</button>
            <button
              class="text-color-btn"
              :class="{ active: !localContent.buttonUseTheme }"
              @click="localContent.buttonUseTheme = false"
            >직접 선택</button>
          </div>
        </div>
        <div v-if="localContent.buttonUseTheme">
          <label class="editor-label">버튼 글자색</label>
          <div class="text-color-toggle">
            <button
              class="text-color-btn text-color-btn--white"
              :class="{ active: !localContent.buttonTextDark }"
              @click="localContent.buttonTextDark = false"
            >흰색</button>
            <button
              class="text-color-btn text-color-btn--black"
              :class="{ active: localContent.buttonTextDark }"
              @click="localContent.buttonTextDark = true"
            >검정</button>
          </div>
        </div>
        <template v-if="!localContent.buttonUseTheme">
          <div class="color-row">
            <div>
              <label class="editor-label">배경색</label>
              <div class="color-field">
                <input
                  v-model="localContent.buttonBgColor"
                  type="color"
                  class="color-picker"
                />
                <input
                  v-model="localContent.buttonBgColor"
                  type="text"
                  class="editor-input"
                  placeholder="#3b82f6"
                />
              </div>
            </div>
            <div>
              <label class="editor-label">글자색</label>
              <div class="color-field">
                <input
                  v-model="localContent.buttonTextColor"
                  type="color"
                  class="color-picker"
                />
                <input
                  v-model="localContent.buttonTextColor"
                  type="text"
                  class="editor-input"
                  placeholder="#ffffff"
                />
              </div>
            </div>
          </div>
        </template>
        <div>
          <label class="editor-label">모서리 둥글기 (px)</label>
          <div class="range-field">
            <input
              v-model.number="localContent.buttonBorderRadius"
              type="range"
              min="0"
              max="50"
              step="1"
              class="range-input"
            />
            <input
              v-model.number="localContent.buttonBorderRadius"
              type="number"
              class="editor-input range-number"
              min="0"
              max="50"
            />
          </div>
          <div class="option-row">
            <button
              v-for="preset in radiusPresets"
              :key="preset.value"
              class="option-btn option-btn--sm"
              :class="{ active: localContent.buttonBorderRadius === preset.value }"
              @click="localContent.buttonBorderRadius = preset.value"
            >
              {{ preset.label }}
            </button>
          </div>
        </div>
        <!-- 버튼 미리보기 -->
        <div>
          <label class="editor-label">미리보기</label>
          <div class="button-preview">
            <span
              class="button-preview__btn"
              :class="{
                'button-preview__btn--theme': localContent.buttonUseTheme,
                'button-preview__btn--theme-dark': localContent.buttonUseTheme && localContent.buttonTextDark
              }"
              :style="localContent.buttonUseTheme
                ? { borderRadius: `${localContent.buttonBorderRadius}px` }
                : { backgroundColor: localContent.buttonBgColor, color: localContent.buttonTextColor, borderRadius: `${localContent.buttonBorderRadius}px` }"
            >
              {{ localContent.buttonText || '버튼' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 정렬 옵션 -->
    <div class="editor-section">
      <h3 class="editor-section-title">텍스트 정렬</h3>
      <div class="option-row">
        <button
          v-for="align in alignOptions"
          :key="align.value"
          class="option-btn"
          :class="{ active: localContent.textAlign === align.value }"
          @click="localContent.textAlign = align.value"
        >
          {{ align.label }}
        </button>
      </div>
    </div>

    <!-- 높이 설정 -->
    <div class="editor-section">
      <h3 class="editor-section-title">높이</h3>
      <div class="stack-3">
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
          <p class="hint">최소 300px ~ 최대 1000px</p>
        </div>
        <div class="option-row">
          <button
            v-for="preset in heightPresets"
            :key="preset.value"
            class="option-btn"
            :class="{ active: localContent.height === preset.value }"
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

const localContent = reactive<HeroContent>({ ...props.content })

const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const onFileSelect = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    localContent.backgroundImage = reader.result as string
  }
  reader.readAsDataURL(file)
}

const removeBackgroundImage = () => {
  localContent.backgroundImage = ''
  if (fileInput.value) fileInput.value.value = ''
}

watch(localContent, (newVal) => {
  emit('update', { ...newVal })
}, { deep: true })

watch(() => props.content, (newVal) => {
  Object.assign(localContent, newVal)
}, { deep: true })
</script>

<style scoped>
.editor-textarea {
  resize: none;
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

.range-field {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.range-input {
  flex: 1;
}

.range-number {
  width: 5rem;
}

.option-row {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.option-btn--sm {
  padding: 0.375rem 0.5rem;
  font-size: 0.75rem;
}

.button-preview {
  padding: 0.75rem;
  background-color: var(--gray-200);
  border-radius: var(--radius-md);
  display: flex;
  justify-content: center;
}

.button-preview__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.button-preview__btn--theme {
  background-color: var(--primary-500);
  color: #fff;
}

.button-preview__btn--theme-dark {
  color: var(--gray-900);
}

/* Background upload */
.bg-upload__preview {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.bg-upload__img {
  width: 100%;
  height: 8rem;
  object-fit: cover;
  display: block;
}

.bg-upload__remove {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  color: #fff;
  background-color: rgb(0 0 0 / 0.5);
  border-radius: var(--radius-full);
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color var(--transition-fast);
}

.bg-upload__remove:hover {
  background-color: rgb(0 0 0 / 0.8);
}

.bg-upload__dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  height: 6rem;
  border: 2px dashed var(--gray-300);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: border-color var(--transition-fast);
}

.bg-upload__dropzone:hover {
  border-color: var(--primary-500);
}

.bg-upload__dropzone-text {
  font-size: 0.75rem;
  color: var(--gray-500);
}

.bg-upload__file-input {
  display: none;
}

.bg-upload__url-row {
  margin-top: 0.5rem;
}

.bg-upload__or {
  display: block;
  font-size: 0.75rem;
  color: var(--gray-400);
  margin-bottom: 0.25rem;
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
  transition: all var(--transition-fast);
  font-weight: 500;
}

.text-color-btn--black {
  background-color: var(--gray-800);
  color: #fff;
}

.text-color-btn--white {
  background-color: #fff;
  color: var(--gray-900);
}

.text-color-btn.active {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 1px var(--primary-500);
}

.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toggle-row__label {
  margin-bottom: 0;
}

.dim-preview {
  margin-top: 0.5rem;
  height: 2.5rem;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dim-preview__text {
  color: #fff;
  font-size: 0.75rem;
}

.icon-20 { width: 1.25rem; height: 1.25rem; }
.icon-32 { width: 2rem; height: 2rem; }
.color-gray-400 { color: var(--gray-400); }
</style>
