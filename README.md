# The Cyclical Pantheon

Live site: https://dgfisher2021.github.io/the-cyclical-pantheon/

An interactive story experience exploring a mythological pantheon of twelve gods locked in an eternal cycle of creation and destruction. Built with React and Vite.

## Features

### Pantheon Wheel
An interactive radial wheel displaying all twelve gods. Click any god to explore their lore, relationships, bonds, and cosmic dynamics.

### Story Mode
A multi-chapter narrative with:
- **Audio narration** with dual narrators (male/female) and multi-part chapters
- **Karaoke-style word highlighting** that syncs text to speech using syllable-weighted word timing and runtime audio energy analysis
- **Auto-scroll** that follows the narration, with manual override
- **Playback controls** including speed adjustment (0.75x - 2x), seeking, and chapter auto-advance
- **God mentions** that link back to the Pantheon Wheel for context

### God Detail
Deep-dive panels for each of the twelve gods covering:
- Origin stories and persona
- Relationships and cosmic bonds
- Power dynamics and states
- Chronicle entries and codex lore

## Tech Stack

- **React** (Vite) with JSX
- **Web Audio API** for runtime energy analysis of narration audio
- **CSS-in-JS** inline styles with a shared theme system

## Project Structure

```
src/
  App.jsx                     # Root - switches between Wheel and Story views
  components/
    PantheonWheel.jsx         # Interactive god wheel
    GodDetail/                # God detail panels (tabs: Origin, Persona, Bonds, etc.)
    StoryMode/                # Story reading + narration
      StoryMode.jsx           # Chapter management, narration state
      StoryChapter.jsx        # Chapter rendering, word highlighting
      NarrationBar.jsx        # Playback controls
  data/
    storyChapters.js          # Chapter text content
    storyMeta.js              # Chapter metadata, ordering
    narrationTimestamps.js    # Paragraph/segment timing for audio sync
    gods.js                   # God definitions and attributes
  hooks/
    useNarration.js           # Multi-part audio playback
    useAudioEnergy.js         # Runtime audio energy analysis
  utils/
    syllableEstimator.js      # Syllable-aware word weight estimation
    audioEnergyAnalyzer.js    # Web Audio API silence detection
  styles/
    theme.js                  # Colors, fonts, shared style utilities
```

## Development

```bash
npm install
npm run dev
```
