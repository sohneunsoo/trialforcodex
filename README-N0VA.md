# 모노시안 AIRI Prototype

This prototype keeps AIRI as the base app and adds 모노시안 as a modular local character.

## Run Locally

From the repo root:

```powershell
$env:COREPACK_HOME = (Join-Path (Resolve-Path .).Path '.corepack')
$env:PNPM_HOME = (Join-Path (Resolve-Path .).Path '.pnpm-home')
$env:PATH = "$(Join-Path (Resolve-Path .).Path '.local-bin');$env:PATH"
corepack.cmd pnpm install
pnpm run dev:web
```

Open the Vite URL printed by the dev server, usually `http://localhost:5173/`.

## Character Folder

모노시안 lives in:

```text
characters/nova/
  profile.json
  prompt.md
  expressions.json
  avatar/
    neutral.png
    blank_cute.png
    worried_cute.png
    sparkle_eyes.png
    smirk_cute.png
    teary.png
    empty_smile.png
```

## Change Character

Characters are registered in:

```text
packages/stage-ui/src/characters/registry.ts
```

The active character id is stored in local storage under:

```text
character/profile/active-id
```

For this prototype the default registered character is `nova`.

## Add A New Character

1. Create `characters/<id>/`.
2. Add `profile.json`, `prompt.md`, `expressions.json`, and `avatar/`.
3. Import the files in `packages/stage-ui/src/characters/registry.ts`.
4. Add a new `CharacterDefinition` entry to `characterDefinitions`.

Keep prompts in markdown files. Do not hardcode personality text in app components.

## Replace Avatar

For the PNG fallback, replace the files in:

```text
characters/nova/avatar/
```

The keys in `expressions.json` map runtime emotions to image names:

```json
{
  "neutral": "blank_cute",
  "anxious": "worried_cute",
  "curious": "sparkle_eyes",
  "amused": "smirk_cute",
  "sad": "teary",
  "existential": "empty_smile"
}
```

## Add Live2D Later

Place the Live2D model files under:

```text
characters/nova/avatar/
```

Recommended layout:

```text
characters/nova/avatar/
  nova.model3.json
  nova.moc3
  textures/
  motions/
  expressions/
```

Then extend the registry entry with a Live2D model URL or packaged zip display model and set the character card extension to use that display model id instead of the current empty `displayModelId` PNG fallback.

## What Changed

- Added a root `characters/nova` character bundle.
- Added a stage-ui character registry.
- Replaced the default active AIRI card with N0VA via registry-loaded prompt content.
- Added PNG expression fallback rendering when no Live2D model is selected.
- Added a small on-screen debug panel for character name, emotion, expression, and render state.
