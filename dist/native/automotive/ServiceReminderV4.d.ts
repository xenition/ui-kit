import * as React from 'react';
import type { ServiceReminderProps, ServiceUrgency } from './ServiceReminder';
export interface ServiceReminderV4Props extends ServiceReminderProps {
    /** Override the urgency words — three English phrases lived inside. */
    urgencyLabels?: Partial<Record<ServiceUrgency, string>>;
    /** Accessible name for the dismiss control. Default `'Dismiss reminder'`. */
    dismissLabel?: string;
}
/**
 * **V4 service reminder** — same props as {@link ServiceReminder} plus
 * `urgencyLabels` and `dismissLabel`.
 *
 * ## Four changes
 *
 * 1. **Urgency survives greyscale.** A tinted ground was the only signal; V4
 *    adds the badge word and a leading rail.
 * 2. **`overdue` announces itself.** An overdue service is the one state in
 *    this component that should interrupt, and the base announced all three
 *    identically.
 * 3. **The dismiss control is a 44pt target with a name.** It was an
 *    unlabelled glyph.
 * 4. **The tint is mixed from resolved semantic colours**, so it lands on the
 *    right side of the page in dark mode.
 *
 * **Renders nothing without a `service`** (§4.5).
 */
export declare function ServiceReminderV4({ service, urgency, glyph, dueLabel, mileageLabel, detail, variant, urgencyLabels, dismissLabel, actionLabel, onAction, onDismiss, style, }: ServiceReminderV4Props): React.ReactElement | null;
//# sourceMappingURL=ServiceReminderV4.d.ts.map