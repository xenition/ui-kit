import * as React from 'react';
import { type DealOutcome } from './internal';
export type { DealOutcome } from './internal';
export type WinLossSize = 'sm' | 'md';
export type WinLossVariant = 'badge' | 'inline';
export interface WinLossBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
    /** Deal result. `won` reads success, `lost` reads danger — plus a glyph. */
    outcome: DealOutcome;
    /** `badge` (default) is a filled pill; `inline` is a bare glyph + label. */
    variant?: WinLossVariant;
    size?: WinLossSize;
    /** Hide the text label, leaving only the glyph (still a11y-labelled). */
    hideLabel?: boolean;
}
/**
 * Outcome badge for a deal — `won` / `lost` / `open` / `pending`. The result is
 * carried by a glyph **and** a word (never color alone): won `✓`, lost `✕`,
 * open `◔`, pending `⋯`. Won maps to the `text-success` token, lost to
 * `text-danger`. Use `badge` on cards and `inline` inside dense rows. Every
 * color is a `--xen-*` token class — no literals.
 */
export declare const WinLossBadge: React.ForwardRefExoticComponent<WinLossBadgeProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=WinLossBadge.d.ts.map