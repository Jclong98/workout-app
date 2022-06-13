<script setup lang="ts">
const { items } = useLibrary()
</script>

<template>
  <div class="relative">
    <nav class="bg-white p-4 flex items-center justify-between shadow">
      <h1
        class="bg-fuchsia-200 px-4 py-1 rounded-full border text-fuchsia-600 font-semibold"
      >
        Workout App
      </h1>

      <div class="bg-white border rounded-full h-8 w-8 grid place-items-center">
        jr
      </div>
    </nav>

    <main class="p-4">
      <div class="card mb-4">
        <h2 class="semibold text-2xl mb-3">History</h2>

        <div class="border rounded h-100px"></div>
      </div>

      <div class="p-4">
        <h2 class="font-semibold text-2xl mb-3">Library</h2>

        <div class="grid gap-4">
          <NuxtLink
            :to="`/sessions/${item.id}`"
            v-for="item of items"
            :key="item.id"
          >
            <div class="card flex justify-between text-2xl items-center">
              <h3>{{ item.title }}</h3>
              <button class="i-mdi-dots-vertical"></button>
            </div>
          </NuxtLink>
        </div>
      </div>
    </main>

    <!-- floating action button tailwind -->
    <div class="absolute bottom-4 right-4">
      <NuxtLink
        to="/new-session"
        class="grid place-items-center bg-fuchsia-500 text-white p-4 rounded-full text-3xl shadow-2xl"
      >
        <i class="i-mdi-plus"></i>
      </NuxtLink>
    </div>
  </div>
</template>
