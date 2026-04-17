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
      <div class="header__inner">
        <!-- Logo -->
        <NuxtLink to="/" class="header__logo">
          <img
            v-if="content.logoImage"
            :src="content.logoImage"
            :alt="content.logoText"
            class="header__logo-img"
          />
          <span v-else class="header__logo-text">
            {{ content.logoText }}
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="header__nav">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="header__nav-link"
            @click.prevent="scrollToSection(item.href)"
          >
            {{ item.label }}
          </a>
        </nav>

        <!-- Right Side -->
        <div class="header__right">
          <a
            v-if="content.showLogin"
            :href="content.loginLink"
            class="header__login"
          >
            <span class="header__login-icon">
              <Icon name="mdi:account-outline" class="icon-20" />
            </span>
            <span class="header__login-text">{{ content.loginText }}</span>
          </a>

          <button
            class="header__mobile-toggle"
            @click="isMobileMenuOpen = true"
          >
            <Icon name="mdi:menu" class="icon-24" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Teleport to="body">
      <Transition name="slide">
        <div
          v-if="isMobileMenuOpen"
          class="mobile-overlay"
        >
          <div
            class="mobile-overlay__backdrop"
            @click="isMobileMenuOpen = false"
          />
          <div class="mobile-menu">
            <div class="mobile-menu__header">
              <button @click="isMobileMenuOpen = false">
                <Icon name="mdi:close" class="icon-24" />
              </button>
            </div>
            <nav class="mobile-menu__nav">
              <a
                v-for="item in navItems"
                :key="item.href"
                :href="item.href"
                class="mobile-menu__link"
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 40;
  background-color: #fff;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
}

.header--preview {
  position: static;
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
}

@media (min-width: 768px) {
  .header__inner {
    height: 5rem;
  }
}

.header__logo {
  display: flex;
  align-items: center;
}

.header__logo-img {
  height: 2rem;
}

@media (min-width: 768px) {
  .header__logo-img {
    height: 2.5rem;
  }
}

.header__logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--gray-900);
}

.header__nav {
  display: none;
  align-items: center;
  gap: 2rem;
}

@media (min-width: 768px) {
  .header__nav {
    display: flex;
  }
}

.header__nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
  transition: color var(--transition-fast);
}

.header__nav-link:hover {
  font-weight: 700;
}

.header__right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header__login {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--gray-700);
  transition: color var(--transition-fast);
}

.header__login:hover {
  color: var(--primary-500);
}

.header__login-icon {
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-full);
  background-color: var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__login-text {
  display: none;
}

@media (min-width: 768px) {
  .header__login-text {
    display: inline;
  }
}

.header__mobile-toggle {
  padding: 0.5rem;
}

@media (min-width: 768px) {
  .header__mobile-toggle {
    display: none;
  }
}

/* Mobile Menu */
.mobile-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
}

@media (min-width: 768px) {
  .mobile-overlay {
    display: none;
  }
}

.mobile-overlay__backdrop {
  position: absolute;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
}

.mobile-menu {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 16rem;
  background-color: #fff;
  box-shadow: var(--shadow-xl);
}

.mobile-menu__header {
  padding: 1rem;
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  justify-content: flex-end;
}

.mobile-menu__nav {
  padding: 1rem;
}

.mobile-menu__nav > * + * {
  margin-top: 1rem;
}

.mobile-menu__link {
  display: block;
  color: var(--gray-700);
  transition: color var(--transition-fast);
}

.mobile-menu__link:hover {
  color: var(--primary-500);
}

/* Transition */
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

/* Icon utilities */
.icon-20 { width: 1.25rem; height: 1.25rem; }
.icon-24 { width: 1.5rem; height: 1.5rem; }
</style>
