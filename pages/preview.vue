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
import type { SectionType } from '~/types/site'

// Section Components (will be implemented)
import HeaderSection from '~/components/sections/HeaderSection.vue'
import HeroSection from '~/components/sections/HeroSection.vue'
import FeaturesSection from '~/components/sections/FeaturesSection.vue'
import AboutSection from '~/components/sections/AboutSection.vue'
import ContactSection from '~/components/sections/ContactSection.vue'
import FooterSection from '~/components/sections/FooterSection.vue'

const siteStore = useSiteStore()

// Load saved content on mount
onMounted(() => {
  siteStore.loadFromLocal()
})

// Get enabled sections in order
const enabledSections = computed(() => siteStore.enabledSections)

// Section component mapping
const sectionComponents: Record<string, any> = {
  header: HeaderSection,
  hero: HeroSection,
  features: FeaturesSection,
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
