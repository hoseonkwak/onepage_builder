<template>
  <div class="admin-page">
    <!-- 템플릿 선택 화면 -->
    <div v-if="!siteStore.builderTemplate" class="template-select-page">
      <div class="template-select-container">
        <h1 class="template-select__title">원페이지 빌더</h1>
        <p class="template-select__desc">템플릿을 선택하여 시작하세요</p>

        <div class="template-grid">
          <!-- Type 1 -->
          <div
            class="template-card"
            @click="selectTemplate('type1')"
          >
            <div class="template-preview template-preview--type1">
              <div class="preview-header"></div>
              <div class="preview-hero"></div>
              <div class="preview-content">
                <div class="preview-box"></div>
                <div class="preview-box"></div>
                <div class="preview-box"></div>
              </div>
            </div>
            <div class="template-info">
              <h3 class="template-name">Type 1</h3>
              <p class="template-desc">기본 레이아웃</p>
            </div>
          </div>

          <!-- Type 2 -->
          <div
            class="template-card template-card--disabled"
            @click="selectTemplate('type2')"
          >
            <div class="template-preview">
              <div class="preview-placeholder">
                <Icon name="mdi:hammer-wrench" class="icon-48 color-gray-300" />
                <span class="preview-placeholder__text">준비 중</span>
              </div>
            </div>
            <div class="template-info">
              <h3 class="template-name">Type 2</h3>
              <p class="template-desc">준비 중</p>
            </div>
          </div>

          <!-- Type 3 -->
          <div
            class="template-card template-card--disabled"
            @click="selectTemplate('type3')"
          >
            <div class="template-preview">
              <div class="preview-placeholder">
                <Icon name="mdi:hammer-wrench" class="icon-48 color-gray-300" />
                <span class="preview-placeholder__text">준비 중</span>
              </div>
            </div>
            <div class="template-info">
              <h3 class="template-name">Type 3</h3>
              <p class="template-desc">준비 중</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 에디터 화면 -->
    <NuxtLayout v-else name="admin">
      <div class="editor-layout">
        <!-- Left Panel: Section List -->
        <aside class="editor-sidebar">
          <div class="editor-sidebar__inner">
            <!-- 메인 컬러 설정 -->
            <div class="color-setting">
              <h2 class="editor-sidebar__title">메인 컬러</h2>
              <div class="color-setting__picker">
                <input
                  type="color"
                  :value="primaryColor"
                  @input="onColorChange"
                  class="color-setting__input"
                />
                <span class="color-setting__value">{{ primaryColor }}</span>
              </div>
              <div class="color-setting__palette">
                <span
                  v-for="shade in palettePreview"
                  :key="shade"
                  class="color-setting__swatch"
                  :style="{ backgroundColor: shade }"
                />
              </div>
            </div>

            <div class="editor-sidebar__divider" />

            <div class="editor-sidebar__header">
              <h2 class="editor-sidebar__title">섹션 구성</h2>
              <button
                @click="backToTemplateSelect"
                class="editor-sidebar__back"
                title="템플릿 선택으로 돌아가기"
              >
                <Icon name="mdi:arrow-left" class="icon-16" />
              </button>
            </div>

            <!-- Draggable Section List -->
            <VueDraggable
              v-model="sectionList"
              :animation="200"
              handle=".drag-handle"
              @end="onReorder"
              class="stack-2"
            >
              <div
                v-for="section in sectionList"
                :key="section.type"
                class="section-item"
                :class="{ active: selectedSection === section.type }"
                @click="selectSection(section.type)"
              >
                <Icon name="mdi:drag" class="drag-handle icon-16" />
                <input
                  type="checkbox"
                  :checked="section.enabled"
                  @click.stop="toggleSection(section.type)"
                  class="section-checkbox"
                />
                <span class="section-item__label">
                  {{ getSectionLabel(section.type) }}
                </span>
              </div>
            </VueDraggable>
          </div>
        </aside>

        <!-- Center: Preview -->
        <main class="editor-preview">
          <!-- Sticky Header -->
          <div
            v-if="headerSection && headerSection.enabled"
            class="editor-preview__sticky-header section-preview-item"
            :class="{ 'section-preview-item--selected': selectedSection === 'header' }"
            style="max-width: 1200px;"
            @click="selectSection('header')"
          >
            <component
              :is="getSectionComponent('header')"
              id="header"
              :content="getSectionContent('header')"
              :preview-mode="true"
            />
          </div>

          <!-- Other Sections -->
          <div class="editor-preview__body">
            <div class="preview-container editor-preview__container">
              <template v-for="section in nonHeaderSections" :key="section.id">
                <div
                  class="section-preview-item"
                  :class="{ 'section-preview-item--selected': selectedSection === section.type }"
                  @click="selectSection(section.type)"
                >
                  <component
                    :is="getSectionComponent(section.type)"
                    :id="section.id"
                    :content="getSectionContent(section.type)"
                    :preview-mode="true"
                  />
                </div>
              </template>

              <!-- Empty state -->
              <div v-if="enabledSections.length === 0" class="editor-preview__empty">
                <Icon name="mdi:view-grid-plus-outline" class="icon-64 color-gray-300" />
                <p>활성화된 섹션이 없습니다.</p>
                <p class="editor-preview__empty-hint">왼쪽 패널에서 섹션을 체크해주세요.</p>
              </div>
            </div>
          </div>
        </main>

        <!-- Right Panel: Editor -->
        <aside class="editor-panel">
          <div class="editor-panel__inner">
            <template v-if="selectedSection">
              <h2 class="editor-panel__title">
                {{ getSectionLabel(selectedSection) }} 편집
              </h2>

              <HeaderEditor
                v-if="selectedSection === 'header'"
                :content="siteStore.content.header"
                @update="updateHeaderContent"
              />

              <HeroEditor
                v-else-if="selectedSection === 'hero'"
                :content="siteStore.content.hero"
                @update="updateHeroContent"
              />

              <ChurchIntroEditor
                v-else-if="selectedSection === 'churchIntro'"
                :content="siteStore.content.churchIntro"
                @update="updateChurchIntroContent"
              />

              <p v-else class="editor-panel__placeholder">
                편집 패널이 여기에 표시됩니다.
              </p>
            </template>
            <template v-else>
              <div class="editor-panel__empty">
                <Icon name="mdi:cursor-default-click" class="icon-48 color-gray-400" />
                <p>섹션을 선택하세요</p>
              </div>
            </template>
          </div>
        </aside>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { useSiteStore, type BuilderTemplateType } from '~/stores/site'
