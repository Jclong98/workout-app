<script setup lang="ts">
import { Exercise } from '~/assets/types'

defineProps<{ value: Exercise }>()
const emit = defineEmits<{
  (e: 'remove', value: string): void
}>()
</script>

<template>
  <div
    class="border p-2 border-gray-500/50 rounded-lg flex justify-between items-center"
  >
    <div class="grid gap-1">
      <!-- name -->
      <h2 class="font-semibold">{{ value.name }}</h2>

      <!-- reps/weight -->
      <div class="flex gap-2">
        <span>
          Sets: <span class="font-semibold">{{ value.sets }}</span>
        </span>
        <span>
          Reps: <span class="font-semibold">{{ value.reps }}</span>
        </span>
        <span v-if="value.weight">
          Weight: <span class="font-semibold">{{ value.weight }}lbs</span>
        </span>
      </div>
    </div>

    <!-- delete button -->
    <button @click="emit('remove', value.id)">
      <i class="i-mdi-delete"></i>
    </button>
  </div>
</template>
