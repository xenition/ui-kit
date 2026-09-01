/**
 * The `government` module's own V4 vocabulary (native) — the twin of
 * `government/internal/civic-v4.ts`.
 *
 * Nothing here is exported from the package.
 */

import type { XenitionNativeTheme } from '../../theme';
import { onPair, skeletonFill, toneFill, toneInk, type ToneV4 } from '../../primitives/internal/tone-v4';
import { stateMix } from '../../../primitives/internal/v4-state';
import { isAdverse, labelledId, statusSentence } from '../../../government/civic-v4';

export { isAdverse, labelledId, onPair, skeletonFill, statusSentence, toneFill, toneInk };
export type { ToneV4 };

/**
 * A tinted disc or banner, with an ink that carries a promise.
 *
 * The base module ships `internal/tint.ts`, a shared table whose every
 * foreground is a **fill token used as ink** — `text-success`, `text-warn`,
 * `text-danger`, `text-muted`, `text-primary`, `text-accent` — on grounds
 * built from ramp steps. Every component that calls it inherits both defects
 * at once.
 *
 * Its own docblock says "Mirror of the insurance module's `internal/tint.ts`",
 * and it is: the two files are byte-identical apart from that one sentence. So
 * the same table sits in a second module, and only the copy that documents
 * itself as a mirror knows the other exists.
 *
 * There is no native counterpart to either, so the twins diverge — web has a
 * fixed table, native uses `withAlpha` per call site.
 */
/**
 * The ground behind a tinted disc or banner.
 *
 * Opaque and card-relative, the way `skeletonFill` is — not a translucent
 * `withAlpha` wash, which borrows whatever happens to be behind it and so
 * renders a different colour on a card, a sheet and a page. This is the twin
 * of the web's `tintGround`, which mixes through `toneGround`.
 */
export function tintGround(theme: XenitionNativeTheme, tone: ToneV4): string {
  return stateMix(theme.colors.card, toneFill(theme, tone), 'focus', theme.state);
}

export function tintInk(theme: XenitionNativeTheme, tone: ToneV4): string {
  return toneInk(theme, tone);
}

/**
 * One badge shape, and one card variant, for the whole module.
 *
 * Every badge in `government` is a filled pill on web and a soft tint on
 * native — ten components — and every card is `outlined` on web and
 * `elevated`/`interactive` on native — nine components. Neither twin passes
 * what the other passes, so the same civic screen is two different designs.
 */
export const BADGE_V4 = { variant: 'soft', size: 'sm' } as const;
export const CARD_V4 = 'elevated' as const;

/** A department, a service category and a document type are identity. */
export const IDENTITY_TONE: ToneV4 = 'neutral';

/** The ground behind a skeleton — never `border`, never a ramp step. */
export function placeholderGround(theme: XenitionNativeTheme): string {
  return skeletonFill(theme);
}

/**
 * Build the one accessible name an interactive civic row or card should carry.
 *
 * All five pressable components use a fixed three-field template that omits
 * exactly what a civic user needs: the "Unavailable" channel, the notice date
 * and venue, the next payment date and case number, the "Urgent" priority, the
 * agency and the filing date.
 */
export function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string {
  return parts
    .filter((part): part is string | number => part != null && part !== '')
    .map(String)
    .join(', ');
}
