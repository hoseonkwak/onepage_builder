<template>
  <div class="footer-editor stack-6">
    <!-- 주소 -->
    <div class="editor-section">
      <h3 class="editor-section-title">주소</h3>
      <div>
        <label class="editor-label">주소</label>
        <input
          v-model="localContent.address"
          type="text"
          class="editor-input"
          placeholder="서울시 관악구 국회단지길 14"
          @input="emitUpdate"
        />
      </div>
    </div>

    <!-- 아이콘 색상 -->
    <div class="editor-section">
      <h3 class="editor-section-title">소셜 아이콘 색상</h3>
      <div class="stack-3">
        <div class="text-color-toggle">
          <button
            class="text-color-btn"
            :class="{ active: localContent.socialUseTheme }"
            @click="localContent.socialUseTheme = true; emitUpdate()"
          >테마 컬러</button>
          <button
            class="text-color-btn"
            :class="{ active: !localContent.socialUseTheme }"
            @click="localContent.socialUseTheme = false; emitUpdate()"
          >직접 선택</button>
        </div>
        <template v-if="!localContent.socialUseTheme">
          <div class="color-row">
            <div>
              <label class="editor-label">배경색</label>
              <div class="color-field">
                <input
                  :value="localContent.socialBgColor"
                  type="color"
                  class="color-picker"
                  @input="(e) => { localContent.socialBgColor = getVal(e); emitUpdate() }"
                />
                <input
                  :value="localContent.socialBgColor"
                  type="text"
                  class="editor-input"
                  placeholder="#111827"
                  @input="(e) => { localContent.socialBgColor = getVal(e); emitUpdate() }"
                />
              </div>
            </div>
            <div>
              <label class="editor-label">아이콘색</label>
              <div class="color-field">
                <input
                  :value="localContent.socialIconColor"
                  type="color"
                  class="color-picker"
                  @input="(e) => { localContent.socialIconColor = getVal(e); emitUpdate() }"
                />
                <input
                  :value="localContent.socialIconColor"
                  type="text"
                  class="editor-input"
                  placeholder="#ffffff"
                  @input="(e) => { localContent.socialIconColor = getVal(e); emitUpdate() }"
                />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 소셜 링크 -->
    <div class="editor-section">
      <h3 class="editor-section-title">소셜 링크</h3>
      <div class="stack-4">
        <div
          v-for="(social, index) in localContent.social || []"
          :key="index"
          class="item-card"
        >
          <div class="item-card__header">
            <span class="item-card__index">링크 {{ index + 1 }}</span>
            <button @click="removeSocial(index)" class="item-card__delete">삭제</button>
          </div>
          <div class="stack-2">
            <div>
              <label class="editor-label">플랫폼</label>
              <select
                :value="social.platform"
                class="editor-input"
                @change="(e) => updatePlatform(index, e)"
              >
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="twitter">Twitter</option>
                <option value="youtube">YouTube</option>
                <option value="linkedin">LinkedIn</option>
              </select>
            </div>
            <div>
              <label class="editor-label">URL</label>
              <input
                :value="social.url"
                type="text"
                class="editor-input"
                placeholder="https://..."
                @input="(e) => updateUrl(index, getVal(e))"
              />
            </div>
          </div>
        </div>
        <button @click="addSocial" class="add-item-btn">+ 소셜 링크 추가</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FooterContent, SocialLink } from '~/types/site'

interface Props {
  content: FooterContent
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update', content: FooterContent): void
}>()

const localContent = ref<FooterContent>({
  ...props.content,
  social: (props.content.social || []).map(s => ({ ...s }))
})

const getVal = (e: Event): string => (e.target as HTMLInputElement).value

const emitUpdate = () => {
  emit('update', {
    ...localContent.value,
    social: (localContent.value.social || []).map(s => ({ ...s }))
  })
}

const updatePlatform = (index: number, e: Event) => {
  if (!localContent.value.social) return
  localContent.value.social[index].platform = (e.target as HTMLSelectElement).value as SocialLink['platform']
  emitUpdate()
}

const updateUrl = (index: number, url: string) => {
  if (!localContent.value.social) return
  localContent.value.social[index].url = url
  emitUpdate()
}

const addSocial = () => {
  if (!localContent.value.social) localContent.value.social = []
  localContent.value.social.push({ platform: 'facebook', url: '#' })
  emitUpdate()
}

const removeSocial = (index: number) => {
  if (!localContent.value.social) return
  localContent.value.social.splice(index, 1)
  emitUpdate()
}

watch(() => props.content, (newVal: FooterContent) => {
  localContent.value = {
    ...newVal,
    social: (newVal.social || []).map((s: SocialLink) => ({ ...s }))
  }
}, { deep: true })
</script>

<style scoped>
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
