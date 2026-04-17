<template>
  <div class="admin-layout">
    <header class="admin-header">
      <div class="admin-header__inner">
        <div class="admin-header__left">
          <NuxtLink to="/" class="admin-header__back">
            <Icon name="mdi:arrow-left" class="icon-20" />
          </NuxtLink>
          <h1 class="admin-header__title">One-Page Builder</h1>
        </div>
        <div class="admin-header__actions">
          <button class="btn-secondary btn--sm">
            <Icon name="mdi:eye" class="icon-16" />
            미리보기
          </button>
          <button class="btn-primary btn--sm">
            <Icon name="mdi:content-save" class="icon-16" />
            저장
          </button>
        </div>
      </div>
    </header>

    <main class="admin-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  height: 100vh;
  background-color: var(--gray-100);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.admin-header {
  background-color: #fff;
  border-bottom: 1px solid var(--gray-200);
  padding: 0.75rem 1rem;
}

.admin-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.admin-header__left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.admin-header__back {
  color: var(--gray-500);
  transition: color var(--transition-fast);
}

.admin-header__back:hover {
  color: var(--gray-700);
}

.admin-header__title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--gray-900);
}

.admin-header__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn--sm {
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  gap: 0.25rem;
}

.admin-main {
  flex: 1;
  overflow: hidden;
}

.icon-16 {
  width: 1rem;
  height: 1rem;
}

.icon-20 {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
