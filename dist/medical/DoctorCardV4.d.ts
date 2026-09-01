import * as React from 'react';
import type { DoctorCardProps } from './DoctorCard';
/** V4 layout choices for the "clinic" design. */
export type DoctorCardLayout = 'full' | 'compact';
/** Drop-in for {@link DoctorCardProps} — same props, the V4 "clinic" design. */
export interface DoctorCardV4Props extends DoctorCardProps {
    /** V4 layout: `full` (card, default) or `compact` (dense single row). */
    variant?: DoctorCardLayout;
}
/**
 * DoctorCard — **V4** "clinic" design (web parity of the native V4). The calm,
 * clinical take on a clinician profile: an elevated rounded card with a soft
 * shadow, the avatar + name + specialty, a star rating with review count, an
 * optional credential line, a labelled availability badge (glyph + label + tone,
 * never color alone), and a "Book" CTA. Honors the V4 `variant` — `full` (card,
 * default) and `compact` (a dense single row) — identical props/behavior to
 * {@link DoctorCardProps}. All colors from `--xen-*` token classes (no
 * literals). Informational UI only — not a medical device.
 */
export declare const DoctorCardV4: React.ForwardRefExoticComponent<DoctorCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DoctorCardV4.d.ts.map