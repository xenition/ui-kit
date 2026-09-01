import * as React from 'react';
import type { ServiceCategory, ServiceMenuItemProps } from './ServiceMenuItem';
export interface ServiceMenuItemV4Props extends ServiceMenuItemProps {
    /** Override the category names — eight English words lived inside. */
    categoryLabels?: Partial<Record<ServiceCategory, string>>;
    /** Copy on the popular chip. Default `'Popular'`. */
    popularLabel?: string;
    /** Copy when the service cannot be booked. Default `'Unavailable'`. */
    unavailableLabel?: string;
    /** Format the duration. Default `'45 min'`. */
    formatDuration?: (minutes: number) => string;
    /** Draw the separator under the row. Default `false`. */
    last?: boolean;
}
/**
 * **V4 service menu item** — same props as {@link ServiceMenuItem} plus
 * `categoryLabels`, `popularLabel`, `unavailableLabel`, `formatDuration` and
 * `last`.
 *
 * ## Four changes
 *
 * 1. **A category stops spending the status colours.** See
 *    {@link CATEGORY_META}: "nails" was `success` and "waxing" was `warn`, so
 *    a menu of eight services used up every tone that means something.
 * 2. **An unavailable service cannot be pressed**, and dims at M3's 0.38 —
 *    the base greyed it and kept it live.
 * 3. **It is a row from the shared row line**, with tabular prices.
 * 4. **Nine English strings become props.**
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export declare function ServiceMenuItemV4({ name, priceCents, currency, category, durationMin, description, popular, unavailable, pricePrefix, formatMoney, categoryLabels, popularLabel, unavailableLabel, formatDuration, last, onPress, style, }: ServiceMenuItemV4Props): React.ReactElement | null;
//# sourceMappingURL=ServiceMenuItemV4.d.ts.map