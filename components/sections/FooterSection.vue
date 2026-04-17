<template>
  <footer :id="id" class="site-footer">
    <div class="container-custom">
      <div class="site-footer__inner">
        <!-- Copyright -->
        <p class="site-footer__copyright">
          {{ content.copyright }}
        </p>

        <!-- Links -->
        <div v-if="content.links?.length" class="site-footer__links">
          <a
            v-for="link in content.links"
            :key="link.href"
            :href="link.href"
            class="site-footer__link"
          >
            {{ link.label }}
          </a>
        </div>

        <!-- Social Links -->
        <div v-if="content.social?.length" class="site-footer__social">
          <a
            v-for="social in content.social"
            :key="social.platform"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="site-footer__social-link"
          >
            <Icon :name="getSocialIcon(social.platform)" class="icon-20" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { FooterContent, SocialLink } from '~/types/site'

interface Props {
  id?: string
  content: FooterContent
}

defineProps<Props>()

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
  background-color: var(--gray-900);
  color: #fff;
  padding: 3rem 0;
}

.site-footer__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .site-footer__inner {
    flex-direction: row;
  }
}

.site-footer__copyright {
  color: var(--gray-400);
  font-size: 0.875rem;
}

.site-footer__links {
  display: flex;
  gap: 1.5rem;
}

.site-footer__link {
  color: var(--gray-400);
  font-size: 0.875rem;
  transition: color var(--transition-fast);
}

.site-footer__link:hover {
  color: #fff;
}

.site-footer__social {
  display: flex;
  gap: 1rem;
}

.site-footer__social-link {
  color: var(--gray-400);
  transition: color var(--transition-fast);
}

.site-footer__social-link:hover {
  color: #fff;
}

.icon-20 { width: 1.25rem; height: 1.25rem; }
</style>
