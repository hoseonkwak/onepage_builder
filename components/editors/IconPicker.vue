<template>
  <div ref="pickerEl" class="icon-picker">
    <div class="icon-picker__selected" @click="open = !open">
      <Icon v-if="modelValue" :name="modelValue" class="icon-picker__current" />
      <span v-else class="icon-picker__placeholder">아이콘 선택</span>
      <span class="icon-picker__label">{{ modelValue || '선택하세요' }}</span>
      <Icon name="mdi:chevron-down" class="icon-picker__arrow" :class="{ 'icon-picker__arrow--open': open }" />
    </div>

    <div v-if="open" class="icon-picker__dropdown" @click.stop>
      <input
        ref="searchInput"
        v-model="search"
        type="text"
        class="editor-input icon-picker__search"
        placeholder="아이콘 검색..."
      />

      <div class="icon-picker__categories">
        <button
          v-for="cat in categories"
          :key="cat.key"
          class="icon-picker__cat-btn"
          :class="{ active: activeCategory === cat.key }"
          @click="activeCategory = cat.key"
        >
          {{ cat.label }}
        </button>
      </div>

      <div class="icon-picker__grid">
        <button
          v-for="icon in filteredIcons"
          :key="icon.name"
          class="icon-picker__item"
          :class="{ active: modelValue === icon.name }"
          :title="icon.label"
          @click="selectIcon(icon.name)"
        >
          <Icon :name="icon.name" class="icon-picker__icon" />
        </button>
        <p v-if="filteredIcons.length === 0" class="icon-picker__empty">
          결과 없음
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IconItem {
  name: string
  label: string
  category: string
}

