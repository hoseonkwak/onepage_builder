<template>
  <div class="youth-editor stack-6">
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
            placeholder="교회학교"
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

    <!-- 부서 목록 -->
    <div class="editor-section">
      <h3 class="editor-section-title">부서 편집</h3>
      <div class="stack-4">
        <div
          v-for="(dept, index) in localContent.departments"
          :key="index"
          class="item-card"
        >
          <div class="item-card__header">
            <span class="item-card__index">부서 {{ index + 1 }}</span>
            <button @click="removeDept(index)" class="item-card__delete">삭제</button>
          </div>
          <div class="stack-2">
            <div>
              <label class="editor-label">부서명</label>
              <input
                :value="dept.name"
                type="text"
                class="editor-input"
                placeholder="영유아부"
                @input="(e) => updateField(index, 'name', getVal(e))"
              />
            </div>
            <div>
              <label class="editor-label">설명</label>
              <input
                :value="dept.description"
                type="text"
                class="editor-input"
                placeholder="하나님 나라를 꿈꾸는 영유아부"
                @input="(e) => updateField(index, 'description', getVal(e))"
              />
            </div>
            <div>
              <label class="editor-label">이미지</label>
              <div class="bg-upload">
                <div v-if="dept.image" class="bg-upload__preview">
                  <img :src="dept.image" alt="부서 이미지" class="bg-upload__img" />
                  <button class="bg-upload__remove" @click="removeImage(index)">
                    <Icon name="mdi:close-circle" class="icon-20" />
                  </button>
                </div>
                <div v-else class="bg-upload__dropzone" @click="triggerFile(index)">
                  <Icon name="mdi:image-plus" class="icon-32 color-gray-400" />
                  <span class="bg-upload__text">클릭하여 이미지 선택</span>
                </div>
                <input
                  :ref="(el) => setFileRef(index, el)"
                  type="file"
                  accept="image/*"
                  class="bg-upload__file-input"
                  @change="(e) => onFileSelect(index, e)"
                />
              </div>
              <div class="bg-upload__url-row">
                <span class="bg-upload__or">또는 URL</span>
                <input
                  :value="dept.image"
                  type="text"
                  class="editor-input"
                  placeholder="https://example.com/image.jpg"
                  @input="(e) => updateField(index, 'image', getVal(e))"
                />
              </div>
            </div>

            <div>
              <label class="editor-label">버튼 텍스트 (선택)</label>
              <input
                :value="dept.buttonText"
                type="text"
                class="editor-input"
                placeholder="비우면 버튼 표시 안 함"
                @input="(e) => updateField(index, 'buttonText', getVal(e))"
              />
            </div>

            <template v-if="dept.buttonText">
              <div>
                <label class="editor-label">버튼 링크</label>
                <input
                  :value="dept.buttonLink"
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
                    :class="{ active: dept.buttonUseTheme }"
                    @click="updateBoolField(index, 'buttonUseTheme', true)"
                  >테마 컬러</button>
                  <button
                    class="text-color-btn"
                    :class="{ active: !dept.buttonUseTheme }"
                    @click="updateBoolField(index, 'buttonUseTheme', false)"
                  >직접 선택</button>
                </div>
              </div>
              <div v-if="dept.buttonUseTheme">
                <label class="editor-label">버튼 글자색</label>
                <div class="text-color-toggle">
                  <button
                    class="text-color-btn text-color-btn--white"
                    :class="{ active: !dept.buttonTextDark }"
                    @click="updateBoolField(index, 'buttonTextDark', false)"
                  >흰색</button>
                  <button
                    class="text-color-btn text-color-btn--black"
                    :class="{ active: dept.buttonTextDark }"
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
                        :value="dept.buttonBgColor"
                        type="color"
                        class="color-picker"
                        @input="(e) => updateField(index, 'buttonBgColor', getVal(e))"
                      />
                      <input
                        :value="dept.buttonBgColor"
                        type="text"
                        class="editor-input"
                        placeholder="#1e3a8a"
                        @input="(e) => updateField(index, 'buttonBgColor', getVal(e))"
                      />
                    </div>
                  </div>
                  <div>
                    <label class="editor-label">글자색</label>
                    <div class="color-field">
                      <input
                        :value="dept.buttonTextColor"
                        type="color"
                        class="color-picker"
                        @input="(e) => updateField(index, 'buttonTextColor', getVal(e))"
                      />
                      <input
                        :value="dept.buttonTextColor"
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

        <button @click="addDept" class="add-item-btn">+ 부서 추가</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { YouthContent, YouthDept } from '~/types/site'

interface Props {
  content: YouthContent
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update', content: YouthContent): void
}>()

const columnOptions = [1, 2, 3] as const

const localContent = ref<YouthContent>({
  ...props.content,
  departments: props.content.departments.map(d => ({ ...d }))
})

const fileRefs: (HTMLInputElement | null)[] = []
const setFileRef = (index: number, el: any) => {
  fileRefs[index] = el
}

const getVal = (e: Event): string => (e.target as HTMLInputElement).value

const emitUpdate = () => {
  emit('update', {
    ...localContent.value,
    departments: localContent.value.departments.map(d => ({ ...d }))
  })
}

const updateField = (index: number, field: keyof YouthDept, value: string) => {
  (localContent.value.departments[index] as any)[field] = value
  emitUpdate()
}

const updateBoolField = (index: number, field: 'buttonUseTheme' | 'buttonTextDark', value: boolean) => {
  localContent.value.departments[index][field] = value
  emitUpdate()
}

const setColumns = (value: 1 | 2 | 3) => {
  localContent.value.columns = value
  emitUpdate()
}

const addDept = () => {
  localContent.value.departments.push({
    name: '새 부서',
    description: '설명',
    image: '',
    buttonText: '',
    buttonLink: '#',
    buttonUseTheme: false,
    buttonTextDark: false,
    buttonBgColor: '#1e3a8a',
    buttonTextColor: '#ffffff'
  })
  emitUpdate()
}

const removeDept = (index: number) => {
  localContent.value.departments.splice(index, 1)
  emitUpdate()
}

const triggerFile = (index: number) => {
  fileRefs[index]?.click()
}

const onFileSelect = (index: number, e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    localContent.value.departments[index].image = reader.result as string
    emitUpdate()
  }
  reader.readAsDataURL(file)
}

const removeImage = (index: number) => {
  localContent.value.departments[index].image = ''
  if (fileRefs[index]) fileRefs[index]!.value = ''
  emitUpdate()
}

watch(() => props.content, (newVal: YouthContent) => {
  localContent.value = {
    ...newVal,
    departments: newVal.departments.map((d: YouthDept) => ({ ...d }))
  }
}, { deep: true })
</script>

<style scoped>
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

/* image upload */
.bg-upload__preview {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.bg-upload__img {
  width: 100%;
  height: 6rem;
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
  height: 5rem;
  border: 2px dashed var(--gray-300);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: border-color var(--transition-fast);
}

.bg-upload__dropzone:hover {
  border-color: var(--primary-500);
}

.bg-upload__text {
  font-size: 0.75rem;
  color: var(--gray-500);
}

.bg-upload__file-input { display: none; }

.bg-upload__url-row { margin-top: 0.5rem; }

.bg-upload__or {
  display: block;
  font-size: 0.75rem;
  color: var(--gray-400);
  margin-bottom: 0.25rem;
}

.icon-20 { width: 1.25rem; height: 1.25rem; }
.icon-32 { width: 2rem; height: 2rem; }
.color-gray-400 { color: var(--gray-400); }
</style>
