# Number Guessing Game

A polished number guessing game built with Next.js. Pick a difficulty, then find the hidden number before you run out of tries. Every guess narrows a live range bar, and hot/warm/cold hints tell you how close you are.

## Features

- Three difficulties: Easy (1-50, 10 tries), Medium (1-100, 7 tries), Hard (1-500, 9 tries)
- Too high / too low feedback plus a hot, warm or cold proximity hint
- Range bar that narrows to the remaining possible interval
- Guess history with up/down indicators, newest first
- Input validation with friendly inline messages (empty, out of range, decimals, duplicates)
- Win and lose screens with CSS-only confetti, number reveal, score from tries left
- Best score per difficulty saved in localStorage (safe against SSR and blocked storage)
- Responsive from 360px up, keyboard accessible, visible focus, `aria-live` feedback, respects `prefers-reduced-motion`

Score = (tries left + 1) x difficulty multiplier (Easy 10, Medium 20, Hard 30).

## Tech stack

- Next.js (App Router) and React
- TypeScript
- Tailwind CSS v4
- `next/font` with Bricolage Grotesque and Instrument Sans

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```

## Project structure

```
app/          layout, page, global styles, icon
components/   DifficultyPicker, GuessForm, RangeBar, GuessHistory,
              FeedbackPanel, TriesMeter, ResultModal, Confetti, HeatMeter
hooks/        useGame (state + actions), useBestScores (localStorage store)
lib/          game.ts (pure logic and reducer), storage.ts
```
