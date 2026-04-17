<template>
  <section
    :id="id"
    class="hero"
    :class="[`hero--${content.textAlign}`]"
    :style="{ ...heroStyle, minHeight: `${content.height}px` }"
  >
    <div
      v-if="content.dimEnabled"
      class="dim-overlay"
      :style="{ backgroundColor: `rgba(0, 0, 0, ${(content.dimOpacity ?? 30) / 100})` }"
    ></div>
    <div class="container-custom hero__container">
      <div class="hero__content">
        <h1 class="hero__title" :class="{ 'hero__text--dark': content.textDark }">
          {{ content.title }}
        </h1>
        <p class="hero__subtitle" :class="{ 'hero__text--dark': content.textDark }">
          {{ content.subtitle }}
        </p>
        <p v-if="content.description" class="hero__description" :class="{ 'hero__text--dark': content.textDark }">
          {{ content.description }}
        </p>

        <div v-if="content.buttonText" class="hero__buttons">
          <a
            :href="content.buttonLink"
            class="hero__button"
            :class="{
              'hero__button--theme': content.buttonUseTheme,
              'hero__button--theme-dark': content.buttonUseTheme && content.buttonTextDark
            }"
            :style="buttonStyle"
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

const buttonStyle = computed(() => {
  const style: Record<string, string> = {
    borderRadius: `${props.content.buttonBorderRadius}px`
  }
  if (!props.content.buttonUseTheme) {
    style.backgroundColor = props.content.buttonBgColor
    style.color = props.content.buttonTextColor
  }
  return style
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--gray-900);
  min-height: 60vh;
  padding: 5rem 0;
}

.hero__container {
  position: relative;
  z-index: 2;
}

.hero__content {
  max-width: 48rem;
  margin: 0 auto;
}

.hero--left .hero__content {
  text-align: left;
  margin-right: auto;
}

.hero--center .hero__content {
  text-align: center;
}

.hero--right .hero__content {
  text-align: right;
  margin-left: auto;
}

.hero__text--dark { color: var(--gray-900) !important; }
.hero__text--dark.hero__subtitle { color: var(--gray-700) !important; }
.hero__text--dark.hero__description { color: var(--gray-600) !important; }

.hero__title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .hero__title {
    font-size: 3rem;
  }
}

@media (min-width: 1024px) {
  .hero__title {
    font-size: 3.75rem;
  }
}

.hero__subtitle {
  font-size: 1.25rem;
  color: rgb(255 255 255 / 0.8);
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .hero__subtitle {
    font-size: 1.5rem;
  }
}

.hero__description {
  font-size: 1.125rem;
  color: rgb(255 255 255 / 0.7);
  margin-bottom: 2rem;
}

.hero__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

.hero__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: var(--radius-lg);
  transition: opacity var(--transition-fast);
}

.hero__button:hover {
  opacity: 0.9;
}

.hero__button--theme {
  background-color: var(--primary-500);
  color: #fff;
}

.hero__button--theme:hover {
  background-color: var(--primary-600);
  opacity: 1;
}

.hero__button--theme-dark {
  color: var(--gray-900);
}

.hero--center .hero__buttons {
  justify-content: center;
}

.hero--right .hero__buttons {
  justify-content: flex-end;
}

.dim-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
