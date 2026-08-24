/**
 * Internal helpers shared by the `@xenition/ui/native/support` components.
 * Nothing here is part of the public surface — the barrel does not re-export it.
 */

/**
 * Token-derived translucent tint. Accepts a `#rgb`/`#rrggbb` token hex and
 * returns an `rgba(...)` string — the same trick the primitives use so a tint
 * still traces to a compiled token (never a hardcoded literal). No literal hex
 * is introduced.
 */
export function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

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
