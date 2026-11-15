export type ThemeId = "candy" | "ocean" | "sunset" | "neon";

export interface ThemeOption {
  id: ThemeId;
  label: string;
  /** Two swatch colours shown in the switcher (the live theme itself is pure CSS variables). */
  swatch: readonly [string, string];
}

export const THEMES: readonly ThemeOption[] = [
  { id: "candy", label: "Candy", swatch: ["#ff3d8b", "#a78bfa"] },
  { id: "ocean", label: "Ocean", swatch: ["#22d3ee", "#818cf8"] },
  { id: "sunset", label: "Sunset", swatch: ["#ff8a1f", "#f472b6"] },
  { id: "neon", label: "Neon", swatch: ["#a3e635", "#c084fc"] },
];

export const THEME_STORAGE_KEY = "number-guessing-game:theme:v1";
export const DEFAULT_THEME: ThemeId = "candy";

const listeners = new Set<() => void>();

function isThemeId(value: unknown): value is ThemeId {
  return THEMES.some((theme) => theme.id === value);
}

export function subscribeTheme(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** The attribute is the source of truth: an inline script sets it before first paint. */
export function getThemeSnapshot(): ThemeId {
  const value = document.documentElement.dataset.theme;
  return isThemeId(value) ? value : DEFAULT_THEME;
}

export function getThemeServerSnapshot(): ThemeId {
  return DEFAULT_THEME;
}

export function setTheme(id: ThemeId): void {
  document.documentElement.dataset.theme = id;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, id);
  } catch {
    // Storage blocked: the theme still applies for this visit.
  }
  listeners.forEach((listener) => listener());
}

/** Runs inline in <head> so a saved theme never flashes the default one. */
export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(${JSON.stringify(THEMES.map((x) => x.id))}.indexOf(t)>-1)document.documentElement.dataset.theme=t}catch(e){}`;