interface Props {
  modelValue: string
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const open = ref(false)
const search = ref('')
const activeCategory = ref('all')
const searchInput = ref<HTMLInputElement | null>(null)
const pickerEl = ref<HTMLElement | null>(null)

const onClickOutside = (e: MouseEvent) => {
  if (pickerEl.value && !pickerEl.value.contains(e.target as Node)) {
    open.value = false
  }
}

watch(open, (val) => {
  if (val) {
    nextTick(() => searchInput.value?.focus())
    document.addEventListener('click', onClickOutside, true)
  } else {
    document.removeEventListener('click', onClickOutside, true)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside, true)
})

const categories = [
  { key: 'all', label: '전체' },
  { key: 'religion', label: '종교' },
  { key: 'people', label: '사람' },
  { key: 'nature', label: '자연' },
  { key: 'education', label: '교육' },
  { key: 'media', label: '미디어' },
  { key: 'business', label: '비즈니스' },
  { key: 'ui', label: 'UI' },
]

const icons: IconItem[] = [
  // 종교
  { name: 'mdi:cross', label: '십자가', category: 'religion' },
  { name: 'mdi:church', label: '교회', category: 'religion' },
  { name: 'mdi:candle', label: '촛불', category: 'religion' },
  { name: 'mdi:hands-pray', label: '기도', category: 'religion' },
  { name: 'mdi:book-open-variant', label: '성경', category: 'religion' },
  { name: 'mdi:book-cross', label: '성경+십자가', category: 'religion' },
  { name: 'mdi:dove', label: '비둘기', category: 'religion' },
  { name: 'mdi:music-note', label: '음표', category: 'religion' },
  { name: 'mdi:bell', label: '종', category: 'religion' },
  { name: 'mdi:heart', label: '하트', category: 'religion' },
  { name: 'mdi:heart-outline', label: '하트 윤곽', category: 'religion' },
  { name: 'mdi:star', label: '별', category: 'religion' },
  { name: 'mdi:star-four-points', label: '사방별', category: 'religion' },
  { name: 'mdi:water', label: '물', category: 'religion' },
  { name: 'mdi:fire', label: '불', category: 'religion' },
  { name: 'mdi:shield-cross', label: '방패십자가', category: 'religion' },

  // 사람
  { name: 'mdi:account-group', label: '그룹', category: 'people' },
  { name: 'mdi:account', label: '사람', category: 'people' },
  { name: 'mdi:account-heart', label: '사랑의사람', category: 'people' },
  { name: 'mdi:account-child', label: '어린이', category: 'people' },
  { name: 'mdi:baby-carriage', label: '유모차', category: 'people' },
  { name: 'mdi:human-male-female', label: '남녀', category: 'people' },
  { name: 'mdi:handshake', label: '악수', category: 'people' },
  { name: 'mdi:hand-heart', label: '돌봄', category: 'people' },
  { name: 'mdi:home', label: '집', category: 'people' },
  { name: 'mdi:home-heart', label: '가정', category: 'people' },
  { name: 'mdi:emoticon-happy', label: '웃는얼굴', category: 'people' },
  { name: 'mdi:face-man', label: '남자얼굴', category: 'people' },
  { name: 'mdi:face-woman', label: '여자얼굴', category: 'people' },
  { name: 'mdi:walk', label: '걷기', category: 'people' },
  { name: 'mdi:run', label: '달리기', category: 'people' },

  // 자연
  { name: 'mdi:flower', label: '꽃', category: 'nature' },
  { name: 'mdi:leaf', label: '잎', category: 'nature' },
  { name: 'mdi:tree', label: '나무', category: 'nature' },
  { name: 'mdi:pine-tree', label: '소나무', category: 'nature' },
  { name: 'mdi:weather-sunny', label: '태양', category: 'nature' },
  { name: 'mdi:moon-waning-crescent', label: '달', category: 'nature' },
  { name: 'mdi:cloud', label: '구름', category: 'nature' },
  { name: 'mdi:earth', label: '지구', category: 'nature' },
  { name: 'mdi:mountain', label: '산', category: 'nature' },
  { name: 'mdi:waves', label: '파도', category: 'nature' },
  { name: 'mdi:rainbow', label: '무지개', category: 'nature' },
  { name: 'mdi:sprout', label: '새싹', category: 'nature' },

  // 교육
  { name: 'mdi:school', label: '학교', category: 'education' },
  { name: 'mdi:book-open-page-variant', label: '펼친책', category: 'education' },
  { name: 'mdi:bookshelf', label: '책장', category: 'education' },
  { name: 'mdi:pencil', label: '연필', category: 'education' },
  { name: 'mdi:lightbulb', label: '전구', category: 'education' },
  { name: 'mdi:lightbulb-on', label: '켜진전구', category: 'education' },
  { name: 'mdi:brain', label: '두뇌', category: 'education' },
  { name: 'mdi:puzzle', label: '퍼즐', category: 'education' },
  { name: 'mdi:trophy', label: '트로피', category: 'education' },
  { name: 'mdi:medal', label: '메달', category: 'education' },
  { name: 'mdi:certificate', label: '수료증', category: 'education' },
  { name: 'mdi:glasses', label: '안경', category: 'education' },

  // 미디어
  { name: 'mdi:camera', label: '카메라', category: 'media' },
  { name: 'mdi:video', label: '비디오', category: 'media' },
  { name: 'mdi:microphone', label: '마이크', category: 'media' },
  { name: 'mdi:image', label: '이미지', category: 'media' },
  { name: 'mdi:play-circle', label: '재생', category: 'media' },
  { name: 'mdi:headphones', label: '헤드폰', category: 'media' },
  { name: 'mdi:palette', label: '팔레트', category: 'media' },
  { name: 'mdi:brush', label: '붓', category: 'media' },
  { name: 'mdi:monitor', label: '모니터', category: 'media' },
  { name: 'mdi:cellphone', label: '스마트폰', category: 'media' },
  { name: 'mdi:volume-high', label: '스피커', category: 'media' },
  { name: 'mdi:music', label: '음악', category: 'media' },

  // 비즈니스
  { name: 'mdi:briefcase', label: '가방', category: 'business' },
  { name: 'mdi:chart-line', label: '차트', category: 'business' },
  { name: 'mdi:cash', label: '현금', category: 'business' },
  { name: 'mdi:store', label: '상점', category: 'business' },
  { name: 'mdi:calendar', label: '달력', category: 'business' },
  { name: 'mdi:clock', label: '시계', category: 'business' },
  { name: 'mdi:email', label: '이메일', category: 'business' },
  { name: 'mdi:phone', label: '전화', category: 'business' },
  { name: 'mdi:map-marker', label: '위치', category: 'business' },
  { name: 'mdi:cog', label: '설정', category: 'business' },
  { name: 'mdi:wrench', label: '도구', category: 'business' },
  { name: 'mdi:rocket-launch', label: '로켓', category: 'business' },
  { name: 'mdi:target', label: '타겟', category: 'business' },
  { name: 'mdi:tag', label: '태그', category: 'business' },

  // UI
  { name: 'mdi:check-circle', label: '체크', category: 'ui' },
  { name: 'mdi:check-decagram', label: '인증', category: 'ui' },
  { name: 'mdi:shield-check', label: '보안', category: 'ui' },
  { name: 'mdi:lock', label: '잠금', category: 'ui' },
  { name: 'mdi:link', label: '링크', category: 'ui' },
  { name: 'mdi:download', label: '다운로드', category: 'ui' },
  { name: 'mdi:upload', label: '업로드', category: 'ui' },
  { name: 'mdi:share-variant', label: '공유', category: 'ui' },
  { name: 'mdi:magnify', label: '검색', category: 'ui' },
  { name: 'mdi:plus-circle', label: '추가', category: 'ui' },
  { name: 'mdi:information', label: '정보', category: 'ui' },
  { name: 'mdi:help-circle', label: '도움말', category: 'ui' },
  { name: 'mdi:arrow-right-circle', label: '이동', category: 'ui' },
  { name: 'mdi:eye', label: '보기', category: 'ui' },
]

const filteredIcons = computed(() => {
  let list = icons
  if (activeCategory.value !== 'all') {
    list = list.filter(i => i.category === activeCategory.value)
  }
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter(i => i.label.includes(q) || i.name.toLowerCase().includes(q))
  }
  return list
})

