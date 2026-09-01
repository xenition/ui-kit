import * as React from 'react';
import type { PriceAlertRowProps } from './PriceAlertRow';
export interface PriceAlertRowV4Props extends PriceAlertRowProps {
    /** Override the trigger words. Defaults `'Above'` and `'Below'`. */
    directionLabels?: {
        above?: string;
        below?: string;
    };
}
/**
 * **V4 price-alert row** — the web twin of the native `PriceAlertRowV4`, same
 * props as {@link PriceAlertRow} plus `directionLabels`.
 *
 * ## Four changes
 *
 * 1. **A disarmed alert is not drawn as an unavailable one.** The base dropped
 *    the whole row — the `Switch` included — to `opacity-60`, putting a live,
 *    toggleable control inside M3's disabled band. Whether an alert is armed
 *    is what the switch is *for*; dimming the row to say it a second time only
 *    makes the control look dead. The row keeps full strength.
 * 2. **Direction is identity, not status.** See {@link CONDITION_GLYPH}.
 * 3. **The switch clears 44.** It was the primitive's own compact size, in the
 *    only place on the row a finger can land.
 * 4. **The row joins the shared row family**, so an alert list, a settings
 *    screen and a notification feed are one object — one height, one text
 *    column, one trailing slot.
 */
export declare const PriceAlertRowV4: React.ForwardRefExoticComponent<PriceAlertRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PriceAlertRowV4.d.ts.map