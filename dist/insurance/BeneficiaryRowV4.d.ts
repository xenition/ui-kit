import * as React from 'react';
import type { BeneficiaryRowProps } from './BeneficiaryRow';
export interface BeneficiaryRowV4Props extends BeneficiaryRowProps {
    /**
     * What the whole beneficiary set adds up to, as a whole percentage.
     *
     * The row is the only place the reader is looking, and it cannot see the
     * other rows. Handing it the set's total is what lets one row say the set is
     * unbalanced — see change 1.
     */
    allocationTotal?: number;
    /**
     * Word the imbalance, given the signed remainder and the set's total.
     *
     * `allocationTotal` on its own only says a number is wrong; it takes a
     * sentence to say which way and by how much, and that sentence is the whole
     * value of the prop. Default: `'Allocations total 150% — 50% over'` /
     * `'Allocations total 80% — 20% unallocated'`.
     */
    formatUnbalanced?: (remainder: number, total: number) => string;
}
/**
 * **V4 beneficiary row** — same props as {@link BeneficiaryRow} plus
 * `allocationTotal`.
 *
 * ## Five changes
 *
 * 1. **Three rows at 50% no longer render three confident figures.** Each row
 *    clamped its own percentage to 0–100 and knew nothing about the others, so
 *    a set adding to 150% — or to 80% — printed as three (or two) perfectly
 *    calm numbers and the policyholder had no way to see that the estate would
 *    not distribute. Pass `allocationTotal` and every row in the set says so,
 *    in words, with the shortfall or the excess.
 * 2. **The row announces the allocation and the relationship.** `aria-label`
 *    sat on the element that also rendered the percentage, so ARIA replaced it
 *    — the row announced "Dana Reyes, Primary beneficiary, 40%" while the
 *    relationship, the one field that says *who this person is*, was never
 *    spoken at all. Both are folded into the name.
 * 3. **It is a real `<button>`, joined to the row family.** `pressableProps`
 *    made it a `div` with `role="button"` and a hand-written Enter/Space
 *    handler; the row now takes the shared height, the shared 44 leading slot
 *    and the shared state layer, so a beneficiary list and a claims list are
 *    the same object.
 * 4. **Press is a state layer, not `hover:opacity-80`** — dimming is M3's
 *    *disabled* signal — and focus is `ring-ring`, not the `ring-primary-300`
 *    ramp step.
 * 5. **The percentage is inked with an ink slot.** It was `text-primary`, the
 *    brand **fill**; the compiler guarantees contrast for `on-primary` against
 *    it, not for it against a card.
 */
export declare const BeneficiaryRowV4: React.ForwardRefExoticComponent<BeneficiaryRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BeneficiaryRowV4.d.ts.map