import * as React from 'react';
import type { MailLabelChipProps } from './MailLabelChip';
export interface MailLabelChipV4Props extends MailLabelChipProps {
    /**
     * How the remove control is named. Default
     * `` (label) => `Remove label ${label}` ``.
     */
    removeLabel?: (label: string) => string;
}
/**
 * **V4 mail label chip** — same props as {@link MailLabelChip} plus
 * `removeLabel`.
 *
 * ## Four changes
 *
 * 1. **`soft` is soft for all six tones.** The `SOFT` and `SOLID` maps were
 *    byte-identical for `success`, `warn` and `danger`, so the same
 *    `variant="soft"` chip was a pale wash on the phone and a saturated block
 *    on the web. Soft is now one recipe — the tone mixed 10% into the card —
 *    applied to every tone by the same function.
 * 2. **A mail label is identity, so its ink is neutral.** A "Receipts" chip in
 *    the `danger` slot was indistinguishable from a genuine failure sitting in
 *    the same list. `labelInkClass` folds the three status tones to the neutral
 *    ink; the label's own word carries which label it is.
 * 3. **The remove `×` is a control, not a character.** It was a bare glyph with
 *    no box, roughly 12px of hit area, and it dimmed itself on hover at the
 *    band M3 spends on disabled. It is now a real target that clears 44 and
 *    answers with a state layer.
 * 4. **`solid` neutral gets a guaranteed pair.** It was `bg-muted` with
 *    `text-surface` — a page colour used as ink on a ramp step, a pairing
 *    nothing had measured.
 */
export declare const MailLabelChipV4: React.ForwardRefExoticComponent<MailLabelChipV4Props & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=MailLabelChipV4.d.ts.map