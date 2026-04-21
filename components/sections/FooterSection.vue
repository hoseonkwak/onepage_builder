<template>
  <footer :id="id" class="site-footer">
    <div class="container-custom site-footer__inner">
      <p class="site-footer__address">
        주소 {{ content.address }}
      </p>
      <p class="site-footer__copyright">
        © {{ currentYear }} {{ churchName }}. All Rights Reserved.
      </p>
      <p class="site-footer__credit">
        powered by OHJIC
      </p>
      <div v-if="content.social?.length" class="site-footer__social">
        <a
          v-for="social in content.social"
          :key="social.platform"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          class="site-footer__social-link"
          :class="{ 'site-footer__social-link--theme': content.socialUseTheme }"
          :style="!content.socialUseTheme ? { backgroundColor: content.socialBgColor, color: content.socialIconColor } : undefined"
        >
          <Icon :name="getSocialIcon(social.platform)" class="icon-20" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { FooterContent, SocialLink } from '~/types/site'
import { useSiteStore } from '~/stores/site'

interface Props {
  id?: string
  content: FooterContent
}

defineProps<Props>()

const siteStore = useSiteStore()
const currentYear = new Date().getFullYear()
const churchName = computed(() => siteStore.content.settings.churchName || 'Brand')

const getSocialIcon = (platform: SocialLink['platform']) => {
  const icons: Record<string, string> = {
    facebook: 'mdi:facebook',
    instagram: 'mdi:instagram',
    twitter: 'mdi:twitter',
    youtube: 'mdi:youtube',
    linkedin: 'mdi:linkedin'
  }
  return icons[platform] || 'mdi:link'
}
</script>

<style scoped>
.site-footer {
  padding: 3rem 0 4rem;
}

.site-footer__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.site-footer__address {
  font-size: 0.875rem;
  color: var(--gray-500);
}

.site-footer__copyright {
  font-size: 0.875rem;
  color: var(--gray-900);
}

.site-footer__credit {
  font-size: 0.875rem;
  color: var(--gray-500);
}

.site-footer__social {
  display: flex;
  gap: 1rem;
  margin-top: 1.25rem;
}

.site-footer__social-link {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity var(--transition-fast);
}

.site-footer__social-link:hover {
  opacity: 0.85;
}

.site-footer__social-link--theme {
  background-color: var(--primary-500);
  color: #fff;
}

.icon-20 { width: 1.25rem; height: 1.25rem; }
</style>
