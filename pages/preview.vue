<template>
  <div class="onepage">
    <!-- Dynamic Section Rendering -->
    <template v-for="section in enabledSections" :key="section.id">
      <div :style="section.useBgColor ? { backgroundColor: section.bgColor } : undefined">
        <component
          :is="getSectionComponent(section.type)"
          :id="section.id"
          :content="getSectionContent(section.type)"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useSiteStore } from '~/stores/site'
import { useThemeColor } from '~/composables/useThemeColor'
import type { SectionType } from '~/types/site'

import HeaderSection from '~/components/sections/HeaderSection.vue'
import HeroSection from '~/components/sections/HeroSection.vue'
import ChurchIntroSection from '~/components/sections/ChurchIntroSection.vue'
import WorshipInfoSection from '~/components/sections/WorshipInfoSection.vue'
import BoardSection from '~/components/sections/BoardSection.vue'
import NewFamilyInfoSection from '~/components/sections/NewFamilyInfoSection.vue'
import YouthSection from '~/components/sections/YouthSection.vue'
import GallerySection from '~/components/sections/GallerySection.vue'
import MapSection from '~/components/sections/MapSection.vue'
import FooterSection from '~/components/sections/FooterSection.vue'

const siteStore = useSiteStore()
useThemeColor()

onMounted(() => {
  siteStore.loadFromLocal()
})

// Get enabled sections in order
const enabledSections = computed(() => siteStore.enabledSections)

// Section component mapping
const sectionComponents: Record<string, any> = {
  header: HeaderSection,
  hero: HeroSection,
  churchIntro: ChurchIntroSection,
  worshipInfo: WorshipInfoSection,
  board: BoardSection,
  newfamilyInfo: NewFamilyInfoSection,
  youth: YouthSection,
  gallery: GallerySection,
  map: MapSection,
  footer: FooterSection
}

const getSectionComponent = (type: SectionType) => {
  return sectionComponents[type] || null
}

const getSectionContent = (type: SectionType) => {
  return siteStore.content[type]
}
</script>
