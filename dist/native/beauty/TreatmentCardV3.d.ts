import * as React from 'react';
import type { TreatmentCardProps } from './TreatmentCard';
/** Drop-in alternate of {@link TreatmentCardProps} — identical prop contract. */
export type TreatmentCardV3Props = TreatmentCardProps;
/**
 * TreatmentCard — design variant **V3**: a **horizontal media-left row**. A
 * square thumbnail sits on the left; the name, a category tag + duration · price
 * meta line, an optional description, and a small **Book** button stack on the
 * right. Where V1 is an image-top card and V2 a full-bleed poster, V3 is the
 * compact list row for a treatment menu. Missing images degrade to a tinted
 * glyph thumbnail. Same props as {@link TreatmentCardProps}. Token-only colors.
 */
export declare function TreatmentCardV3({ name, priceCents, currency, variant, durationMin, description, imageUrl, formatMoney: format, bookLabel, onBook, onPress, style, }: TreatmentCardV3Props): React.ReactElement;
//# sourceMappingURL=TreatmentCardV3.d.ts.map