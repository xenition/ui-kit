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
export declare function formatDuration(totalSeconds: number): string;
/** Clamp a number into `[min, max]`, guarding NaN to `min`. */
export declare function clamp(value: number, min: number, max: number): number;
/** Enter/Space activation handler for a `role="button"`/`role="menuitem"` div. */
export declare function activateOnKey(handler: () => void): (event: React.KeyboardEvent) => void;
//# sourceMappingURL=internal.d.ts.map