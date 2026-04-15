<template>
  <section :id="id" class="section bg-white">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="section-title">{{ content.title }}</h2>
        <p v-if="content.subtitle" class="section-subtitle max-w-2xl mx-auto">
          {{ content.subtitle }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12">
        <!-- Contact Info -->
        <div class="space-y-6">
          <div v-if="content.email" class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center flex-shrink-0">
              <Icon name="mdi:email" class="w-6 h-6" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">이메일</h3>
              <a :href="`mailto:${content.email}`" class="text-gray-600 hover:text-primary-500">
                {{ content.email }}
              </a>
            </div>
          </div>

          <div v-if="content.phone" class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center flex-shrink-0">
              <Icon name="mdi:phone" class="w-6 h-6" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">전화</h3>
              <a :href="`tel:${content.phone}`" class="text-gray-600 hover:text-primary-500">
                {{ content.phone }}
              </a>
            </div>
          </div>

          <div v-if="content.address" class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center flex-shrink-0">
              <Icon name="mdi:map-marker" class="w-6 h-6" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">주소</h3>
              <p class="text-gray-600">{{ content.address }}</p>
            </div>
          </div>

          <!-- Social Links -->
          <div v-if="content.social?.length" class="flex gap-4 pt-4">
            <a
              v-for="social in content.social"
              :key="social.platform"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-500 hover:text-white transition-colors"
            >
              <Icon :name="getSocialIcon(social.platform)" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Contact Form -->
        <div v-if="content.formEnabled" class="bg-gray-50 rounded-xl p-6">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">이름</label>
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">이메일</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">메시지</label>
              <textarea
                v-model="form.message"
                rows="4"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
            </div>
            <button type="submit" class="btn-primary w-full">
              보내기
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ContactContent, SocialLink } from '~/types/site'

interface Props {
  id?: string
  content: ContactContent
}

defineProps<Props>()

const form = reactive({
  name: '',
  email: '',
  message: ''
})

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

const handleSubmit = () => {
  // TODO: Implement form submission
  console.log('Form submitted:', form)
  alert('문의가 접수되었습니다.')
  form.name = ''
  form.email = ''
  form.message = ''
}
</script>
