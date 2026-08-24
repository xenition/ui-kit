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
export declare function withAlpha(hex: string, alpha: number): string;
/**
 * Format a signed second count as a compact `h m` / `m s` duration string, e.g.
 * `"2h 05m"`, `"12m 30s"`, `"0s"`. Always non-negative input expected; callers
 * decide sign/prefix. Guarded against NaN/negative.
 */
export declare function formatDuration(totalSeconds: number): string;
/** Clamp a number into `[min, max]`, guarding NaN to `min`. */
export declare function clamp(value: number, min: number, max: number): number;
//# sourceMappingURL=internal.d.ts.map