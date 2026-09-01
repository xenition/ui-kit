/**
 * The `crypto` module's own V4 vocabulary (native) — the twin of
 * `crypto/internal/market-v4.ts`.
 *
 * The base module already had `internal/format.ts`, which is mostly good and
 * stays untouched. This file corrects the two things it got wrong and adds
 * what the V4 line needs.
 *
 * Nothing here is exported from the package.
 */

import type { XenitionNativeTheme } from '../../theme';
import {
  onPair,
  skeletonFill,
  toneFill,
  toneInk,
  type ToneV4,
} from '../../primitives/internal/tone-v4';
import { changeParts, type ChangeParts } from '../../../crypto/amount-v4';

export { changeParts, onPair, skeletonFill, toneFill, toneInk };
export type { ChangeParts, ToneV4 };

/**
 * A change tone as the contrast-corrected **ink**.
 *
 * `internal/format.ts`'s `changeToneKey()` returns `keyof SemanticColors` — a
 * raw **fill** slot — which twelve native call sites then use as a text
 * colour. The theme ships `*Text` slots for exactly this and a rendered audit
 * measured the fill-as-text case at 1.32:1. The V2/V3 lines already fixed it;
 * the base line is the regression.
 */
export function changeInk(theme: XenitionNativeTheme, tone: ChangeParts['tone']): string {
  return toneInk(theme, tone as ToneV4);
}

/** Money and every figure that stacks in a column. */
export const TABULAR = { fontVariant: ['tabular-nums' as const] };

/**
 * One badge shape for the whole module.
 *
 * Web took `Badge`'s `solid` default while native passed `variant="soft"
 * size="sm"`, so a hardware wallet was a filled green pill on web and a small
 * neutral chip on native.
 */
export const BADGE_V4 = { variant: 'soft', size: 'sm' } as const;

/**
 * Build the one accessible name an interactive crypto row should carry.
 *
 * Seven components put a short label — `ETH holding`, `BTC price`,
 * `Transaction 0x12…cdef` — on the interactive root, which **replaces** the
 * subtree. No number in this module was ever announced: not the quantity, not
 * the fiat value, not the change, not the gas price. Commas, not a middle dot,
 * because a reader either says "middle dot" out loud or swallows the pause.
 */
export function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string {
  return parts
    .filter((part): part is string | number => part != null && part !== '')
    .map(String)
    .join(', ');
}
