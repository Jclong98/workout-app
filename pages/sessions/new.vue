<script setup lang="ts">
import { Exercise } from '~/assets/types'

const title = ref('New Session')

const exerciseName = ref('')
const exerciseOptions = [
  'Bench Press',
  'Squat',
  'Deadlift',
  'Overhead Press',
  'Barbell Row',
  'Dumbbell Row',
  'Lat Pulldown',
  'Bent Over Row',
  'Pullup',
  'Pushup',
  'Chinup',
  'Crunches',
  'Leg Press',
  'Leg Extension',
  'Leg Curl',
]

const sets = ref(0)
const reps = ref(0)
const weight = ref(0)

const exercises = ref<Exercise[]>([])

const canAddExercise = computed(() => {
  return exerciseName.value.length > 0 && sets.value > 0 && reps.value > 0
})

const addExercise = () => {
  exercises.value.push({
    id: Date.now().toString(),
    name: exerciseName.value,
    sets: sets.value,
    reps: reps.value,
    weight: weight.value || undefined,
  })

  exerciseName.value = ''
  sets.value = 0
  reps.value = 0
  weight.value = 0
}

const removeExercise = (id: string) => {
  exercises.value = exercises.value.filter((exercise) => exercise.id !== id)
}

const { addItem } = useLibrary()

const createSession = () => {
  const id = Date.now().toString()

  addItem({
    id: id,
    title: title.value,
    exercises: exercises.value,
  })

  navigateTo('/sessions/' + id)
}
</script>

<template>
  <div class="h-full flex flex-col">
    <nav class="bg-white p-4 flex items-center shadow gap-2 text-xl">
      <NuxtLink to="/" class="i-mdi-arrow-left" title="Home"></NuxtLink>
      <h1>New Session</h1>
    </nav>

    <div class="grid gap-4 mx-8 my-4">
      <!-- Title -->
      <label class="grid">
        <span>Title</span>
        <input
          class="rounded border px-4 py-2 border-gray-500/50"
          type="text"
          v-model="title"
        />
      </label>

      <hr class="border-gray-500/50 my-2" />

      <!-- Exercise Name -->
      <label class="grid">
        <span>Exercise</span>
        <input
          class="rounded border px-4 py-2 border-gray-500/50"
          type="text"
          v-model="exerciseName"
          list="exercise-list"
        />
        <datalist id="exercise-list">
          <option v-for="name of exerciseOptions" :value="name"></option>
        </datalist>
      </label>

      <!-- Sets -->
      <div class="flex justify-between text-xl">
        <span>Sets: {{ sets }}</span>

        <Counter v-model="sets" />
      </div>

      <!-- Reps -->
      <div class="flex justify-between text-xl">
        <span>Reps: {{ reps }}</span>

        <Counter v-model="reps" />
      </div>

      <!-- Weight -->
      <div class="flex justify-between text-xl">
        <span>Weight: {{ weight }}lbs</span>

        <Counter v-model="weight" />
      </div>

      <!-- add exercise button -->
      <button
        class="bg-fuchsia-500 p-2 font-semibold text-white grid place-items-center rounded-lg shadow-lg transition-all active:scale-95 disabled:(bg-gray-400 cursor-not-allowed shadow-transparent)"
        :disabled="!canAddExercise"
        @click="addExercise()"
      >
        Add Exercise
      </button>
    </div>

    <div class="card rounded-t-[50px] rounded-b-0 flex flex-col gap-4 px-8 mt-4 flex-1">
      <h2 class="text-center mt-2 text-xl font-semibold tracking-wider">
        Exercises
      </h2>

      <TransitionGroup name="exercises">
        <ExerciseCard
          v-for="exercise in exercises"
          :key="exercise.id"
          :value="exercise"
          @remove="removeExercise($event)"
        />
      </TransitionGroup>

      <p v-if="!exercises.length" class="text-center opacity-70">
        Add an exercise to see them here
      </p>

      <!-- spacer -->
      <div class="flex-1"></div>

      <!-- create session button -->
      <button
        class="w-full bg-fuchsia-500 p-2 font-semibold text-white grid place-items-center rounded-lg shadow-lg transition-all active:scale-95 disabled:(bg-gray-400 cursor-not-allowed shadow-transparent)"
        :disabled="exercises.length === 0"
        @click="createSession()"
      >
        Create Session
      </button>
    </div>
  </div>
</template>

<style>
.exercises-enter-active,
.exercises-leave-active {
  transition: all 0.5s ease;
}
.exercises-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.exercises-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
