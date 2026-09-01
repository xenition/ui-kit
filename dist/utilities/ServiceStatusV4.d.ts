import * as React from 'react';
import type { ServiceStatusProps } from './ServiceStatus';
/** Drop-in for {@link ServiceStatusProps} — same props, a different design. */
export type ServiceStatusV4Props = ServiceStatusProps;
/**
 * ServiceStatus — **V4** design. The clean, trust-first service card: an elevated
 * rounded surface, the utility-kind glyph in a small brand-gradient disc (the
 * signature V4 touch), and the operational `state` carried by a status `Badge`.
 * The state (active → success, outage → danger, maintenance/degraded → warn) is
 * still conveyed by **glyph + label + a color that traces to a semantic token** —
 * never color alone. Purely presentational; same props/behavior as
 * {@link ServiceStatusProps}; token-only colors.
 */
export declare const ServiceStatusV4: React.ForwardRefExoticComponent<ServiceStatusProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ServiceStatusV4.d.ts.map