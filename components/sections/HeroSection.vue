<template>
  <section
    :id="id"
    class="hero"
    :class="[`hero--${content.textAlign}`]"
    :style="{ ...heroStyle, minHeight: `${content.height}px` }"
  >
    <!-- Content -->
    <div class="container-custom relative z-10">
      <div class="hero__content">
        <h1 class="hero__title">
          {{ content.title }}
        </h1>
        <p class="hero__subtitle">
          {{ content.subtitle }}
        </p>
        <p v-if="content.description" class="hero__description">
          {{ content.description }}
        </p>

        <!-- Button -->
        <div v-if="content.buttonText" class="hero__buttons">
          <a
            :href="content.buttonLink"
            class="hero__button"
            :style="{
              backgroundColor: content.buttonBgColor,
              color: content.buttonTextColor,
              borderRadius: `${content.buttonBorderRadius}px`
            }"
            @click.prevent="scrollToSection(content.buttonLink)"
          >
            {{ content.buttonText }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { HeroContent } from '~/types/site'

interface Props {
  id?: string
  content: HeroContent
}

const props = defineProps<Props>()

const heroStyle = computed(() => {
  if (props.content.backgroundImage) {
    return {
      backgroundImage: `url(${props.content.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  }
  return {}
})

const scrollToSection = (href: string | undefined) => {
  if (!href) return
  const id = href.replace('#', '')
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.hero {
  @apply relative flex items-center justify-center bg-gray-900 min-h-[60vh] py-20;
}

.hero__content {
  @apply max-w-3xl mx-auto;
}

.hero--left .hero__content {
  @apply text-left mr-auto;
}

.hero--center .hero__content {
  @apply text-center;
}

.hero--right .hero__content {
  @apply text-right ml-auto;
}

.hero__title {
  @apply text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4;
}

.hero__subtitle {
  @apply text-xl md:text-2xl text-white/80 mb-4;
}

.hero__description {
  @apply text-lg text-white/70 mb-8;
}

.hero__buttons {
  @apply flex flex-wrap gap-4 mt-8;
}

.hero__button {
  @apply inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:opacity-90;
}

.hero--center .hero__buttons {
  @apply justify-center;
}

.hero--right .hero__buttons {
  @apply justify-end;
}
</style>
