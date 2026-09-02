import * as React from 'react';
import type { ClaimRowProps } from './ClaimRow';
export interface ClaimRowV4Props extends ClaimRowProps {
}
/**
 * **V4 claim row** — same props as {@link ClaimRow}; every one of them
 * unchanged, and the row now says the amount out loud.
 *
 * ## Five changes
 *
 * 1. **The settled amount is announced.** The row put `aria-label="Claim
 *    CLM-20481, Windshield replacement, Approved"` on the same element that
 *    rendered the money and the date. ARIA replaces an element's contents with
 *    its name, so a screen-reader user scanning a claims list heard a status
 *    for every claim and **not one figure** — on the screen whose entire
 *    subject is how much was paid. The amount and the date are folded into the
 *    name, joined with commas.
 * 2. **`amountCents={-1}` no longer prints "$0.00".** The base clamped with
 *    `Math.max(0, …)`, so a recovery, a sentinel and a genuine zero settlement
 *    all rendered identically. The figure is printed as given and captioned
 *    when it is below zero.
 * 3. **It is a real `<button>`, joined to the row family.** `pressableProps`
 *    made it a `div` with `role="button"`, `tabIndex` and a hand-written
 *    Enter/Space handler — and that handler is what steals the keydown from
 *    any control nested in a row. The row now takes the shared height, the
 *    shared 44 leading slot and the shared state layer, so a claims list, a
 *    settings list and a notification list are one family rather than three
 *    row heights.
 * 4. **Press is a state layer, not `hover:opacity-80`.** Dimming fades the
 *    row's own content, which is M3's *disabled* signal.
 * 5. **The status disc is inked with an ink slot.** `internal/tint.ts` drew
 *    the glyph in `text-success` / `text-danger` — fill tokens the compiler
 *    guarantees nothing about as text — over `bg-neutral-100`, a ramp step
 *    that mirrors under `[data-theme="dark"]`. Both are gone; focus is
 *    `ring-ring` rather than `ring-primary-300`.
 */
export declare const ClaimRowV4: React.ForwardRefExoticComponent<ClaimRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ClaimRowV4.d.ts.map