import type { SectionType, SectionConfig, HeaderContent, HeroContent, ChurchIntroContent } from '~/types/site'
import { useThemeColor } from '~/composables/useThemeColor'

// Section Components
import HeaderSection from '~/components/sections/HeaderSection.vue'
import HeroSection from '~/components/sections/HeroSection.vue'
import ChurchIntroSection from '~/components/sections/ChurchIntroSection.vue'
import AboutSection from '~/components/sections/AboutSection.vue'
import ContactSection from '~/components/sections/ContactSection.vue'
import FooterSection from '~/components/sections/FooterSection.vue'

// Editor Components
import HeaderEditor from '~/components/editors/HeaderEditor.vue'
import HeroEditor from '~/components/editors/HeroEditor.vue'
import ChurchIntroEditor from '~/components/editors/ChurchIntroEditor.vue'

definePageMeta({
  layout: false
})

const siteStore = useSiteStore()
const { primaryColor, setPrimaryColor } = useThemeColor()

const onColorChange = (e: Event) => {
  setPrimaryColor((e.target as HTMLInputElement).value)
}

const palettePreview = computed(() => {
  return generateShades(primaryColor.value)
})

function generateShades(hex: string): string[] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }

  const hDeg = h * 360
  const toHex = (hh: number, ss: number, ll: number) => {
    ss /= 100; ll /= 100
    const a = ss * Math.min(ll, 1 - ll)
    const f = (n: number) => {
      const k = (n + hh / 30) % 12
      const c = ll - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * c).toString(16).padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
  }

  const baseS = s * 100
  const baseL = l * 100
  const baseSat = Math.max(baseS, 15)
  const steps: [number, number][] = [
    [baseSat * 0.3,  Math.min(baseL + 44, 97)],
    [baseSat * 0.4,  Math.min(baseL + 38, 94)],
    [baseSat * 0.55, Math.min(baseL + 30, 90)],
    [baseSat * 0.7,  Math.min(baseL + 20, 82)],
    [baseSat * 0.85, Math.min(baseL + 10, 72)],
    [baseSat,        baseL],
    [baseSat,        Math.max(baseL - 8, 5)],
    [baseSat,        Math.max(baseL - 15, 4)],
    [baseSat * 0.95, Math.max(baseL - 22, 3)],
    [baseSat * 0.9,  Math.max(baseL - 28, 2)],
  ]
  return steps.map(([sat, ll]) => toHex(hDeg, Math.min(sat, 100), ll))
}

