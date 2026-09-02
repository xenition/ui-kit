import * as React from 'react';
import type { ResumeRowProps } from './ResumeRow';
export interface ResumeRowV4Props extends ResumeRowProps {
    /** The badge on the default résumé. Default `'Default'`. */
    defaultLabel?: string;
    /** Copy on the set-default action. Default `'Set default'`. */
    setDefaultLabel?: string;
    /** Names the ⬇. Default `'Download <name>'`. */
    downloadLabel?: string;
    /** Render the updated age. Default `'3d ago'`, floored. */
    formatRelative?: (iso: string) => string;
}
/**
 * **V4 résumé row** — same props as {@link ResumeRow} plus `defaultLabel`,
 * `setDefaultLabel`, `downloadLabel` and `formatRelative`.
 *
 * ## Five changes
 *
 * 1. **Download and Set default work from the keyboard.** Both were controls
 *    inside a `<div role="button">` carrying its own Enter/Space handler:
 *    their clicks were guarded with `stopPropagation`, their keydowns were
 *    not, so the row caught the bubbled key, called `preventDefault()` —
 *    which cancels the button's own activation — and opened the preview
 *    instead. Tab to Download, press Enter, download nothing. The row is a
 *    plain container now and both actions are **siblings** of the activation.
 * 2. **The row is announced.** The base's `aria-label` sat on a `generic`
 *    element, which ARIA forbids naming, so neither the file name nor the
 *    "default résumé" state reached a reader on Chrome or Firefox — and the
 *    updated age and file size were never in the label at all.
 * 3. **"Default" stops spending a status colour.** `<Badge tone="success">`
 *    said that one of three files being the default is *good news*. Which
 *    résumé is default is identity: a neutral chip says it, and the reader is
 *    not taught to ignore green.
 * 4. **The glyph controls are real tap targets.** ⬇ was a bare character —
 *    roughly 18 CSS pixels — in a row whose whole point is picking between
 *    files.
 * 5. **The tile and the meta line stop using tokens as something they are
 *    not.** The file tile was `bg-neutral-100`, a ramp step that inverts under
 *    a dark seed, and the meta line was `text-muted`, a fill slot with no
 *    contrast promise; press was `hover:opacity-95`, which is M3's *disabled*
 *    signal rather than a state layer.
 */
export declare const ResumeRowV4: React.ForwardRefExoticComponent<ResumeRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ResumeRowV4.d.ts.map