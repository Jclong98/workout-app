<script setup lang="ts">
const { params } = useRoute()

const { items } = useLibrary()

const currentSession = ref(items.value.find((item) => item.id === params.id))

const currentProgress = ref(0)
const totalProgress = currentSession.value.exercises.reduce(
  (acc, cur) => acc + cur.sets,
  0
)
</script>

<template>
  <div>
    <nav class="bg-white p-4 flex items-center shadow gap-2 text-xl">
      <NuxtLink to="/" class="i-mdi-arrow-left" title="Home"></NuxtLink>
      <h1>{{ currentSession.title }}</h1>
    </nav>

    <!-- progress bar -->
    <div class="w-full bg-gray-300 h-2.5">
      <div
        class="h-2.5 transition-all duration-200"
        :style="{ width: `${(currentProgress / totalProgress) * 100}%` }"
        :class="[
          currentProgress === totalProgress ? 'bg-green-400' : 'bg-fuchsia-500',
        ]"
      ></div>
    </div>

    <main class="p-4 flex flex-col gap-2">
      <ProgressItem
        v-for="exercise of currentSession.exercises"
        :key="exercise.id"
        :value="exercise"
        @update="currentProgress++"
      />
    </main>
  </div>
</template>
