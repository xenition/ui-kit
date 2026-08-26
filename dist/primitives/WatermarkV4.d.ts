import * as React from 'react';
import type { WatermarkProps } from './Watermark';
export type { WatermarkProps as WatermarkV4Props };
/**
 * **V4 watermark** — the web twin of the native `WatermarkV4`, same props as
 * {@link Watermark}, a different design line.
 *
 * A watermark that competes with the content has failed, and the base one
 * competed in two ways at once: it was laid out by chance, and it was a
 * different strength in each colour scheme.
 *
 * 1. **A lattice, not a blob.** The base dropped `count` spans into a
 *    centre-justified `flex-wrap` row. Where the rows broke depended on the
 *    container's width, the last row was always a short cluster in the middle,
 *    and `count` changed the size of the blob rather than the density of the
 *    field. V4 lays the same tiles out as explicit rows — a square-ish lattice
 *    derived from `count` — and offsets alternate rows by half a step, which is
 *    how a repeating mark is actually set.
 * 2. **One strength in both schemes.** The ink was `text-muted-text`, a MID tone
 *    whose distance from the page changes with the scheme, floated at 8%: the
 *    same number produced two different marks. V4 prints in `on-surface` — the
 *    only slot guaranteed to sit at the far end from the surface in either
 *    scheme — so a fixed alpha is a fixed *relative* strength.
 * 3. **The twins agree.** The web scaled the field by 1.5 and native by 1.4,
 *    and the tile padding was `px-6 py-3` (24/12) against `spacing.lg /
 *    spacing.md` (24/16). Both now read the same three constants.
 * 4. **It does not come along when you copy.** The overlay was real text on
 *    top of a document, so selecting a paragraph took twenty-four copies of
 *    "CONFIDENTIAL" with it. `select-none` makes the mark a mark.
 *
 * It still sits above the content rather than behind it — a confidentiality
 * mark that a dark screenshot can hide is not a confidentiality mark — and it
 * still takes no clicks and is hidden from assistive tech, because it is a
 * property of the page and not something to read.
 */
export declare const WatermarkV4: React.ForwardRefExoticComponent<WatermarkProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WatermarkV4.d.ts.map