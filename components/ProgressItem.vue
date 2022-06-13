<script setup lang="ts">
import { Exercise } from '~/assets/types'

const props = defineProps<{ value: Exercise }>()
const emit = defineEmits<{
  (e: 'update'): void
}>()

const progress = ref(0)

const inc = () => {
  if (progress.value < props.value.sets) {
    progress.value++

    emit('update')
  }
}

const canInc = computed(() => progress.value < props.value.sets)
</script>

<template>
  <div class="card flex justify-between items-center">
    <div class="grid gap-1">
      <!-- name -->
      <h2 class="font-semibold">{{ value.name }}</h2>

      <!-- reps/weight -->
      <div class="flex gap-2">
        <span>
          Reps: <span class="font-semibold">{{ value.reps }}</span>
        </span>
        <span v-if="value.weight">
          Weight: <span class="font-semibold">{{ value.weight }}lbs</span>
        </span>
      </div>

      <!-- progress -->
      <div class="flex gap-2">
        <div
          v-for="i in value.sets"
          class="border h-4 w-4 rounded"
          :class="{
            'bg-fuchsia-500': i <= progress && canInc,
            'bg-green-400': !canInc,
          }"
        ></div>
      </div>
    </div>

    <!-- increment button -->
    <button
      class="h-12 w-12 bg-fuchsia-500 rounded-xl shadow-lg grid place-items-center text-white text-2xl disabled:(bg-gray-300 cursor-not-allowed shadow-transparent) transition-all active:(transform scale-95)"
      @click="inc()"
      :disabled="!canInc"
    >
      <i class="i-mdi-check"></i>
    </button>
  </div>
</template>
