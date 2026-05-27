import { useLocalStorageManualReset } from '@proj-airi/stage-shared/composables'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { defaultCharacterId, getCharacterDefinition, getCharacterDefinitions } from '../characters/registry'

export const useCharacterRegistryStore = defineStore('character-registry', () => {
  const activeCharacterId = useLocalStorageManualReset<string>('character/profile/active-id', defaultCharacterId)
  const emotion = ref('neutral')
  const state = ref<'pending' | 'loading' | 'mounted'>('pending')

  const characters = computed(() => getCharacterDefinitions())
  const activeCharacter = computed(() => getCharacterDefinition(activeCharacterId.value) ?? getCharacterDefinitions()[0])
  const expression = computed(() => activeCharacter.value?.expressions[emotion.value] ?? activeCharacter.value?.expressions.neutral ?? 'neutral')
  const expressionImage = computed(() => {
    const images = activeCharacter.value?.avatar.fallbackExpressionImages ?? {}
    return images[expression.value] ?? images.neutral
  })

  function setActiveCharacter(id: string) {
    if (!getCharacterDefinition(id))
      return

    activeCharacterId.value = id
    emotion.value = 'neutral'
  }

  function setEmotion(nextEmotion: string) {
    emotion.value = activeCharacter.value?.expressions[nextEmotion] ? nextEmotion : 'neutral'
  }

  function setState(nextState: 'pending' | 'loading' | 'mounted') {
    state.value = nextState
  }

  return {
    characters,
    activeCharacter,
    activeCharacterId,
    emotion,
    expression,
    expressionImage,
    state,
    setActiveCharacter,
    setEmotion,
    setState,
  }
})
