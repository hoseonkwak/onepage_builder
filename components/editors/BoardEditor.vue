<template>
  <div class="board-editor stack-6">
    <!-- 배경 -->
    <div class="editor-section">
      <h3 class="editor-section-title">배경</h3>
      <div class="stack-3">
        <div>
          <label class="editor-label">배경 이미지</label>
          <div class="bg-upload">
            <div v-if="localContent.backgroundImage" class="bg-upload__preview">
              <img :src="localContent.backgroundImage" alt="배경" class="bg-upload__img" />
              <button class="bg-upload__remove" @click="removeBg">
                <Icon name="mdi:close-circle" class="icon-20" />
              </button>
            </div>
            <div v-else class="bg-upload__dropzone" @click="triggerFile">
              <Icon name="mdi:image-plus" class="icon-32 color-gray-400" />
              <span class="bg-upload__text">클릭하여 이미지 선택</span>
            </div>
            <input ref="fileInput" type="file" accept="image/*" class="bg-upload__file-input" @change="onFileSelect" />
          </div>
          <div class="bg-upload__url-row">
            <span class="bg-upload__or">또는 URL 직접 입력</span>
            <input
              v-model="localContent.backgroundImage"
              type="text"
              class="editor-input"
              placeholder="https://example.com/image.jpg"
              @input="emitUpdate"
            />
          </div>
        </div>
      </div>
      <!-- 딤 처리 -->
      <div class="editor-section">
        <h3 class="editor-section-title">딤 처리</h3>
        <div class="stack-3">
          <div class="toggle-row">
            <label class="editor-label toggle-row__label">배경 어둡게</label>
            <label class="toggle">
              <input v-model="localContent.dimEnabled" type="checkbox" @change="emitUpdate" />
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div v-if="localContent.dimEnabled">
            <label class="editor-label">불투명도 ({{ localContent.dimOpacity }}%)</label>
            <div class="range-field">
              <input
                v-model.number="localContent.dimOpacity"
                type="range" min="0" max="100" step="5"
                class="range-input"
                @input="emitUpdate"
              />
              <input
                v-model.number="localContent.dimOpacity"
                type="number"
                class="editor-input range-number"
                min="0" max="100"
                @input="emitUpdate"
              />
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- 제목 -->
    <div class="editor-section">
      <h3 class="editor-section-title">제목</h3>
      <div class="stack-3">
        <div>
          <label class="editor-label">섹션 제목</label>
          <input v-model="localContent.title" type="text" class="editor-input" placeholder="주보 게시판" @input="emitUpdate" />
        </div>
        <div>
          <label class="editor-label">부제목 (선택)</label>
          <input v-model="localContent.subtitle" type="text" class="editor-input" placeholder="부제목" @input="emitUpdate" />
        </div>
        <div class="toggle-row">
          <label class="editor-label toggle-row__label">구분선 표시</label>
          <label class="toggle">
            <input v-model="localContent.showDivider" type="checkbox" @change="emitUpdate" />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div>
          <label class="editor-label">글자 색상</label>
          <div class="text-color-toggle">
            <button
              class="text-color-btn text-color-btn--white"
              :class="{ active: !localContent.textDark }"
              @click="localContent.textDark = false; emitUpdate()"
            >흰색</button>
            <button
              class="text-color-btn text-color-btn--black"
              :class="{ active: localContent.textDark }"
              @click="localContent.textDark = true; emitUpdate()"
            >검정</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 아이콘 색상 -->
    <div class="editor-section">
      <h3 class="editor-section-title">아이콘 색상</h3>
      <div class="stack-3">
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
                  placeholder="#1d4ed8"
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
                  placeholder="#ffffff"
                  @input="(e) => { localContent.iconColor = getVal(e); emitUpdate() }"
                />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 항목 -->
    <div class="editor-section">
      <h3 class="editor-section-title">게시글 항목</h3>
      <div class="stack-4">
        <div v-for="(item, index) in localContent.items" :key="index" class="item-card">
          <div class="item-card__header">
            <span class="item-card__index">항목 {{ index + 1 }}</span>
            <button @click="removeItem(index)" class="item-card__delete">삭제</button>
          </div>
          <div class="stack-2">
            <div>
              <label class="editor-label">제목</label>
              <input
                :value="item.title"
                type="text"
                class="editor-input"
                @input="(e) => updateItemField(index, 'title', getVal(e))"
              />
            </div>
            <div>
              <label class="editor-label">작성자</label>
              <input
                :value="item.author"
                type="text"
                class="editor-input"
                placeholder="작성자"
                @input="(e) => updateItemField(index, 'author', getVal(e))"
              />
            </div>
            <div>
              <label class="editor-label">날짜</label>
              <input
                :value="item.date"
                type="text"
                class="editor-input"
                placeholder="2025-08-31"
                @input="(e) => updateItemField(index, 'date', getVal(e))"
              />
            </div>
            <div>
              <label class="editor-label">링크 (선택)</label>
              <input
                :value="item.link"
                type="text"
                class="editor-input"
                placeholder="#"
                @input="(e) => updateItemField(index, 'link', getVal(e))"
              />
            </div>
          </div>
        </div>
        <button @click="addItem" class="add-item-btn">+ 항목 추가</button>
      </div>
    </div>

    <!-- 더보기 버튼 -->
    <div class="editor-section">
      <h3 class="editor-section-title">더보기 버튼</h3>
      <div class="stack-3">
        <div>
          <label class="editor-label">버튼 텍스트</label>
          <input
            v-model="localContent.moreText"
            type="text"
            class="editor-input"
            placeholder="주보 더보기 (비우면 숨김)"
            @input="emitUpdate"
          />
        </div>
        <div>
          <label class="editor-label">버튼 링크</label>
          <input
            v-model="localContent.moreLink"
            type="text"
            class="editor-input"
            placeholder="#"
            @input="emitUpdate"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BoardContent, BoardItem } from '~/types/site'

interface Props {
  content: BoardContent
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update', content: BoardContent): void
}>()

const localContent = ref<BoardContent>({
  ...props.content,
  items: props.content.items.map(item => ({ ...item }))
})

const fileInput = ref<HTMLInputElement | null>(null)

const getVal = (e: Event): string => (e.target as HTMLInputElement).value

const emitUpdate = () => {
  emit('update', {
    ...localContent.value,
    items: localContent.value.items.map(item => ({ ...item }))
  })
}

const updateItemField = (index: number, field: keyof BoardItem, value: string) => {
  localContent.value.items[index][field] = value
  emitUpdate()
}

const addItem = () => {
  localContent.value.items.push({
    title: '새 게시글',
    date: '',
    author: ''
  })
  emitUpdate()
}

const removeItem = (index: number) => {
  localContent.value.items.splice(index, 1)
  emitUpdate()
}

const triggerFile = () => fileInput.value?.click()

const onFileSelect = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    localContent.value.backgroundImage = reader.result as string
    emitUpdate()
  }
  reader.readAsDataURL(file)
}

const removeBg = () => {
  localContent.value.backgroundImage = ''
  if (fileInput.value) fileInput.value.value = ''
  emitUpdate()
}

watch(() => props.content, (newVal: BoardContent) => {
  localContent.value = {
    ...newVal,
    items: newVal.items.map((item: BoardItem) => ({ ...item }))
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

.option-row {
  display: flex;
  gap: 0.5rem;
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

.range-input { flex: 1; }
.range-number { width: 5rem; }

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
