<template>
  <section :id="id" class="section worship">
    <div class="container-custom">
      <!-- Header -->
      <div class="section-header">
        <h2 class="section-title">{{ content.title }}</h2>
        <div v-if="content.showDivider" class="section-divider"></div>
        <p v-if="content.subtitle" class="section-subtitle">
          {{ content.subtitle }}
        </p>
      </div>

      <!-- Items Grid -->
      <div class="worship__grid" :style="{ '--worship-cols': content.columns }">
        <div
          v-for="(item, index) in content.items"
          :key="index"
          class="worship__item"
        >
          <div
            class="worship__icon"
            :class="{ 'worship__icon--theme': content.iconUseTheme }"
            :style="!content.iconUseTheme ? { backgroundColor: content.iconBgColor, color: content.iconColor } : undefined"
          >
            <Icon :name="item.icon" class="icon-28" />
          </div>
          <div class="worship__text">
            <h3 class="worship__item-title">{{ item.title }}</h3>
            <p class="worship__item-desc" v-html="formatDesc(item.description)"></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { WorshipInfoContent } from '~/types/site'

interface Props {
  id?: string
  content: WorshipInfoContent
}

defineProps<Props>()

const formatDesc = (text: string) => {
  return text.replace(/\n/g, '<br>')
}
</script>

<style scoped>
.worship__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

@media (min-width: 768px) {
  .worship__grid {
    grid-template-columns: repeat(var(--worship-cols, 3), 1fr);
  }
}

.worship__item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.worship__icon {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.worship__icon--theme {
  background-color: var(--primary-100);
  color: var(--primary-500);
}

.worship__text {
  flex: 1;
}

.worship__item-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.worship__item-desc {
  font-size: 0.9375rem;
  color: var(--gray-600);
  line-height: 1.8;
}

.icon-28 { width: 46px; height: 46px; }
</style>
