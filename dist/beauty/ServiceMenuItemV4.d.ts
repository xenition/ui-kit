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
 * **V4 service menu item** — the web twin of the native `ServiceMenuItemV4`,
 * same props as {@link ServiceMenuItem} plus five hooks.
 *
 * ## Four changes
 *
 * 1. **A category stops spending the status colours** — see
 *    {@link CATEGORY_META}.
 * 2. **An unavailable service is `aria-disabled` and inert**, where the base
 *    greyed it and kept the click live.
 * 3. **It is a row from the shared row line**, with tabular prices.
 * 4. **Nine English strings become props.**
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export declare const ServiceMenuItemV4: React.ForwardRefExoticComponent<ServiceMenuItemV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ServiceMenuItemV4.d.ts.map