<template>
  <div class="h-screen bg-gray-100 overflow-hidden flex flex-col">
    <!-- Admin Header -->
    <header class="bg-white border-b border-gray-200 px-4 py-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="text-gray-500 hover:text-gray-700">
            <Icon name="mdi:arrow-left" class="w-5 h-5" />
          </NuxtLink>
          <h1 class="text-lg font-semibold text-gray-900">One-Page Builder</h1>
        </div>
        <div class="flex items-center gap-2">
          <button class="btn-secondary text-sm">
            <Icon name="mdi:eye" class="w-4 h-4 mr-1" />
            미리보기
          </button>
          <button class="btn-primary text-sm">
            <Icon name="mdi:content-save" class="w-4 h-4 mr-1" />
            저장
          </button>
        </div>
      </div>
    </header>

    <!-- Admin Content -->
    <main class="flex-1 overflow-hidden">
      <slot />
    </main>
  </div>
</template>
