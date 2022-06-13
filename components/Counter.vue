<script setup lang="ts">
const props = defineProps<{ modelValue: number }>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

const updateValue = (n: number) => {
  if (typeof value.value !== 'number') {
    value.value = 0
  }

  value.value += n

  if (value.value < 0) {
    value.value = 0
  }
}
</script>

<template>
  <div class="flex gap-1 items-center">
    <button
      class="bg-fuchsia-500 w-6 h-6 text-white grid place-items-center rounded-full shadow-lg transition-all active:scale-95"
      @click="updateValue(-1)"
    >
      <i class="i-mdi-minus"></i>
    </button>
    <input
      class="w-12 p-1 rounded border border-gray-500/50 text-center"
      type="number"
      v-model.number="value"
    />
    <button
      class="bg-fuchsia-500 w-6 h-6 text-white grid place-items-center rounded-full shadow-lg transition-all active:scale-95"
      @click="updateValue(1)"
    >
      <i class="i-mdi-plus"></i>
    </button>
  </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
