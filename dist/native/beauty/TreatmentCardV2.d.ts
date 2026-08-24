import * as React from 'react';
import type { TreatmentCardProps } from './TreatmentCard';
/** Drop-in alternate of {@link TreatmentCardProps} — identical prop contract. */
export type TreatmentCardV2Props = TreatmentCardProps;
/**
 * TreatmentCard — design variant **V2**: a **full-bleed image hero**. The image
 * fills the whole tile; a bottom scrim (`withAlpha` of the on-surface token)
 * carries the title, a duration · price line, and an inline **Book** chip in
 * inverse (surface-colored) text, with the category badge floated top-left.
 * Where V1 splits into an image band above a text body, V2 is one immersive
 * poster. Missing images degrade to a token-tinted panel with the glyph. Same
 * props as {@link TreatmentCardProps}. Token-only colors.
 */
export declare function TreatmentCardV2({ name, priceCents, currency, variant, durationMin, description, imageUrl, formatMoney: format, bookLabel, onBook, onPress, style, }: TreatmentCardV2Props): React.ReactElement;
//# sourceMappingURL=TreatmentCardV2.d.ts.map