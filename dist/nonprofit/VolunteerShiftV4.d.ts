import * as React from 'react';
import type { VolunteerShiftProps } from './VolunteerShift';
/** Drop-in for {@link VolunteerShiftProps} — same props, the V4 "rally" design. */
export type VolunteerShiftV4Props = VolunteerShiftProps;
/**
 * VolunteerShift — **V4** "rally" design (web parity of the native V4). The
 * warm, mission-driven take on a volunteer-shift row: an elevated rounded row
 * (soft shadow, clean surface — no gradient) with a leading calendar glyph in a
 * soft-primary well, a bold role title, muted date/time/location meta, a
 * slots-filled meter, and a primary sign-up / outline cancel CTA (≥44px).
 * Status is read via a glyph + a labelled Badge + token color (never color
 * alone): a signed-up viewer gets a success "Signed up" badge, a full shift a
 * danger "Full" badge with the action disabled; the signed-up state is also
 * announced via `aria-pressed`. Honors every prop of
 * {@link VolunteerShiftProps}; capacity fill is guarded and clamped. All colors
 * from `--xen-*` token classes (no literals).
 */
export declare const VolunteerShiftV4: React.ForwardRefExoticComponent<VolunteerShiftProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VolunteerShiftV4.d.ts.map