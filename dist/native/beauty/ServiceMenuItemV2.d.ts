import * as React from 'react';
import type { ServiceMenuItemProps } from './ServiceMenuItem';
/** Drop-in alternate of {@link ServiceMenuItemProps} — identical prop contract. */
export type ServiceMenuItemV2Props = ServiceMenuItemProps;
/**
 * ServiceMenuItem — design variant **V2**: an **elevated card** rather than V1's
 * flat bordered row. A large rounded category glyph tile anchors the top-left,
 * the name + optional "Popular" badge and description stack beside it, and a
 * footer band carries a duration chip, the price, and a dedicated **Book** chip.
 * Same props as {@link ServiceMenuItemProps}; `onPress` powers the Book chip.
 * `unavailable` dims the card and disables the chip. Token-only colors.
 */
export declare function ServiceMenuItemV2({ name, priceCents, currency, category, durationMin, description, popular, unavailable, pricePrefix, formatMoney: format, onPress, style, }: ServiceMenuItemV2Props): React.ReactElement;
//# sourceMappingURL=ServiceMenuItemV2.d.ts.map