<template>
  <section :id="id" class="section youth">
    <div class="container-custom">
      <div class="section-header">
        <h2 class="section-title">{{ content.title }}</h2>
        <div v-if="content.showDivider" class="section-divider"></div>
        <p v-if="content.subtitle" class="section-subtitle">{{ content.subtitle }}</p>
      </div>

      <div class="youth__grid" :style="{ '--youth-cols': content.columns }">
        <div v-for="(dept, i) in content.departments" :key="i" class="yd-card">
          <div class="yd-card__info">
            <h3 class="yd-card__name">{{ dept.name }}</h3>
            <div class="yd-card__underline"></div>
            <p class="yd-card__desc">{{ dept.description }}</p>
            <a
              v-if="dept.buttonText"
              :href="dept.buttonLink || '#'"
              class="yd-card__btn"
              :class="{
                'yd-card__btn--theme': dept.buttonUseTheme,
                'yd-card__btn--dark-text': dept.buttonUseTheme && dept.buttonTextDark
              }"
              :style="!dept.buttonUseTheme ? { backgroundColor: dept.buttonBgColor, color: dept.buttonTextColor } : undefined"
            >
              {{ dept.buttonText }}
            </a>
          </div>
          <div class="yd-card__image">
            <img v-if="dept.image" :src="dept.image" :alt="dept.name" />
            <div v-else class="yd-card__image-placeholder">
              <Icon name="mdi:image-outline" class="icon-48" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { YouthContent } from '~/types/site'

interface Props {
  id?: string
  content: YouthContent
}

defineProps<Props>()
</script>

<style scoped>
.youth__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .youth__grid {
    grid-template-columns: repeat(var(--youth-cols, 2), 1fr);
  }
}

.yd-card {
  background-color: #fff;
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 10rem;
  box-shadow: var(--shadow-sm);
}

.yd-card__info {
  padding: 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
}

.yd-card__name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.yd-card__underline {
  width: 2rem;
  height: 2px;
  background-color: var(--gray-400);
  margin-bottom: 1rem;
}

.yd-card__desc {
  font-size: 0.9375rem;
  color: var(--gray-600);
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex: 1;
}

.yd-card__btn {
  display: inline-block;
  align-self: flex-start;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
  transition: opacity var(--transition-fast);
}

.yd-card__btn:hover {
  opacity: 0.85;
}

.yd-card__btn--theme {
  background-color: var(--primary-500);
  color: #fff;
}

.yd-card__btn--theme.yd-card__btn--dark-text {
  color: var(--gray-900);
}

.yd-card__image {
  position: relative;
  overflow: hidden;
  background-color: var(--gray-100);
}

.yd-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.yd-card__image-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-300);
}

.icon-48 { width: 3rem; height: 3rem; }
</style>
