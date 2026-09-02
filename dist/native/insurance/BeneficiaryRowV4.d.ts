import * as React from 'react';
import type { BeneficiaryRowProps } from './BeneficiaryRow';
export interface BeneficiaryRowV4Props extends BeneficiaryRowProps {
    /**
     * What the **whole set** of beneficiaries allocates, as a whole percentage.
     *
     * A row only ever holds its own share, so it cannot tell on its own whether
     * the set adds up. Hand it the set's total and it will say when the set does
     * not balance. Omit it and the row behaves exactly as the base did.
     */
    allocationTotal?: number;
    /**
     * Warn the reader that the set does not add to 100%. Receives the signed
     * difference — `+50` over-allocated, `-20` under.
     *
     * Default `'Allocations total 150% — 50% over'`.
     */
    formatUnbalanced?: (remainder: number, total: number) => string;
}
/**
 * **V4 beneficiary row** — same props as {@link BeneficiaryRow} plus
 * `allocationTotal` and `formatUnbalanced`.
 *
 * ## Five changes
 *
 * 1. **Three rows at 50% no longer render three confident figures.** Each row
 *    clamped its own percentage to 0–100 and knew nothing about the others, so
 *    a life policy split 50/50/50 drew three calm blue percentages adding to
 *    150% and nothing anywhere said so. Hand the row the set's
 *    `allocationTotal` and the imbalance is drawn *and* announced — the caller
 *    already summed the list to render it, so this costs them nothing.
 * 2. **The relationship reaches the reader.** The base's name was
 *    `"Ana Reyes, Primary beneficiary, 50%"` — the one fact that distinguishes
 *    a spouse from a child was drawn on screen and left out of the spoken
 *    string, and because the whole row is a flattened `Pressable` subtree there
 *    was no second stop to hear it from.
 * 3. **Press is a state layer.** `opacity: pressed ? 0.7 : 1` is a dim, and
 *    0.38 is M3's *disabled* band — the base's pressed row read as an
 *    unavailable one.
 * 4. **Primary vs contingent is identity, not a tone.** It gets an ordered
 *    glyph and a word on a neutral chip. Nobody is in trouble for being a
 *    contingent beneficiary.
 * 5. **It is a row from the shared row family**, at the same height, with the
 *    same 44 leading slot, as `ClaimRowV4` and `PolicyDocumentRowV4`.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export declare function BeneficiaryRowV4({ name, relationship, allocationPct, kind, avatarUrl, allocationTotal, formatUnbalanced, onPress, style, }: BeneficiaryRowV4Props): React.ReactElement | null;
//# sourceMappingURL=BeneficiaryRowV4.d.ts.map