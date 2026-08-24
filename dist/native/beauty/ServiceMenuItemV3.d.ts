import * as React from 'react';
import type { ServiceMenuItemProps } from './ServiceMenuItem';
/** Drop-in alternate of {@link ServiceMenuItemProps} — identical prop contract. */
export type ServiceMenuItemV3Props = ServiceMenuItemProps;
/**
 * ServiceMenuItem — design variant **V3**: a **minimal price-list line** in the
 * classic menu idiom — the name on the left, the price on the right, joined by a
 * hairline leader rule (`name ———— price`). No glyph tile, no card chrome, no
 * shadow: duration + description sit under the name as muted meta. `popular` is a
 * small accent marker; `unavailable` dims the row, strikes the price, and blocks
 * the press. Same props as {@link ServiceMenuItemProps}. Token-only colors.
 */
export declare function ServiceMenuItemV3({ name, priceCents, currency, category, durationMin, description, popular, unavailable, pricePrefix, formatMoney: format, onPress, style, }: ServiceMenuItemV3Props): React.ReactElement;
//# sourceMappingURL=ServiceMenuItemV3.d.ts.map