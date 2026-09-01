import * as React from 'react';
import type { MailLabelChipProps } from './MailLabelChip';
export interface MailLabelChipV4Props extends MailLabelChipProps {
    /**
     * Name the remove control. Default `` `Remove label ${label}` `` — the
     * string the base hard-coded.
     */
    removeLabel?: (label: string) => string;
}
/**
 * **V4 mail label chip** — same props as {@link MailLabelChip} plus
 * `removeLabel`.
 *
 * ## Four changes
 *
 * 1. **A mail label is identity, not status.** `MailLabelTone` hands labels
 *    `success`, `warn` and `danger`, so a Gmail-style "Receipts" chip rendered
 *    in the error colour and was indistinguishable from a genuine failure in
 *    the same list. All three fold to neutral, through the module's shared
 *    `labelInk`; a label is told apart by its word and its glyph.
 * 2. **The remove control is a real target.** A `spacing.xs` gap around an
 *    `sm` glyph with `hitSlop={6}` is not 44, and on the web twin the `×` was
 *    a bare character with no box at all. It is `minTap` square now, and it is
 *    a **sibling** of the chip's own button rather than nested inside it —
 *    nesting made removing a label impossible without first filtering by it.
 * 3. **The fills are opaque and paired.** `withAlpha(accent, 0.16)` borrowed
 *    whatever was behind the chip, so the same label was a different colour on
 *    a card and on the page; `solid` now inks with the fill's guaranteed pair
 *    rather than falling through to `onSurface`.
 * 4. **Press is a state layer**, composited into the chip's own fill, instead
 *    of `opacity: 0.7` — which is close enough to M3's 0.38 disabled band that
 *    a pressed chip read as an unavailable one.
 */
export declare function MailLabelChipV4({ label, tone, variant, glyph, onRemove, onPress, removeLabel, style, }: MailLabelChipV4Props): React.ReactElement | null;
//# sourceMappingURL=MailLabelChipV4.d.ts.map