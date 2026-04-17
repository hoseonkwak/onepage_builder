<template>
  <section :id="id" class="section church-intro">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="church-intro__header">
        <h2 class="section-title">{{ content.title }}</h2>
        <p v-if="content.subtitle" class="section-subtitle church-intro__subtitle">
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
        >
          <div class="intro-icon">
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
</script>

<style scoped>
.church-intro {
  background-color: #fff;
}

.church-intro__header {
  text-align: center;
  margin-bottom: 3rem;
}

.church-intro__subtitle {
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
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
  background-color: var(--gray-50);
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
  background-color: var(--primary-100);
  color: var(--primary-500);
  display: flex;
  align-items: center;
  justify-content: center;
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
