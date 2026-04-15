<template>
  <div class="admin-page">
    <!-- 템플릿 선택 화면 -->
    <div v-if="!siteStore.builderTemplate" class="template-select-page">
      <div class="template-select-container">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">원페이지 빌더</h1>
        <p class="text-gray-600 mb-8">템플릿을 선택하여 시작하세요</p>

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
            <div class="template-preview template-preview--type2">
              <div class="preview-placeholder">
                <Icon name="mdi:hammer-wrench" class="w-12 h-12 text-gray-300" />
                <span class="text-gray-400 text-sm mt-2">준비 중</span>
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
            <div class="template-preview template-preview--type3">
              <div class="preview-placeholder">
                <Icon name="mdi:hammer-wrench" class="w-12 h-12 text-gray-300" />
                <span class="text-gray-400 text-sm mt-2">준비 중</span>
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
      <div class="flex h-full">
        <!-- Left Panel: Section List -->
        <aside class="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div class="p-4">
            <div class="flex items-center justify-between mb-3">
              <h2 class="text-sm font-semibold text-gray-600">섹션 구성</h2>
              <button
                @click="backToTemplateSelect"
                class="text-xs text-gray-500 hover:text-primary-500"
                title="템플릿 선택으로 돌아가기"
              >
                <Icon name="mdi:arrow-left" class="w-4 h-4" />
              </button>
            </div>

            <!-- Draggable Section List -->
            <VueDraggable
              v-model="sectionList"
              :animation="200"
              handle=".drag-handle"
              @end="onReorder"
              class="space-y-2"
            >
              <div
                v-for="section in sectionList"
                :key="section.type"
                class="section-item"
                :class="{ active: selectedSection === section.type }"
                @click="selectSection(section.type)"
              >
                <Icon name="mdi:drag" class="drag-handle w-4 h-4" />
                <input
                  type="checkbox"
                  :checked="section.enabled"
                  @click.stop="toggleSection(section.type)"
                  class="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                />
                <span class="flex-1 text-sm text-gray-700">
                  {{ getSectionLabel(section.type) }}
                </span>
              </div>
            </VueDraggable>
          </div>
        </aside>

        <!-- Center: Preview -->
        <main class="flex-1 bg-gray-100 overflow-y-auto relative">
          <!-- Sticky Header - positioned at top of main -->
          <div
            v-if="headerSection && headerSection.enabled"
            class="sticky top-0 z-40 mx-auto section-preview-item bg-white shadow-sm"
            :class="{ 'ring-2 ring-blue-500': selectedSection === 'header' }"
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
          <div class="p-4 pt-0">
            <div class="preview-container mx-auto bg-white shadow-lg" style="max-width: 1200px;">
              <template v-for="section in nonHeaderSections" :key="section.id">
                <div
                  class="section-preview-item"
                  :class="{ 'ring-2 ring-blue-500': selectedSection === section.type }"
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
              <div v-if="enabledSections.length === 0" class="text-center py-20 text-gray-500">
                <Icon name="mdi:view-grid-plus-outline" class="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>활성화된 섹션이 없습니다.</p>
                <p class="text-sm mt-1">왼쪽 패널에서 섹션을 체크해주세요.</p>
              </div>
            </div>
          </div>
        </main>

        <!-- Right Panel: Editor -->
        <aside class="w-96 bg-white border-l border-gray-200 overflow-y-auto">
          <div class="p-4">
            <template v-if="selectedSection">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">
                {{ getSectionLabel(selectedSection) }} 편집
              </h2>

              <!-- Header Editor -->
              <HeaderEditor
                v-if="selectedSection === 'header'"
                :content="siteStore.content.header"
                @update="updateHeaderContent"
              />

              <!-- Hero Editor -->
              <HeroEditor
                v-else-if="selectedSection === 'hero'"
                :content="siteStore.content.hero"
                @update="updateHeroContent"
              />

              <!-- ChurchIntro Editor -->
              <ChurchIntroEditor
                v-else-if="selectedSection === 'churchIntro'"
                :content="siteStore.content.churchIntro"
                @update="updateChurchIntroContent"
              />

              <!-- Other section editors placeholder -->
              <p v-else class="text-sm text-gray-500">
                편집 패널이 여기에 표시됩니다.
              </p>
            </template>
            <template v-else>
              <div class="text-center text-gray-500 py-8">
                <Icon name="mdi:cursor-default-click" class="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p class="text-sm">섹션을 선택하세요</p>
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

// Load saved content on mount
onMounted(() => {
  siteStore.loadFromLocal()
})

// Template selection
const selectTemplate = (template: BuilderTemplateType) => {
  siteStore.selectBuilderTemplate(template)
}

const backToTemplateSelect = () => {
  siteStore.resetBuilderTemplate()
}

// Section list for draggable
const sectionList = computed({
  get: () => [...siteStore.content.sections].sort((a, b) => a.order - b.order),
  set: (value: SectionConfig[]) => {
    siteStore.reorderSections(value)
  }
})

// Get enabled sections in order
const enabledSections = computed(() => siteStore.enabledSections)

// Header section separately for sticky positioning
const headerSection = computed(() =>
  siteStore.content.sections.find((s: SectionConfig) => s.type === 'header')
)

// Non-header sections for normal rendering
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

// Section component mapping
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

// Update header content
const updateHeaderContent = (content: HeaderContent) => {
  siteStore.updateHeader(content)
}

// Update hero content
const updateHeroContent = (content: HeroContent) => {
  siteStore.updateHero(content)
}

// Update churchIntro content
const updateChurchIntroContent = (content: ChurchIntroContent) => {
  siteStore.updateChurchIntro(content)
}
</script>

<style scoped>
/* 템플릿 선택 페이지 */
.template-select-page {
  @apply min-h-screen bg-gray-50 flex items-center justify-center p-8;
}

.template-select-container {
  @apply text-center max-w-4xl mx-auto;
}

.template-grid {
  @apply grid grid-cols-1 md:grid-cols-3 gap-6;
}

.template-card {
  @apply bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1 border-2 border-transparent;
}

.template-card:hover {
  @apply border-primary-500;
}

.template-card--disabled {
  @apply opacity-60 cursor-not-allowed;
}

.template-card--disabled:hover {
  @apply border-transparent shadow-md translate-y-0;
}

.template-preview {
  @apply h-48 bg-gray-100 p-4;
}

.template-preview--type1 {
  @apply flex flex-col gap-2;
}

.preview-header {
  @apply h-4 bg-gray-300 rounded;
}

.preview-hero {
  @apply h-16 bg-primary-200 rounded;
}

.preview-content {
  @apply flex-1 flex gap-2;
}

.preview-box {
  @apply flex-1 bg-gray-200 rounded;
}

.preview-placeholder {
  @apply h-full flex flex-col items-center justify-center;
}

.template-info {
  @apply p-4 text-left;
}

.template-name {
  @apply font-semibold text-gray-900;
}

.template-desc {
  @apply text-sm text-gray-500;
}
</style>
