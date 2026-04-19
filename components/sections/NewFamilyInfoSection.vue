<template>
  <section :id="id" class="section newfamily">
    <div class="container-custom">
      <div class="section-header">
        <h2 class="section-title">{{ content.title }}</h2>
        <div v-if="content.showDivider" class="section-divider"></div>
        <p v-if="content.subtitle" class="section-subtitle">{{ content.subtitle }}</p>
      </div>

      <div class="newfamily__steps" :style="{ '--nf-cols': content.columns }">
        <div v-for="(step, i) in content.steps" :key="i" class="nf-card">
          <span class="nf-card__label">{{ step.label }}</span>
          <h3 class="nf-card__title">{{ step.title }}</h3>
          <p class="nf-card__subtitle">{{ step.subtitle }}</p>
          <div class="nf-card__divider"></div>
          <p class="nf-card__desc">{{ step.description }}</p>
          <a
            v-if="step.buttonText"
            :href="step.buttonLink || '#'"
            class="nf-card__btn"
            :class="{
              'nf-card__btn--theme': step.buttonUseTheme,
              'nf-card__btn--dark-text': step.buttonUseTheme && step.buttonTextDark
            }"
            :style="!step.buttonUseTheme ? { backgroundColor: step.buttonBgColor, color: step.buttonTextColor } : undefined"
          >
            {{ step.buttonText }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { NewFamilyInfoContent } from '~/types/site'

interface Props {
  id?: string
  content: NewFamilyInfoContent
}

defineProps<Props>()
</script>

<style scoped>
.newfamily__steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .newfamily__steps {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .newfamily__steps {
    grid-template-columns: repeat(var(--nf-cols, 4), 1fr);
  }
}

.nf-card {
  background-color: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 2.5rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 22rem;
}

.nf-card__label {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--gray-900);
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.nf-card__title {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--gray-900);
  margin-bottom: 0.75rem;
}

.nf-card__subtitle {
  font-size: 0.9375rem;
  color: var(--gray-500);
  margin-bottom: 1.5rem;
}

.nf-card__divider {
  width: 2.5rem;
  height: 1px;
  background-color: var(--gray-300);
  margin-bottom: 1.5rem;
}

.nf-card__desc {
  font-size: 0.9375rem;
  color: var(--gray-600);
  line-height: 1.6;
  flex: 1;
}

.nf-card__btn {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  border-radius: var(--radius-sm);
  transition: opacity var(--transition-fast);
}

.nf-card__btn--theme {
  background-color: var(--primary-500);
  color: #fff;
}

.nf-card__btn--theme.nf-card__btn--dark-text {
  color: var(--gray-900);
}

.nf-card__btn:hover {
  opacity: 0.85;
}
</style>
