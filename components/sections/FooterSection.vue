<template>
  <footer :id="id" class="bg-gray-900 text-white py-12">
    <div class="container-custom">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- Copyright -->
        <p class="text-gray-400 text-sm">
          {{ content.copyright }}
        </p>

        <!-- Links -->
        <div v-if="content.links?.length" class="flex gap-6">
          <a
            v-for="link in content.links"
            :key="link.href"
            :href="link.href"
            class="text-gray-400 text-sm hover:text-white transition-colors"
          >
            {{ link.label }}
          </a>
        </div>

        <!-- Social Links -->
        <div v-if="content.social?.length" class="flex gap-4">
          <a
            v-for="social in content.social"
            :key="social.platform"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-white transition-colors"
          >
            <Icon :name="getSocialIcon(social.platform)" class="w-5 h-5" />
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