onMounted(() => {
  siteStore.loadFromLocal()
})

const selectTemplate = (template: BuilderTemplateType) => {
  siteStore.selectBuilderTemplate(template)
}

const backToTemplateSelect = () => {
  siteStore.resetBuilderTemplate()
}

const sectionList = computed({
  get: () => [...siteStore.content.sections].sort((a, b) => a.order - b.order),
  set: (value: SectionConfig[]) => {
    siteStore.reorderSections(value)
  }
})

const enabledSections = computed(() => siteStore.enabledSections)

const headerSection = computed(() =>
  siteStore.content.sections.find((s: SectionConfig) => s.type === 'header')
)

const nonHeaderSections = computed(() =>
  enabledSections.value.filter((s: SectionConfig) => s.type !== 'header')
)

const selectedSection = computed(() => siteStore.selectedSection)

const getSectionLabel = (type: SectionType) => siteStore.getSectionLabel(type)

const selectSection = (type: SectionType) => {
  siteStore.selectSection(type)
}

const toggleSection = (type: SectionType) => {
  siteStore.toggleSection(type)
}

const onReorder = () => {
  siteStore.reorderSections(sectionList.value)
}

const sectionComponents: Record<string, any> = {
  header: HeaderSection,
  hero: HeroSection,
  churchIntro: ChurchIntroSection,
  about: AboutSection,
  contact: ContactSection,
  footer: FooterSection
}

const getSectionComponent = (type: SectionType) => {
  return sectionComponents[type] || null
}

const getSectionContent = (type: SectionType) => {
  return siteStore.content[type]
}

const updateHeaderContent = (content: HeaderContent) => {
  siteStore.updateHeader(content)
}

const updateHeroContent = (content: HeroContent) => {
  siteStore.updateHero(content)
}

const updateChurchIntroContent = (content: ChurchIntroContent) => {
  siteStore.updateChurchIntro(content)
}
</script>

