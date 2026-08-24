import * as React from 'react';
import { type RequestState } from './internal/status';
export type { RequestState };
/** Kind of service request — drives the leading glyph. */
export type ServiceRequestKind = 'repair' | 'connect' | 'disconnect' | 'transfer' | 'inspection' | 'meter' | 'other';
export interface ServiceRequestRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Request reference / ticket number (e.g. "SR-10482"). */
    requestNumber: string;
    /** Short summary (e.g. "Water heater leak"). */
    title: string;
    /** Lifecycle state — conveyed by text + glyph + color. */
    status: RequestState;
    /** Request kind — drives the leading glyph (default `other`). */
    kind?: ServiceRequestKind;
    /** Localized scheduled/updated date. */
    date?: string;
    /** Priority — surfaces an extra "Urgent" tag when `high`. */
    priority?: 'low' | 'normal' | 'high';
    /** Fires on row click (e.g. open request detail); becomes a button when supplied. */
    onClick?: () => void;
}
/**
 * One line in a service-request / work-order list: a tinted kind glyph disc, a
 * title/number stack, an optional date, and a status pill. The state is conveyed
 * redundantly (glyph + label + a color that traces to a semantic token:
 * completed → success, cancelled → neutral) so it is never color-alone; a `high`
 * priority adds an explicit "Urgent" tag rather than relying on color. Becomes a
 * `role="button"` row only when `onClick` is supplied. Web parity of the native
 * `ServiceRequestRow`.
 */
export declare const ServiceRequestRow: React.ForwardRefExoticComponent<ServiceRequestRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ServiceRequestRow.d.ts.map