<template>
  <section
    :id="id"
    class="section board"
    :class="{ 'board--has-bg': !!content.backgroundImage }"
    :style="sectionStyle"
  >
    <div
      v-if="content.backgroundImage && content.dimEnabled"
      class="board__dim"
      :style="{ backgroundColor: `rgba(0, 0, 0, ${(content.dimOpacity ?? 50) / 100})` }"
    ></div>

    <div class="container-custom board__container" :class="{ 'board--light': !content.textDark }">
      <div class="section-header">
        <h2 class="section-title">{{ content.title }}</h2>
        <div v-if="content.showDivider" class="section-divider"></div>
        <p v-if="content.subtitle" class="section-subtitle">{{ content.subtitle }}</p>
      </div>

      <div class="board__cards">
        <a
          v-for="(item, i) in content.items"
          :key="i"
          :href="item.link || '#'"
          class="board-card"
        >
          <div class="board-card__body">
            <Icon
              name="mdi:format-quote-open"
              class="board-card__quote"
              :class="{ 'board-card__quote--theme': content.iconUseTheme }"
              :style="!content.iconUseTheme ? { backgroundColor: content.iconBgColor, color: content.iconColor } : undefined"
            />
            <p class="board-card__title">" {{ item.title }} "</p>
          </div>
          <div class="board-card__meta">
            <p v-if="item.author" class="board-card__author">{{ item.author }}</p>
            <p class="board-card__date">{{ item.date }}</p>
          </div>
        </a>
      </div>

      <!-- More Button -->
      <div v-if="content.moreText" class="board__more">
        <a :href="content.moreLink || '#'" class="board__more-btn">
          {{ content.moreText }}
          <Icon name="mdi:arrow-right" class="icon-20" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BoardContent } from '~/types/site'

interface Props {
  id?: string
  content: BoardContent
}

const props = defineProps<Props>()

const sectionStyle = computed(() => {
  if (props.content.backgroundImage) {
    return {
      backgroundImage: `url(${props.content.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  }
  return {}
})
</script>

<style scoped>
.board {
  position: relative;
}

.board--has-bg {
  overflow: hidden;
}

.board__dim {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.board__container {
  position: relative;
  z-index: 2;
}

/* 흰색 텍스트 모드 */
.board--light .section-title { color: #fff; }
.board--light .section-subtitle { color: rgba(255, 255, 255, 0.5); }
.board--light .section-divider { background-color: rgba(255, 255, 255, 0.2);; }
.board--light .board-card__author { color: #fff; }
.board--light .board-card__date { color: rgb(255 255 255 / 0.6); }
.board--light .board__more-btn { color: rgb(255 255 255 / 0.9); }
.board--light .board__more-btn:hover { color: #fff; }

/* Card Style */
.board__cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .board__cards {
    grid-template-columns: repeat(3, 1fr);
  }
}

.board-card {
  display: block;
  position: relative;
  padding-top: 1.5rem;
}

.board-card__body {
  position: relative;
  background-color: #fff;
  padding: 3rem 2rem;
  border-radius: var(--radius-md);
  min-height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.board-card__body::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 2rem;
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 12px solid #fff;
}

.board-card__quote {
  position: absolute;
  top: -1.5rem;
  left: 1.5rem;
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  border-radius: var(--radius-full);
}

.board-card__quote--theme {
  background-color: var(--primary-700);
  color: #fff;
}

.board-card__title {
  font-size: 0.9375rem;
  color: var(--gray-800);
  text-align: center;
  line-height: 1.6;
}

.board-card__meta {
  margin-top: 1.75rem;
  padding-left: 2rem;
}

.board-card__author {
  font-size: 1rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.25rem;
}

.board-card__date {
  font-size: 0.875rem;
  color: var(--gray-500);
}


/* More Button */
.board__more {
  text-align: center;
  margin-top: 3rem;
}

.board__more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  color: var(--gray-700);
  transition: color var(--transition-fast);
}

.board__more-btn:hover {
  color: var(--primary-500);
}

.icon-20 { width: 1.25rem; height: 1.25rem; }
</style>
