import * as React from 'react';
import type { StylistCardProps } from './StylistCard';
/** Drop-in alternate of {@link StylistCardProps} — identical prop contract. */
export type StylistCardV2Props = StylistCardProps;
/**
 * StylistCard — design variant **V2**: a **centered profile card**. Where V1 is
 * an avatar-left row, V2 stacks a large ringed avatar, the name + role, the star
 * rating, centered specialty chips, an availability line, and a full-width
 * **Book** CTA down a single centered column — a hero "meet your stylist" tile.
 * Same props as {@link StylistCardProps}. `variant="compact"` still trims chips +
 * CTA; `loading` shows a token skeleton; `fullyBooked` disables the CTA. Elevated
 * (shadow, no border). Token-only colors.
 */
export declare function StylistCardV2({ name, role, specialties, avatarUrl, rating, reviewCount, priceFromCents, currency, formatMoney: format, availability, fullyBooked, variant, loading, bookLabel, onBook, style, }: StylistCardV2Props): React.ReactElement;
//# sourceMappingURL=StylistCardV2.d.ts.map