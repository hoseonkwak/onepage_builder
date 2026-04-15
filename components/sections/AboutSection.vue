<template>
  <section :id="id" class="section bg-gray-50">
    <div class="container-custom">
      <div
        class="grid gap-12 items-center"
        :class="layoutClass"
      >
        <!-- Image -->
        <div v-if="content.image" class="about-image">
          <img
            :src="content.image"
            :alt="content.title"
            class="w-full rounded-xl shadow-lg"
          />
        </div>

        <!-- Content -->
        <div class="about-content">
          <h2 class="section-title">{{ content.title }}</h2>
          <p v-if="content.subtitle" class="text-primary-500 font-medium mb-4">
            {{ content.subtitle }}
          </p>
          <p class="text-gray-600 leading-relaxed mb-8">
            {{ content.description }}
          </p>

          <!-- Stats -->
          <div v-if="content.stats?.length" class="grid grid-cols-3 gap-4">
            <div
              v-for="(stat, index) in content.stats"
              :key="index"
              class="text-center"
            >
              <div class="text-3xl font-bold text-primary-500">
                {{ stat.value }}
              </div>
              <div class="text-sm text-gray-600">
                {{ stat.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { AboutContent } from '~/types/site'

interface Props {
  id?: string
  content: AboutContent
}

const props = defineProps<Props>()

const layoutClass = computed(() => {
  if (!props.content.image) return ''

  const layouts = {
    'image-left': 'md:grid-cols-2',
    'image-right': 'md:grid-cols-2 [&>.about-image]:order-last',
    'image-top': 'grid-cols-1'
  }
  return layouts[props.content.layout] || 'md:grid-cols-2'
})
</script>

<style scoped>
.about-content {
  @apply flex flex-col justify-center;
}
</style>
