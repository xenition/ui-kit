import * as React from 'react';
import type { LostPetAlertProps } from './LostPetAlert';
/** Drop-in for {@link LostPetAlertProps} — same props, the V4 "companion" design. */
export type LostPetAlertV4Props = LostPetAlertProps;
/**
 * LostPetAlert — **V4** "companion" design (web parity of the native V4). The
 * warm, friendly take on a lost-pet alert: an elevated rounded card with a soft
 * shadow (no gradient) whose urgency is carried by a status-toned soft surface
 * accent — a token-colored left edge + reduced-alpha tint on the glyph well — plus
 * a labelled status Badge + glyph (danger for lost, etc.), never color alone.
 * Uses `role="alert"`, keeps the static map placeholder, and preserves the
 * report-sighting + share actions for active alerts. Same props/behavior as
 * {@link LostPetAlertProps}. All colors from `--xen-*` token classes (no literals).
 */
export declare const LostPetAlertV4: React.ForwardRefExoticComponent<LostPetAlertProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LostPetAlertV4.d.ts.map