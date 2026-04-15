<template>
  <header
    class="header"
    :class="{
      'header--sticky': content.sticky && !previewMode,
      'header--scrolled': isScrolled,
      'header--preview': previewMode
    }"
  >
    <div class="container-custom">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center">
          <img
            v-if="content.logoImage"
            :src="content.logoImage"
            :alt="content.logoText"
            class="h-8 md:h-10"
          />
          <span v-else class="text-xl font-bold text-gray-900">
            {{ content.logoText }}
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="text-sm font-medium text-gray-700 hover:font-bold transition-colors"
            @click.prevent="scrollToSection(item.href)"
          >
            {{ item.label }}
          </a>
        </nav>

        <!-- Right Side: Login -->
        <div class="flex items-center gap-4">
          <!-- Login Button -->
          <a
            v-if="content.showLogin"
            :href="content.loginLink"
            class="flex items-center gap-2 text-sm text-gray-700 hover:text-primary-500 transition-colors"
          >
            <span class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Icon name="mdi:account-outline" class="w-5 h-5" />
            </span>
            <span class="hidden md:inline">{{ content.loginText }}</span>
          </a>

          <!-- Mobile Menu Button -->
          <button
            class="md:hidden p-2"
            @click="isMobileMenuOpen = true"
          >
            <Icon name="mdi:menu" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Teleport to="body">
      <Transition name="slide">
        <div
          v-if="isMobileMenuOpen"
          class="fixed inset-0 z-50 md:hidden"
        >
          <div
            class="absolute inset-0 bg-black/50"
            @click="isMobileMenuOpen = false"
          />
          <div class="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-xl">
            <div class="p-4 border-b border-gray-200 flex justify-end">
              <button @click="isMobileMenuOpen = false">
                <Icon name="mdi:close" class="w-6 h-6" />
              </button>
            </div>
            <nav class="p-4 space-y-4">
              <a
                v-for="item in navItems"
                :key="item.href"
                :href="item.href"
                class="block text-gray-700 hover:text-primary-500"
                @click="handleMobileNavClick(item.href)"
              >
                {{ item.label }}
              </a>
            </nav>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import type { HeaderContent, NavItem } from '~/types/site'
import { useSiteStore } from '~/stores/site'

interface Props {
  content: HeaderContent
  previewMode?: boolean
}

const props = defineProps<Props>()

const siteStore = useSiteStore()
const navItems = computed<NavItem[]>(() => siteStore.navItems)

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)

// Scroll detection
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

// Smooth scroll to section
const scrollToSection = (href: string | undefined) => {
  if (!href) return
  const id = href.replace('#', '')
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleMobileNavClick = (href: string) => {
  isMobileMenuOpen.value = false
  scrollToSection(href)
}
</script>

<style scoped>
.header {
  @apply fixed top-0 left-0 right-0 z-40 transition-all duration-300;
}

.header--preview {
  @apply static;
}

.header {
  @apply bg-white shadow-md;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-from > div:last-child,
.slide-leave-to > div:last-child {
  transform: translateX(100%);
}
</style>
