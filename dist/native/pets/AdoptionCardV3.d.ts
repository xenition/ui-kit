import * as React from 'react';
import type { AdoptionCardProps } from './AdoptionCard';
/** Drop-in alternate design for {@link AdoptionCard} — identical props. */
export type AdoptionCardV3Props = AdoptionCardProps;
/**
 * Horizontal media-left row — a compact list alternate to {@link AdoptionCard}.
 * A square photo (or emoji placeholder) leads the row; name, meta, shelter, a
 * status chip and the fee + apply action stack on the right, with an optional
 * favorite heart in the top corner. Availability reads via a labelled chip. Same
 * `AdoptionCardProps`. Token-pure.
 */
export declare function AdoptionCardV3({ name, breed, age, sex, shelter, photoUrl, glyph, fee, status, favorited, applyLabel, onApply, onFavorite, onPress, style, }: AdoptionCardV3Props): React.ReactElement;
//# sourceMappingURL=AdoptionCardV3.d.ts.map