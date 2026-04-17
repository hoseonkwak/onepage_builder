<template>
  <section :id="id" class="section church-intro">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title">{{ content.title }}</h2>
        <div v-if="content.showDivider" class="section-divider"></div>
        <p v-if="content.subtitle" class="section-subtitle">
          {{ content.subtitle }}
        </p>
      </div>

      <!-- Intro Grid -->
      <div
        class="intro-grid"
        :style="gridStyle"
      >
        <div
          v-for="(item, index) in content.items"
          :key="index"
          class="intro-card"
          :class="cardStyle"
          :style="content.style === 'cards' ? cardInlineStyle : undefined"
        >
          <div
            class="intro-icon"
            :class="{ 'intro-icon--theme': content.iconUseTheme }"
            :style="!content.iconUseTheme ? { backgroundColor: content.iconBgColor, color: content.iconColor } : undefined"
          >
            <Icon :name="item.icon" class="icon-32" />
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

const gridStyle = computed(() => {
  const cols = props.content.columns || 3
  return {
    '--grid-cols': cols,
    '--grid-cols-md': Math.min(cols, 2),
  } as Record<string, string | number>
})

const cardStyle = computed(() => {
  const styles: Record<string, string> = {
    cards: 'intro-card--cards',
    icons: 'intro-card--icons',
    minimal: 'intro-card--minimal'
  }
  return styles[props.content.style] || ''
})

type ShadowSize = { blur: number; spread: number; opacity: number }
const shadowSizes: Record<string, ShadowSize> = {
  sm:  { blur: 3,  spread: 0,  opacity: 0.08 },
  md:  { blur: 8,  spread: -2, opacity: 0.12 },
  lg:  { blur: 18, spread: -4, opacity: 0.15 },
}

const dirOffsets: Record<string, [number, number]> = {
  center: [0, 0],
  left:   [-4, 4],
  bottom: [0, 4],
  right:  [4, 4],
}

function buildShadow(size: ShadowSize, dir: string): string {
  const [x, y] = dirOffsets[dir] || [0, 4]
  const scale = size.blur / 8
  return `${Math.round(x * scale)}px ${Math.round(y * scale)}px ${size.blur}px ${size.spread}px rgb(0 0 0 / ${size.opacity})`
}

const cardInlineStyle = computed(() => {
  const c = props.content
  const style: Record<string, string> = {
    backgroundColor: c.cardBgColor || '#f9fafb'
  }
  if (c.cardShadow === 'custom') {
    style.boxShadow = `${c.cardShadowX}px ${c.cardShadowY}px ${c.cardShadowBlur}px ${c.cardShadowSpread}px ${c.cardShadowColor}`
  } else if (c.cardShadow && c.cardShadow !== 'none') {
    const size = shadowSizes[c.cardShadow]
    if (size) {
      style.boxShadow = buildShadow(size, c.cardShadowDir || 'bottom')
    }
  }
  return style
})
</script>

<style scoped>
.church-intro {
  background-color: transparent;
}

.intro-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .intro-grid {
    grid-template-columns: repeat(var(--grid-cols-md, 2), 1fr);
  }
}

@media (min-width: 1024px) {
  .intro-grid {
    grid-template-columns: repeat(var(--grid-cols, 3), 1fr);
  }
}

.intro-card {
  text-align: center;
}

.intro-card--cards {
  padding: 3rem 1.5rem 3rem;
  border-radius: var(--radius-xl);
  position: relative;
  transition: box-shadow var(--transition-fast);
}

.intro-card--cards:hover {
  box-shadow: var(--shadow-lg);
}

.intro-card--icons {
  padding: 1rem;
}

.intro-card--minimal {
  padding: 1rem;
  border-left: 2px solid var(--primary-500);
  text-align: left;
}

.intro-icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
}

.intro-icon--theme {
  background-color: var(--primary-100);
  color: var(--primary-500);
}

.intro-card--cards .intro-icon {
  position: absolute;
  top: -2rem;
  left: 50%;
  transform: translateX(-50%);
}

.intro-card--minimal .intro-icon {
  margin: 0 0 1rem 0;
  width: 3rem;
  height: 3rem;
}

.intro-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 1rem;
}

.intro-description {
  color: var(--gray-600);
  font-size: 1rem;
}

.icon-32 { width: 2rem; height: 2rem; }
</style>
