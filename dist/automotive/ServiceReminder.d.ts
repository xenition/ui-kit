import * as React from 'react';
/** Urgency of a service reminder. */
export type ServiceUrgency = 'upcoming' | 'due' | 'overdue';
/** Presentation for a {@link ServiceReminder}. */
export type ServiceReminderVariant = 'card' | 'row';
export interface ServiceReminderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Service name, e.g. `'Oil change'`. */
    service: string;
    /** Urgency level. */
    urgency?: ServiceUrgency;
    /** Icon glyph/emoji for the service (default 🔧). */
    glyph?: string;
    /** When it is due, pre-formatted (e.g. `'Sep 30'` / `'in 2 weeks'`). */
    dueLabel?: string;
    /** Mileage context, pre-formatted (e.g. `'Due at 60,000 mi'`). */
    mileageLabel?: string;
    /** Supporting detail line. */
    detail?: string;
    /** Presentation variant. */
    variant?: ServiceReminderVariant;
    /** Label for the primary action button; button hidden when omitted. */
    actionLabel?: string;
    /** Fires when the action button is pressed (e.g. book service). */
    onAction?: () => void;
    /** Fires when the dismiss/snooze control is pressed. */
    onDismiss?: () => void;
}
/**
 * A vehicle service reminder — the service name, an urgency level
 * (upcoming/due/overdue) shown as a text-labelled badge with a left accent bar
 * so meaning never rests on color, plus due-date and mileage context and an
 * optional action. An `overdue` reminder maps to the `danger` tone per contract.
 * Data + `onAction`/`onDismiss` callbacks only; nothing fetches. Colors come
 * from `--xen-*` token classes — no literal colors. `variant="row"` renders a
 * denser list line. Web parity of the native `ServiceReminder`.
 */
export declare const ServiceReminder: React.ForwardRefExoticComponent<ServiceReminderProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ServiceReminder.d.ts.map