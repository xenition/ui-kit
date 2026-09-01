import * as React from 'react';
import type { SectionDividerProps, SectionDividerVariant } from './SectionDivider';
export type { SectionDividerVariant };
/** Drop-in for {@link SectionDividerProps} — same props, the V4 "showcase" design. */
export type SectionDividerV4Props = SectionDividerProps;
/**
 * SectionDivider — **V4** "showcase" design (web parity of the native V4).
 *
 * Same effect engine as the base {@link SectionDivider}: three variants —
 * `hairline` (a 1px primary→accent gradient rule), `ornament` (delegates to the
 * ornament rule), and `fade` (a tall gradient melting the section into the
 * surface) — optionally wrapped in `Parallax` for a small counter-scroll drift.
 * The V4 is a *refined* take: **cleaner shape dividers per variant** — a fuller
 * primary→accent hairline with a confident core, a taller smoother fade melt,
 * and the `ornament` variant delegating to `OrnamentRuleV4` so its sharpened
 * rule/ornament carry through. Every variant/ornament/tone value is honored.
 *
 * **Reduced motion:** motion only exists on the `parallax` path, and that drift
 * is handled by the shared motion layer (`Parallax`), which already disables
 * itself under `prefers-reduced-motion` and on the server — exactly as the base
 * relies on. The V4 adds no new motion. Token-only colors, no literals.
 */
export declare const SectionDividerV4: React.ForwardRefExoticComponent<SectionDividerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SectionDividerV4.d.ts.map