<template>
  <section :id="id" class="section bg-white">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="section-title">{{ content.title }}</h2>
        <p v-if="content.subtitle" class="section-subtitle max-w-2xl mx-auto">
          {{ content.subtitle }}
        </p>
      </div>

      <!-- Intro Grid -->
      <div
        class="grid gap-8"
        :class="gridCols"
      >
        <div
          v-for="(item, index) in content.items"
          :key="index"
          class="intro-card"
          :class="cardStyle"
        >
          <div class="intro-icon">
            <Icon :name="item.icon" class="w-8 h-8" />
          </div>
          <h3 class="intro-title">{{ item.title }}</h3>
          <p class="intro-description">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ChurchIntroContent } from '~/types/site'

interface Props {
  id?: string
  content: ChurchIntroContent
}

const props = defineProps<Props>()

const gridCols = computed(() => {
  const cols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  }
  return cols[props.content.columns] || 'md:grid-cols-3'
})

const cardStyle = computed(() => {
  const styles = {
    cards: 'intro-card--cards',
    icons: 'intro-card--icons',
    minimal: 'intro-card--minimal'
  }
  return styles[props.content.style] || ''
})
</script>

<style scoped>
.intro-card {
  @apply text-center;
}

.intro-card--cards {
  @apply p-6 pt-12 pb-12 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow relative;
}

.intro-card--icons {
  @apply p-4;
}

.intro-card--minimal {
  @apply p-4 border-l-2 border-primary-500 text-left;
}

.intro-icon {
  @apply w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center absolute top-[-2rem] left-1/2 -translate-x-1/2;
}

.intro-card--minimal .intro-icon {
  @apply mx-0 w-12 h-12;
}

.intro-title {
  @apply text-2xl font-semibold text-gray-900 mb-4;
}

.intro-description {
  @apply text-gray-600 text-[1rem];
}
</style>
