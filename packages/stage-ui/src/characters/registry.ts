import novaExpressions from '../../../../characters/nova/expressions.json'
import novaProfile from '../../../../characters/nova/profile.json'
import novaPrompt from '../../../../characters/nova/prompt.md?raw'

export interface CharacterProfile {
  id: string
  name: string
  avatarType: 'live2d' | 'png'
  promptPath: string
  expressionMapPath: string
}

export interface CharacterDefinition extends CharacterProfile {
  prompt: string
  expressions: Record<string, string>
  avatar: {
    basePath: string
    fallbackExpressionImages: Record<string, string>
  }
}

const novaAvatarBasePath = 'characters/nova/avatar/'

const novaFallbackExpressionImages: Record<string, string> = {
  blank_cute: new URL('../../../../characters/nova/avatar/blank_cute.png', import.meta.url).href,
  worried_cute: new URL('../../../../characters/nova/avatar/worried_cute.png', import.meta.url).href,
  sparkle_eyes: new URL('../../../../characters/nova/avatar/sparkle_eyes.png', import.meta.url).href,
  smirk_cute: new URL('../../../../characters/nova/avatar/smirk_cute.png', import.meta.url).href,
  teary: new URL('../../../../characters/nova/avatar/teary.png', import.meta.url).href,
  empty_smile: new URL('../../../../characters/nova/avatar/empty_smile.png', import.meta.url).href,
}

export const defaultCharacterId = 'nova'

export const characterDefinitions: CharacterDefinition[] = [
  {
    ...(novaProfile as CharacterProfile),
    prompt: novaPrompt.trim(),
    expressions: novaExpressions,
    avatar: {
      basePath: novaAvatarBasePath,
      fallbackExpressionImages: {
        neutral: new URL('../../../../characters/nova/avatar/neutral.png', import.meta.url).href,
        ...novaFallbackExpressionImages,
      },
    },
  },
]

export function getCharacterDefinitions() {
  return characterDefinitions
}

export function getCharacterDefinition(id: string) {
  return characterDefinitions.find(character => character.id === id)
    ?? characterDefinitions.find(character => character.id === defaultCharacterId)
}
