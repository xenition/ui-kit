/**
 * Internal helpers shared by the `@xenition/ui/support` (web/DOM) components.
 * Not part of the public surface — the barrel does not re-export it. Web parity
 * of `native/support/internal.ts` minus `withAlpha` (the DOM build never emits
 * `rgba(...)` literals — tints are token utility classes, not inline colors).
 */
import type * as React from 'react';

/**
 * Format a signed second count as a compact `h m` / `m s` duration string, e.g.
 * `"2h 05m"`, `"12m 30s"`, `"0s"`. Always non-negative input expected; callers
 * decide sign/prefix. Guarded against NaN/negative.
 */
export function formatDuration(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(Number.isFinite(totalSeconds) ? totalSeconds : 0));
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  if (hours > 0) return `${hours}h ${String(minutes).padStart(2, '0')}m`;
  if (minutes > 0) return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
  return `${seconds}s`;
}

/** Clamp a number into `[min, max]`, guarding NaN to `min`. */
export function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

/** Enter/Space activation handler for a `role="button"`/`role="menuitem"` div. */
export function activateOnKey(handler: () => void) {
  return (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handler();
    }
  };
}
