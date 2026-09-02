import * as React from 'react';
import type { BadgeSize } from '../primitives/Badge';
import type { BehaviorBadgeProps, BehaviorTone } from './BehaviorBadge';
export interface BehaviorBadgeV4Props extends BehaviorBadgeProps, Omit<React.HTMLAttributes<HTMLElement>, 'onClick'> {
    /** A neutral sentence of context under the chip — what happened, not a verdict. */
    note?: string;
    /** Replace the three tone words. They were hard-coded English. */
    toneLabels?: Partial<Record<BehaviorTone, string>>;
    /** Chip size. The base declared this prop on web and never read it. */
    size?: BadgeSize;
}
/**
 * **V4 behavior badge** — same props as {@link BehaviorBadge} plus `note`,
 * `toneLabels` and a `size` that is finally read, on the standard
 * `className`/`style` surface.
 *
 * ## Six changes
 *
 * 1. **A child's conduct is no longer drawn in the error colour.** The base
 *    mapped `negative → danger`, and the web `Badge` defaults to `solid`, so
 *    `<BehaviorBadge tone="negative" label="Interrupted" points={2} />` put a
 *    saturated red chip against a six-year-old's name. `danger` means
 *    *something has gone wrong with the system*; spending it on a child is
 *    both a status-colour-on-identity violation and a shaming pattern. All
 *    three tones now wear one neutral chip, and the tone is carried by a glyph,
 *    a word and the signed number instead.
 * 2. **The spoken name stopped passing judgement.** It was the raw enum:
 *    "negative behavior: Interrupted (−2)". It is now the tone's *word* —
 *    "Needs work, Interrupted, −2" — and every word in it is overridable.
 * 3. **The chip can be positioned.** `BehaviorBadgeProps` extended nothing, so
 *    a caller could not pass `className`, `style`, `id` or a data attribute; a
 *    chip that cannot be placed is a chip that gets re-implemented. It now
 *    takes the standard HTML attribute surface.
 * 4. **`size` does something.** The base declared it "for prop parity" and
 *    dropped it on the floor, so `size="sm"` was silently `md` on web and `sm`
 *    on native — the same call, two chips.
 * 5. **`note` gives the neutral explanation a home.** Logging that a child
 *    interrupted without room to say why is how a log becomes a tally.
 * 6. **A press is the M3 state layer and clears 44.** It was
 *    `hover:opacity-70` — the band M3 spends on *disabled* — on a chip-sized
 *    target, in a module whose users are children.
 */
export declare const BehaviorBadgeV4: React.ForwardRefExoticComponent<BehaviorBadgeV4Props & React.RefAttributes<HTMLButtonElement | HTMLSpanElement>>;
//# sourceMappingURL=BehaviorBadgeV4.d.ts.map