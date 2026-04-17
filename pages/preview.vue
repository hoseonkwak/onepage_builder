<template>
  <div class="onepage">
    <!-- Dynamic Section Rendering -->
    <template v-for="section in enabledSections" :key="section.id">
      <component
        :is="getSectionComponent(section.type)"
        :id="section.id"
        :content="getSectionContent(section.type)"
      />
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
import AboutSection from '~/components/sections/AboutSection.vue'
import ContactSection from '~/components/sections/ContactSection.vue'
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
  about: AboutSection,
  contact: ContactSection,
  footer: FooterSection
  // TODO: Add more section components
}

const getSectionComponent = (type: SectionType) => {
  return sectionComponents[type] || null
}

const getSectionContent = (type: SectionType) => {
  return siteStore.content[type]
}
</script>
