import * as React from 'react';
import type { StylistCardProps } from './StylistCard';
/** Drop-in alternate of {@link StylistCardProps} — identical prop contract. */
export type StylistCardV3Props = StylistCardProps;
/**
 * StylistCard — design variant **V3**: a **dense compact row** for lists. A
 * small avatar, a middle column of name · role with an inline star rating +
 * "from" price, and a trailing small **Book** button, all on one hairline-ruled
 * line — no card fill, no shadow. Where V1 is a padded card and V2 a hero tile,
 * V3 is the scannable directory row. Same props as {@link StylistCardProps};
 * specialty chips are omitted by design at this density. `loading` shows a
 * skeleton; `fullyBooked` disables the CTA. Token-only colors.
 */
export declare function StylistCardV3({ name, role, avatarUrl, rating, reviewCount, priceFromCents, currency, formatMoney: format, availability, fullyBooked, loading, bookLabel, onBook, onPress, style, }: StylistCardV3Props): React.ReactElement;
//# sourceMappingURL=StylistCardV3.d.ts.map