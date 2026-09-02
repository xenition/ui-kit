import * as React from 'react';
import type { SkillTagProps, SkillTagVariant } from './SkillTag';
export interface SkillTagV4Props extends SkillTagProps {
    /** Names the ✕. Default `'Remove <label>'`, so it never announces "button". */
    removeLabel?: string;
    /** What each variant means, in words. `default` says nothing extra. */
    variantLabels?: Partial<Record<SkillTagVariant, string>>;
}
/**
 * **V4 skill tag** — same props as {@link SkillTag} plus `removeLabel` and
 * `variantLabels`.
 *
 * ## Five changes
 *
 * 1. **A removable, pressable chip is no longer a `<button>` inside a
 *    `<button>`.** That is invalid HTML — the parser closes the outer button
 *    before the inner one even opens — and invalid ARIA, and it is what the
 *    base emitted for every chip that had both `onClick` and `onRemove`. What
 *    the browser actually built was two sibling buttons with the ✕ outside the
 *    chip's own box, so the guard around its click (`stopPropagation`) was
 *    guarding against a bubble that no longer happened, while the chip's press
 *    target silently lost its trailing half. The pill is now a plain `<span>`
 *    that *contains* two siblings: the chip's activation, and the ✕.
 * 2. **The variant stops being lost in the name.** `aria-label={label}`
 *    overrode the whole subtree, marker included, so a chip visibly marked
 *    "! React" — required and *not* on your résumé — announced "React", which
 *    is the opposite reading. The name is now the label and the variant's
 *    meaning together.
 * 3. **The chip is a real tap target.** It was roughly 20px tall (`py-[3px]`
 *    around a 12px label) and it is the most-tapped control in the module,
 *    because `JobFilterBar` is built out of these. Both the activation and
 *    the ✕ clear 44.
 * 4. **Press is a state layer, not `hover:opacity-90`.** Dimming fades the
 *    chip's own *content*, which is the signal M3 spends 0.38 on to mean
 *    disabled — so a hovered chip and a dead one looked alike.
 * 5. **The default chip stops painting itself with a hairline colour.**
 *    `bg-neutral-100` is a ramp step that inverts under a dark seed; the
 *    neutral chip now takes `card` with a `border` hairline, which is what
 *    `border` is for.
 */
export declare const SkillTagV4: React.ForwardRefExoticComponent<SkillTagV4Props & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=SkillTagV4.d.ts.map