const selectIcon = (name: string) => {
  emit('update:modelValue', name)
  open.value = false
  search.value = ''
}
</script>

<style scoped>
.icon-picker {
  position: relative;
}

.icon-picker__selected {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: border-color var(--transition-fast);
}

.icon-picker__selected:hover {
  border-color: var(--primary-500);
}

.icon-picker__current {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.icon-picker__placeholder {
  color: var(--gray-400);
  font-size: 0.875rem;
}

.icon-picker__label {
  flex: 1;
  font-size: 0.75rem;
  color: var(--gray-500);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-picker__arrow {
  width: 1rem;
  height: 1rem;
  color: var(--gray-400);
  transition: transform var(--transition-fast);
  flex-shrink: 0;
}

.icon-picker__arrow--open {
  transform: rotate(180deg);
}

.icon-picker__dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 50;
  background-color: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 0.5rem;
  width: 100%;
  min-width: 280px;
}

.icon-picker__search {
  margin-bottom: 0.5rem;
}

.icon-picker__categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.icon-picker__cat-btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.6875rem;
  border-radius: var(--radius-sm);
  background-color: var(--gray-100);
  color: var(--gray-600);
  transition: all var(--transition-fast);
}

.icon-picker__cat-btn.active {
  background-color: var(--primary-500);
  color: #fff;
}

.icon-picker__grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2px;
  max-height: 200px;
  overflow-y: auto;
}

.icon-picker__item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.icon-picker__item:hover {
  background-color: var(--gray-100);
}

.icon-picker__item.active {
  background-color: var(--primary-100);
  color: var(--primary-500);
}

.icon-picker__icon {
  width: 1.5rem;
  height: 1.5rem;
}

.icon-picker__empty {
  grid-column: 1 / -1;
  text-align: center;
  padding: 1rem;
  color: var(--gray-400);
  font-size: 0.875rem;
}
</style>