<style scoped>
/* Template Select */
.template-select-page {
  min-height: 100vh;
  background-color: var(--gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.template-select-container {
  text-align: center;
  max-width: 56rem;
  margin: 0 auto;
}

.template-select__title {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.template-select__desc {
  color: var(--gray-600);
  margin-bottom: 2rem;
}

.template-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .template-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.template-card {
  background-color: #fff;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-fast);
  border: 2px solid transparent;
}

.template-card:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
  border-color: var(--primary-500);
}

.template-card--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.template-card--disabled:hover {
  border-color: transparent;
  box-shadow: var(--shadow-md);
  transform: none;
}

.template-preview {
  height: 12rem;
  background-color: var(--gray-100);
  padding: 1rem;
}

.template-preview--type1 {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.preview-header {
  height: 1rem;
  background-color: var(--gray-300);
  border-radius: var(--radius-sm);
}

.preview-hero {
  height: 4rem;
  background-color: var(--primary-200);
  border-radius: var(--radius-sm);
}

.preview-content {
  flex: 1;
  display: flex;
  gap: 0.5rem;
}

.preview-box {
  flex: 1;
  background-color: var(--gray-200);
  border-radius: var(--radius-sm);
}

.preview-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.preview-placeholder__text {
  color: var(--gray-400);
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.template-info {
  padding: 1rem;
  text-align: left;
}

.template-name {
  font-weight: 600;
  color: var(--gray-900);
}

.template-desc {
  font-size: 0.875rem;
  color: var(--gray-500);
}

/* Editor Layout */
.editor-layout {
  display: flex;
  height: 100%;
}

.editor-sidebar {
  width: var(--sidebar-width);
  background-color: #fff;
  border-right: 1px solid var(--gray-200);
  overflow-y: auto;
}

.editor-sidebar__inner {
  padding: 1rem;
}

.editor-sidebar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.editor-sidebar__title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gray-600);
}

/* Color Setting */
.color-setting {
  margin-bottom: 0.5rem;
}

.color-setting__picker {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.color-setting__input {
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--gray-300);
  cursor: pointer;
  padding: 1px;
  flex-shrink: 0;
}

.color-setting__input::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-setting__input::-webkit-color-swatch {
  border: none;
  border-radius: 3px;
}

.color-setting__value {
  font-size: 0.75rem;
  color: var(--gray-500);
  font-family: monospace;
}

.color-setting__palette {
  display: flex;
  gap: 2px;
  margin-top: 0.5rem;
}

.color-setting__swatch {
  flex: 1;
  height: 0.75rem;
  border-radius: 2px;
}

.color-setting__swatch:first-child {
  border-radius: 2px 0 0 2px;
}

.color-setting__swatch:last-child {
  border-radius: 0 2px 2px 0;
}

.editor-sidebar__divider {
  height: 1px;
  background-color: var(--gray-200);
  margin: 0.75rem 0;
}

.editor-sidebar__back {
  font-size: 0.75rem;
  color: var(--gray-500);
  transition: color var(--transition-fast);
}

.editor-sidebar__back:hover {
  color: var(--primary-500);
}

.section-checkbox {
  width: 1rem;
  height: 1rem;
  border-radius: var(--radius-sm);
  accent-color: var(--primary-500);
}

.section-item__label {
  flex: 1;
  font-size: 0.875rem;
  color: var(--gray-700);
}

/* Preview */
.editor-preview {
  flex: 1;
  background-color: var(--gray-100);
  overflow-y: auto;
  position: relative;
}

.editor-preview__sticky-header {
  position: sticky;
  top: 0;
  z-index: 40;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: var(--shadow-sm);
}

.editor-preview__body {
  padding: 1rem;
  padding-top: 0;
}

.editor-preview__container {
  margin: 0 auto;
  box-shadow: var(--shadow-lg);
  max-width: 1200px;
}

.section-preview-item--selected {
  outline: 2px solid var(--primary-500);
  outline-offset: -2px;
}

.editor-preview__empty {
  text-align: center;
  padding: 5rem 0;
  color: var(--gray-500);
}

.editor-preview__empty-hint {
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

/* Editor Panel */
.editor-panel {
  width: var(--editor-width);
  background-color: #fff;
  border-left: 1px solid var(--gray-200);
  overflow-y: auto;
}

.editor-panel__inner {
  padding: 1rem;
}

.editor-panel__title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 1rem;
}

.editor-panel__placeholder {
  font-size: 0.875rem;
  color: var(--gray-500);
}

.editor-panel__empty {
  text-align: center;
  color: var(--gray-500);
  padding: 2rem 0;
}

.editor-panel__empty p {
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

/* Icon size utilities */
.icon-16 { width: 1rem; height: 1rem; }
.icon-48 { width: 3rem; height: 3rem; }
.icon-64 { width: 4rem; height: 4rem; }

.color-gray-300 { color: var(--gray-300); }
.color-gray-400 { color: var(--gray-400); }
</style>
