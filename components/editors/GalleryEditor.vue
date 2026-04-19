<template>
  <div class="gallery-editor stack-6">
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
            placeholder="갤러리"
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

    <!-- 이미지 목록 -->
    <div class="editor-section">
      <h3 class="editor-section-title">이미지</h3>
      <div class="stack-4">
        <!-- 업로드 버튼 -->
        <div class="gallery-upload">
          <div class="gallery-upload__dropzone" @click="triggerFile">
            <Icon name="mdi:image-plus" class="icon-32 color-gray-400" />
            <span class="gallery-upload__text">이미지 추가 (여러 개 선택 가능)</span>
          </div>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            multiple
            class="gallery-upload__input"
            @change="onFileSelect"
          />
        </div>

        <!-- 이미지 리스트 -->
        <div v-if="localContent.items.length" class="gallery-list">
          <div
            v-for="(item, index) in localContent.items"
            :key="index"
            class="gallery-list__item"
          >
            <div class="gallery-list__thumb">
              <img :src="item.image" :alt="item.title || ''" />
            </div>
            <div class="gallery-list__fields">
              <input
                :value="item.title"
                type="text"
                class="editor-input"
                placeholder="제목 (선택)"
                @input="(e) => updateField(index, 'title', getVal(e))"
              />
            </div>
            <button class="gallery-list__delete" @click="removeItem(index)" title="삭제">
              <Icon name="mdi:close" class="icon-20" />
            </button>
          </div>
        </div>

        <!-- URL 직접 추가 -->
        <div class="url-add">
          <label class="editor-label">또는 URL로 추가</label>
          <div class="url-add__row">
            <input
              v-model="urlInput"
              type="text"
              class="editor-input"
              placeholder="https://example.com/image.jpg"
              @keyup.enter="addByUrl"
            />
            <button class="url-add__btn" @click="addByUrl">추가</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GalleryContent, GalleryItem } from '~/types/site'

interface Props {
  content: GalleryContent
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update', content: GalleryContent): void
}>()

const columnOptions = [2, 3, 4] as const

const localContent = ref<GalleryContent>({
  ...props.content,
  items: props.content.items.map(i => ({ ...i }))
})

const fileInput = ref<HTMLInputElement | null>(null)
const urlInput = ref('')

const getVal = (e: Event): string => (e.target as HTMLInputElement).value

const emitUpdate = () => {
  emit('update', {
    ...localContent.value,
    items: localContent.value.items.map(i => ({ ...i }))
  })
}

const updateField = (index: number, field: keyof GalleryItem, value: string) => {
  (localContent.value.items[index] as any)[field] = value
  emitUpdate()
}

const setColumns = (value: 2 | 3 | 4) => {
  localContent.value.columns = value
  emitUpdate()
}

const removeItem = (index: number) => {
  localContent.value.items.splice(index, 1)
  emitUpdate()
}

const triggerFile = () => fileInput.value?.click()

const onFileSelect = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files || !files.length) return

  const readers: Promise<string>[] = []
  for (const file of Array.from(files)) {
    readers.push(new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.readAsDataURL(file)
    }))
  }

  Promise.all(readers).then((results) => {
    const newItems: GalleryItem[] = results.map(dataUrl => ({ image: dataUrl }))
    localContent.value.items = [...localContent.value.items, ...newItems]
    emitUpdate()
    if (fileInput.value) fileInput.value.value = ''
  })
}

const addByUrl = () => {
  const url = urlInput.value.trim()
  if (!url) return
  localContent.value.items = [...localContent.value.items, { image: url }]
  urlInput.value = ''
  emitUpdate()
}

watch(() => props.content, (newVal: GalleryContent) => {
  localContent.value = {
    ...newVal,
    items: newVal.items.map((i: GalleryItem) => ({ ...i }))
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

/* Upload dropzone */
.gallery-upload__dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  height: 5rem;
  border: 2px dashed var(--gray-300);
  border-radius: var(--radius-md);
  cursor: pointer;
  background-color: #fff;
  transition: border-color var(--transition-fast);
}

.gallery-upload__dropzone:hover {
  border-color: var(--primary-500);
}

.gallery-upload__text {
  font-size: 0.75rem;
  color: var(--gray-500);
}

.gallery-upload__input { display: none; }

/* Image list */
.gallery-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.gallery-list__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
}

.gallery-list__thumb {
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background-color: var(--gray-100);
}

.gallery-list__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-list__fields {
  flex: 1;
  min-width: 0;
}

.gallery-list__delete {
  color: var(--gray-400);
  background: transparent;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  transition: color var(--transition-fast);
}

.gallery-list__delete:hover {
  color: var(--red-500);
}

/* URL add */
.url-add__row {
  display: flex;
  gap: 0.5rem;
}

.url-add__btn {
  padding: 0 1rem;
  background-color: var(--primary-500);
  color: #fff;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  transition: background-color var(--transition-fast);
  white-space: nowrap;
}

.url-add__btn:hover {
  background-color: var(--primary-600);
}

.icon-20 { width: 1.25rem; height: 1.25rem; }
.icon-32 { width: 2rem; height: 2rem; }
.color-gray-400 { color: var(--gray-400); }
</style>
