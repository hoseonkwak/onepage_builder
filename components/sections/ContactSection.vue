<template>
  <section :id="id" class="section contact">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="contact__header">
        <h2 class="section-title">{{ content.title }}</h2>
        <p v-if="content.subtitle" class="section-subtitle contact__subtitle">
          {{ content.subtitle }}
        </p>
      </div>

      <div class="contact__grid">
        <!-- Contact Info -->
        <div class="contact__info">
          <div v-if="content.email" class="contact__item">
            <div class="contact__icon-circle">
              <Icon name="mdi:email" class="icon-24" />
            </div>
            <div>
              <h3 class="contact__item-title">이메일</h3>
              <a :href="`mailto:${content.email}`" class="contact__item-link">
                {{ content.email }}
              </a>
            </div>
          </div>

          <div v-if="content.phone" class="contact__item">
            <div class="contact__icon-circle">
              <Icon name="mdi:phone" class="icon-24" />
            </div>
            <div>
              <h3 class="contact__item-title">전화</h3>
              <a :href="`tel:${content.phone}`" class="contact__item-link">
                {{ content.phone }}
              </a>
            </div>
          </div>

          <div v-if="content.address" class="contact__item">
            <div class="contact__icon-circle">
              <Icon name="mdi:map-marker" class="icon-24" />
            </div>
            <div>
              <h3 class="contact__item-title">주소</h3>
              <p class="contact__item-text">{{ content.address }}</p>
            </div>
          </div>

          <!-- Social Links -->
          <div v-if="content.social?.length" class="contact__social">
            <a
              v-for="social in content.social"
              :key="social.platform"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="contact__social-link"
            >
              <Icon :name="getSocialIcon(social.platform)" class="icon-20" />
            </a>
          </div>
        </div>

        <!-- Contact Form -->
        <div v-if="content.formEnabled" class="contact__form-wrap">
          <form @submit.prevent="handleSubmit" class="contact__form">
            <div>
              <label class="contact__label">이름</label>
              <input
                v-model="form.name"
                type="text"
                required
                class="contact__input"
              />
            </div>
            <div>
              <label class="contact__label">이메일</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="contact__input"
              />
            </div>
            <div>
              <label class="contact__label">메시지</label>
              <textarea
                v-model="form.message"
                rows="4"
                required
                class="contact__input contact__textarea"
              />
            </div>
            <button type="submit" class="btn-primary contact__submit">
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
  console.log('Form submitted:', form)
  alert('문의가 접수되었습니다.')
  form.name = ''
  form.email = ''
  form.message = ''
}
</script>

<style scoped>
.contact {
  background-color: transparent;
}

.contact__header {
  text-align: center;
  margin-bottom: 3rem;
}

.contact__subtitle {
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
}

.contact__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 768px) {
  .contact__grid {
    grid-template-columns: 1fr 1fr;
  }
}

.contact__info > * + * {
  margin-top: 1.5rem;
}

.contact__item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.contact__icon-circle {
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-full);
  background-color: var(--primary-100);
  color: var(--primary-500);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact__item-title {
  font-weight: 600;
  color: var(--gray-900);
}

.contact__item-link {
  color: var(--gray-600);
  transition: color var(--transition-fast);
}

.contact__item-link:hover {
  color: var(--primary-500);
}

.contact__item-text {
  color: var(--gray-600);
}

.contact__social {
  display: flex;
  gap: 1rem;
  padding-top: 1rem;
}

.contact__social-link {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-full);
  background-color: var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-600);
  transition: all var(--transition-fast);
}

.contact__social-link:hover {
  background-color: var(--primary-500);
  color: #fff;
}

.contact__form-wrap {
  background-color: var(--gray-50);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
}

.contact__form > * + * {
  margin-top: 1rem;
}

.contact__label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: 0.25rem;
}

.contact__input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-lg);
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.contact__input:focus {
  border-color: transparent;
  box-shadow: 0 0 0 2px var(--primary-500);
}

.contact__textarea {
  resize: none;
}

.contact__submit {
  width: 100%;
}

/* Icon utilities */
.icon-20 { width: 1.25rem; height: 1.25rem; }
.icon-24 { width: 1.5rem; height: 1.5rem; }
</style>
