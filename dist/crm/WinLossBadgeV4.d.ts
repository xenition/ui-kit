import * as React from 'react';
import { type DealOutcome } from './internal';
import type { WinLossBadgeProps } from './WinLossBadge';
export interface WinLossBadgeV4Props extends WinLossBadgeProps {
    /** Override the four outcome words — they were hard-coded English. */
    outcomeLabels?: Partial<Record<DealOutcome, string>>;
}
/**
 * **V4 win/loss badge** — the web twin of the native `WinLossBadgeV4`, same
 * props as {@link WinLossBadge} plus `outcomeLabels`.
 *
 * ## Four changes
 *
 * 1. **`size` is honoured.** It was destructured, read only in the `inline`
 *    branch and never forwarded to `Badge`, so `DealCard` passing `size="sm"`
 *    got an `sm` badge on native and an `md` one on web — from one prop, on
 *    one call.
 * 2. **The pill is the same pill on both twins.** Web took `Badge`'s `solid`
 *    default while native passed `variant="soft"`, so a won deal was a
 *    saturated green pill on one platform and a tinted chip on the other. This
 *    is the module's most repeated element; {@link BADGE_V4} decides it once.
 * 3. **The ink is the contrast-corrected slot.** The `inline` variant coloured
 *    its glyph and word with `text-${tone}` — a **fill** token spent as ink,
 *    which the theme makes no contrast promise about at all.
 * 4. **The four words are overridable.** `Won` / `Lost` / `Open` / `Pending`
 *    shipped as English inside the component.
 *
 * The outcome is still carried by a glyph **and** a word, so it survives
 * greyscale and colour blindness — that part of the base was right.
 */
export declare const WinLossBadgeV4: React.ForwardRefExoticComponent<WinLossBadgeV4Props & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=WinLossBadgeV4.d.ts.map