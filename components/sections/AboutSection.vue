<template>
  <section :id="id" class="section about">
    <div class="container-custom">
      <div
        class="about__grid"
        :class="layoutClass"
      >
        <!-- Image -->
        <div v-if="content.image" class="about__image" :class="imageOrderClass">
          <img
            :src="content.image"
            :alt="content.title"
            class="about__img"
          />
        </div>

        <!-- Content -->
        <div class="about__content">
          <h2 class="section-title">{{ content.title }}</h2>
          <p v-if="content.subtitle" class="about__subtitle">
            {{ content.subtitle }}
          </p>
          <p class="about__description">
            {{ content.description }}
          </p>

          <!-- Stats -->
          <div v-if="content.stats?.length" class="about__stats">
            <div
              v-for="(stat, index) in content.stats"
              :key="index"
              class="about__stat"
            >
              <div class="about__stat-value">
                {{ stat.value }}
              </div>
              <div class="about__stat-label">
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
  if (props.content.layout === 'image-top') return 'about__grid--single'
  return 'about__grid--two-col'
})

const imageOrderClass = computed(() => {
  if (props.content.layout === 'image-right') return 'about__image--right'
  return ''
})
</script>

<style scoped>
.about {
  background-color: var(--gray-50);
}

.about__grid {
  display: grid;
  gap: 3rem;
  align-items: center;
}

.about__grid--two-col {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .about__grid--two-col {
    grid-template-columns: 1fr 1fr;
  }
}

.about__grid--single {
  grid-template-columns: 1fr;
}

.about__image--right {
  order: 0;
}

@media (min-width: 768px) {
  .about__image--right {
    order: 1;
  }
}

.about__img {
  width: 100%;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

.about__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.about__subtitle {
  color: var(--primary-500);
  font-weight: 500;
  margin-bottom: 1rem;
}

.about__description {
  color: var(--gray-600);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.about__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.about__stat {
  text-align: center;
}

.about__stat-value {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--primary-500);
}

.about__stat-label {
  font-size: 0.875rem;
  color: var(--gray-600);
}
</style>
