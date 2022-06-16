import { Exercise } from '~/assets/types'
import { useStorage } from '@vueuse/core'

interface LibraryItem {
  id: string
  title: string
  exercises: Exercise[]
}

export const useLibrary = () => {
  const items = useStorage<LibraryItem[]>('library-items', [
    {
      id: '1',
      title: 'Full Body',
      exercises: [
        {
          id: '1',
          name: 'Pushups',
          sets: 4,
          reps: 10,
        },
        {
          id: '2',
          name: 'Situps',
          sets: 3,
          reps: 10,
        },
        {
          id: '3',
          name: 'Squats',
          sets: 3,
          reps: 10,
          weight: 150,
        },
        {
          id: '4',
          name: 'Pullups',
          sets: 3,
          reps: 10,
        },
      ],
    },
  ])

  const addItem = (item: LibraryItem) => {
    items.value.push(item)
  }

  const removeItem = (id: string) => {
    items.value = items.value.filter((item) => item.id !== id)
  }

  return {
    items,
    addItem,
    removeItem,
  }
}
