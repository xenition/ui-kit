import * as React from 'react';
import type { ServiceReminderProps, ServiceUrgency } from './ServiceReminder';
export interface ServiceReminderV4Props extends ServiceReminderProps {
    /** Override the urgency words — three English phrases lived inside. */
    urgencyLabels?: Partial<Record<ServiceUrgency, string>>;
    /** Accessible name for the dismiss control. Default `'Dismiss reminder'`. */
    dismissLabel?: string;
}
/**
 * **V4 service reminder** — the web twin of the native `ServiceReminderV4`,
 * same props as {@link ServiceReminder} plus `urgencyLabels` and
 * `dismissLabel`.
 *
 * ## Four changes
 *
 * 1. **Urgency survives greyscale** — a badge word and a leading rail beside
 *    the tint, which was the only signal.
 * 2. **`overdue` announces itself**, and the other two do not: a component
 *    that announces every state as an alert teaches the user to ignore it.
 * 3. **The dismiss control is a 44px target with a name.**
 * 4. **The tint is a `color-mix()` over the semantic variables**, so it lands
 *    correctly in dark mode.
 *
 * **Renders nothing without a `service`** (§4.5).
 */
export declare const ServiceReminderV4: React.ForwardRefExoticComponent<ServiceReminderV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ServiceReminderV4.d.ts.map