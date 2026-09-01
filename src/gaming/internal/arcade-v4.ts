/**
 * The `gaming` module's own V4 vocabulary (web) — the twin of
 * `native/gaming/internal/arcade-v4.ts`.
 *
 * Nothing here is exported from the package.
 */

import { SKELETON_CLASS, TONE_INK, TONE_ON, type ToneV4 } from '../../primitives/internal/tone-v4';
import { questParts, slotParts } from '../progress-v4';

export { questParts, slotParts, SKELETON_CLASS, TONE_INK, TONE_ON };
export type { ToneV4 };

/**
 * A genre, a rarity tier and a podium place are **identity, not status**.
 *
 * The module spent status slots on all three: genre was `primary` on web and
 * `accent` on native, rarity ran across `success`/`primary`/`accent`/`warn`,
 * gold was `warn` and bronze `accent`, a reward was `warn`, and a **full
 * lobby** was `danger` — a capacity fact drawn as an error.
 *
 * The glyph, the medal and the frame carry which tier it is. `neutral` frees
 * every status slot to mean status.
 */
export const IDENTITY_TONE: ToneV4 = 'neutral';

/** One badge shape for the whole module. */
export const BADGE_V4 = { variant: 'soft', size: 'sm' } as const;

/** Scores, ranks and XP all stack in a column. */
export const TABULAR_CLASS = 'tabular-nums';

/** The ground behind cover art that has not loaded — never `border`. */
export const PLACEHOLDER_CLASS = SKELETON_CLASS;

/**
 * A scrim over **cover art** is not a themed surface.
 *
 * `GameCardV2` built one from `from-neutral-900/75` with `text-neutral-50` on
 * it — and the web ramp inverts under `[data-theme="dark"]` while the artwork
 * does not, so the scrim went light over an unchanged image. The native twin
 * had the mirror: `tokens.ramps.neutral[900]`, which is **not** inverted for
 * native, so the scrim never darkened for dark mode at all.
 */
export const ART_SCRIM = 'rgba(0, 0, 0, 0.62)';
export const ART_INK = '#ffffff';

/**
 * Build the one accessible name an interactive gaming row or card should
 * carry.
 *
 * Ten web components and seventeen native ones put a short label on a root
 * that prunes its own subtree — and in `MatchmakingStatus`, `GameCard` and
 * `LevelBar` what it pruned was a **control** or a `progressbar`.
 */
export function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string {
  return parts
    .filter((part): part is string | number => part != null && part !== '')
    .map(String)
    .join(', ');
}
