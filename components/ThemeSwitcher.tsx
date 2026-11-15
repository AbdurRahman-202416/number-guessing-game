"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import {
  THEMES,
  getThemeServerSnapshot,
  getThemeSnapshot,
  setTheme,
  subscribeTheme,
} from "@/lib/theme";
import { CheckIcon, PaletteIcon } from "@/components/icons";

export function ThemeSwitcher() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Change color theme"
        className="btn-chunk flex size-11 items-center justify-center rounded-2xl bg-paper text-[1.7rem]"
      >
        <PaletteIcon />
      </button>

      {open && (
        <div
          id={panelId}
          role="group"
          aria-label="Color theme"
          className="on-paper sticker anim-pop absolute right-0 top-[calc(100%+0.6rem)] z-50 w-56 origin-top-right bg-paper p-2 text-ink"
        >
          <p className="px-2 pb-1 pt-1 font-display text-xs uppercase tracking-widest text-ink/70">
            Pick a vibe
          </p>
          {THEMES.map((option) => {
            const active = option.id === theme;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => setTheme(option.id)}
                className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-2 py-1 text-left font-display text-lg transition-colors ${
                  active ? "bg-accent" : "hover:bg-ink/10"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="size-8 shrink-0 rounded-full border-[2.5px] border-ink"
                  style={{
                    background: `linear-gradient(135deg, ${option.swatch[0]} 50%, ${option.swatch[1]} 50%)`,
                  }}
                />
                <span className="flex-1">{option.label}</span>
                {active && <CheckIcon className="text-xl" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
