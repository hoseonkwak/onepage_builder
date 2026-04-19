<template>
  <section :id="id" class="section gallery">
    <div class="container-custom">
      <div class="section-header">
        <h2 class="section-title">{{ content.title }}</h2>
        <div v-if="content.showDivider" class="section-divider"></div>
        <p v-if="content.subtitle" class="section-subtitle">{{ content.subtitle }}</p>
      </div>

      <div v-if="content.items.length" class="gallery__grid" :style="{ '--gallery-cols': content.columns }">
        <button
          v-for="(item, i) in content.items"
          :key="i"
          class="gallery__item"
          @click="openModal(i)"
        >
          <img :src="item.image" :alt="item.title || `이미지 ${i + 1}`" class="gallery__img" />
        </button>
      </div>

      <div v-else class="gallery__empty">
        <Icon name="mdi:image-outline" class="icon-48 color-gray-300" />
        <p>이미지를 추가해주세요</p>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="modalIndex !== null" class="gallery-modal" @click="closeModal">
          <button class="gallery-modal__close" @click.stop="closeModal">
            <Icon name="mdi:close" class="icon-32" />
          </button>
          <button
            v-if="content.items.length > 1"
            class="gallery-modal__nav gallery-modal__nav--prev"
            @click.stop="prev"
          >
            <Icon name="mdi:chevron-left" class="icon-32" />
          </button>
          <button
            v-if="content.items.length > 1"
            class="gallery-modal__nav gallery-modal__nav--next"
            @click.stop="next"
          >
            <Icon name="mdi:chevron-right" class="icon-32" />
          </button>
          <div class="gallery-modal__content" @click.stop>
            <img
              v-if="currentItem"
              :src="currentItem.image"
              :alt="currentItem.title || ''"
              class="gallery-modal__img"
            />
            <div v-if="currentItem?.title" class="gallery-modal__caption">
              {{ currentItem.title }}
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import type { GalleryContent } from '~/types/site'

interface Props {
  id?: string
  content: GalleryContent
}

const props = defineProps<Props>()

const modalIndex = ref<number | null>(null)

const currentItem = computed(() => {
  if (modalIndex.value === null) return null
  return props.content.items[modalIndex.value]
})

const openModal = (i: number) => {
  modalIndex.value = i
}

const closeModal = () => {
  modalIndex.value = null
}

const prev = () => {
  if (modalIndex.value === null) return
  const len = props.content.items.length
  modalIndex.value = (modalIndex.value - 1 + len) % len
}

const next = () => {
  if (modalIndex.value === null) return
  const len = props.content.items.length
  modalIndex.value = (modalIndex.value + 1) % len
}

const onKeydown = (e: KeyboardEvent) => {
  if (modalIndex.value === null) return
  if (e.key === 'Escape') closeModal()
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('keydown', onKeydown)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', onKeydown)
  }
})
</script>

<style scoped>
.gallery__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .gallery__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .gallery__grid {
    grid-template-columns: repeat(var(--gallery-cols, 3), 1fr);
  }
}

.gallery__item {
  display: block;
  overflow: hidden;
  border-radius: var(--radius-md);
  aspect-ratio: 4 / 3;
  background-color: var(--gray-100);
  cursor: pointer;
  padding: 0;
  border: none;
}

.gallery__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.gallery__item:hover .gallery__img {
  transform: scale(1.05);
}

.gallery__empty {
  text-align: center;
  padding: 3rem 0;
  color: var(--gray-500);
}

.gallery__empty p {
  margin-top: 0.5rem;
}

/* Modal */
.gallery-modal {
  position: fixed;
  inset: 0;
  z-index: 100;
  background-color: rgb(0 0 0 / 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.gallery-modal__content {
  max-width: 90vw;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gallery-modal__img {
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: var(--radius-md);
}

.gallery-modal__caption {
  margin-top: 1rem;
  color: #fff;
  font-size: 1rem;
}

.gallery-modal__close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: #fff;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--radius-full);
  transition: background-color var(--transition-fast);
}

.gallery-modal__close:hover {
  background-color: rgb(255 255 255 / 0.1);
}

.gallery-modal__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  background: rgb(255 255 255 / 0.1);
  border: none;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: var(--radius-full);
  transition: background-color var(--transition-fast);
}

.gallery-modal__nav:hover {
  background-color: rgb(255 255 255 / 0.2);
}

.gallery-modal__nav--prev { left: 1.5rem; }
.gallery-modal__nav--next { right: 1.5rem; }

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.icon-32 { width: 2rem; height: 2rem; }
.icon-48 { width: 3rem; height: 3rem; }
.color-gray-300 { color: var(--gray-300); }
</style>
