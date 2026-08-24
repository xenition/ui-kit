import * as React from 'react';
import type { AdoptionCardProps } from './AdoptionCard';
/** Drop-in alternate design for {@link AdoptionCard} — identical props. */
export type AdoptionCardV2Props = AdoptionCardProps;
/**
 * Full-bleed photo hero — an immersive alternate to {@link AdoptionCard}. The
 * pet photo (or an emoji placeholder) fills a tall banner; the status chip and a
 * favorite heart float over the top, while the name, meta, fee and an apply CTA
 * sit on a bottom scrim. Text over the scrim uses light neutral-ramp tokens for
 * a consistent dark-photo overlay. Same `AdoptionCardProps`. Token-pure.
 */
export declare function AdoptionCardV2({ name, breed, age, sex, shelter, photoUrl, glyph, fee, status, favorited, applyLabel, onApply, onFavorite, onPress, style, }: AdoptionCardV2Props): React.ReactElement;
//# sourceMappingURL=AdoptionCardV2.d.ts.map