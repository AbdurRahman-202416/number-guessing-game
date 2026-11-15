# Guess the Number

An arcade-style number guessing game built with Next.js. Pick a level, hit PLAY and find the secret number before your hearts run out. Colourful, animated and made to feel like a casual mobile game.

## Screens

- **Start screen**: bouncing logo, floating Memphis shapes, three chunky level cards (Easy, Medium, Hard) with star ratings and your best score, and a big PLAY button.
- **Game board**: hearts that crack and fly apart when you miss (with a floating "-1"), score and streak chips, a "closing in" progress bar, a wiggling mystery "?" card that shakes on a wrong guess, a big TOO HIGH / TOO LOW verdict with a bouncing arrow, a cold-to-hot heat meter, a range track with a hopping buddy that follows the remaining interval, an on-screen number pad plus a real numeric input, and your guesses as colourful stickers.
- **Win screen**: confetti burst in theme colours, rays and a trophy, earned stars (1 to 3), a points count-up, a "NEW BEST!" ribbon, streak and session total.
- **Game over screen**: a flip card that reveals the secret number, your closest guess and every guess you made.

## Theme switcher

The palette button in the top corner opens four themes: **Candy** (pink and violet), **Ocean** (cyan and blue), **Sunset** (orange and magenta) and **Neon** (lime and purple). Themes are CSS variables selected by a `data-theme` attribute on `<html>`. The choice is saved in `localStorage`, and a tiny inline script applies it before first paint so there is no flash and no hydration mismatch. Blocked storage is handled.

## Features

- Three levels: Easy (1-50, 10 hearts), Medium (1-100, 7 hearts), Hard (1-500, 9 hearts)
- Score = (hearts left + 1) x level multiplier (Easy 10, Medium 20, Hard 30); win streak and session total
- Best score per level saved in `localStorage`
- Friendly validation (empty, out of range, decimals, duplicates)
- Mobile-first from 360px up, board centred at max 520px on desktop
- Accessible: labelled input, `aria-live` guess feedback, visible focus rings, 44px+ touch targets, keyboard play (type and press Enter), progress and hearts exposed to screen readers
- Animations are CSS only (transform and opacity, spring easing) and are switched off for `prefers-reduced-motion`

## Tech stack

- Next.js (App Router) and React, TypeScript
- Tailwind CSS v4 plus hand-written CSS keyframes
- `next/font` with Fredoka (display) and Nunito (body)
- No animation or UI libraries

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
app/          layout (fonts, theme init script), page, global styles and themes, icon
components/   Game (screen switch), StartScreen, Hud, MysteryCard, HeatMeter, RangeBar,
              GuessPad, GuessHistory, ResultModal, WinScreen, LoseScreen, Confetti,
              ThemeSwitcher, Background, levels, icons
hooks/        useGame (state + actions), useBestScores (localStorage store), useCountUp
lib/          game.ts (pure logic and reducer), storage.ts (best scores), theme.ts (themes)
```
