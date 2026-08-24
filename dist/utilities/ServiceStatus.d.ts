import * as React from 'react';
import { type UtilityKind, type ServiceState } from './internal/status';
export type { UtilityKind, ServiceState };
export interface ServiceStatusProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Utility line — drives the leading glyph and label. */
    kind: UtilityKind;
    /** Operational state — conveyed by text + glyph + color. */
    state: ServiceState;
    /** Service point / address label (e.g. "123 Main St"). */
    location?: string;
    /** Localized "last updated" string. */
    updated?: string;
    /** Supporting detail line (e.g. "Crews on site · ETA 4:00 PM"). */
    detail?: string;
}
/**
 * A status card for one service connection. The `state` (active/outage/
 * maintenance/degraded) is conveyed by **glyph + label + a tint that traces to a
 * semantic token** (active → success, outage → danger) — never color alone. A
 * left rail tinted to the state's tone reinforces it without carrying the signal
 * by itself. Purely presentational; every color traces to a `--xen-*` token. Web
 * parity of the native `ServiceStatus`.
 */
export declare const ServiceStatus: React.ForwardRefExoticComponent<ServiceStatusProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ServiceStatus.d.ts.map