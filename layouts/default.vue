<template>
  <div class="max-w-[400px] mx-auto border-l border-r border-gray/50 h-screen">
    <Transition name="page">
      <slot></slot>
    </Transition>

    <Attribution />
  </div>
</template>

<style>
html,
body {
  @apply bg-gray-100;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
